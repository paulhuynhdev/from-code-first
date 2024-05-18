import { Request, Response } from 'express'
import { prisma } from '../index'
import { User } from '@prisma/client'

const Joi = require('joi')

const userSchema = Joi.object({
    id: Joi.number(),

    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),

    username: Joi.string().alphanum().min(3).max(30).required(),

    firstName: Joi.string().min(2).max(12).required(),

    lastName: Joi.string().min(2).max(20).required(),
}).with('username', 'email')

const Errors = {
    UsernameAlreadyTaken: 'UserNameAlreadyTaken',
    EmailAlreadyInUse: 'EmailAlreadyInUse',
    ValidationError: 'ValidationError',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    UserNotFound: 'UserNotFound',
}

function generateRandomPassword(length: number): string {
    const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    const passwordArray = []

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        passwordArray.push(charset[randomIndex])
    }

    return passwordArray.join('')
}

function parseUserForResponse(user: User) {
    const returnData = JSON.parse(JSON.stringify(user))
    delete returnData.password
    return returnData
}

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body

        try {
            await userSchema.validateAsync(userData)
        } catch (error) {
            return res.status(400).json({
                error: Errors.ValidationError,
                data: error,
                success: false,
            })
        }

        // Check if the username is already in use
        const existingUserByUsername = await prisma.user.findFirst({
            where: { username: req.body.username },
        })
        if (existingUserByUsername) {
            return res.status(409).json({
                error: Errors.UsernameAlreadyTaken,
                data: undefined,
                success: false,
            })
        }
        // Check if the email is already in use
        const existingUserByEmail = await prisma.user.findFirst({
            where: { email: req.body.email },
        })
        if (existingUserByEmail) {
            return res.status(409).json({
                error: Errors.EmailAlreadyInUse,
                data: undefined,
                success: false,
            })
        }

        const user = await prisma.user.create({
            data: {
                ...userData,
                password: generateRandomPassword(10),
            },
        })

        return res.status(201).json({
            error: undefined,
            data: parseUserForResponse(user),
            succes: true,
        })
    } catch (error) {
        return res.status(500).json({
            error: 'ServerError',
            data: undefined,
            success: false,
        })
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const userData = req.body
        // validate the user data
        try {
            await userSchema.validateAsync(userData)
        } catch (error) {
            return res.status(400).json({
                error: Errors.ValidationError,
                data: error,
                success: false,
            })
        }
        // check user exists
        const user = await prisma.user.findFirst({
            where: { id: parseInt(userId) },
        })
        if (!user) {
            return res.status(404).json({
                error: Errors.UserNotFound,
                data: undefined,
                success: false,
            })
        }
        // Check if the username is already in use
        const existingUserByUsername = await prisma.user.findFirst({
            where: {
                username: req.body.username,
                NOT: { id: parseInt(userId) },
            },
        })
        if (existingUserByUsername) {
            return res.status(409).json({
                error: Errors.UsernameAlreadyTaken,
                data: undefined,
                success: false,
            })
        }
        // Check if the email is already in use
        const existingUserByEmail = await prisma.user.findFirst({
            where: { email: req.body.email, NOT: { id: parseInt(userId) } },
        })
        if (existingUserByEmail) {
            return res.status(409).json({
                error: Errors.EmailAlreadyInUse,
                data: undefined,
                success: false,
            })
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: userData,
        })
        return res.status(200).json({
            error: undefined,
            data: parseUserForResponse(updatedUser),
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            error: 'ServerError',
            data: undefined,
            success: false,
        })
    }
}

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.query
        const user = await prisma.user.findFirst({
            where: { email: email?.toString() },
        })
        if (!user) {
            return res.status(404).json({
                error: Errors.UserNotFound,
                data: undefined,
                success: false,
            })
        }
        return res.status(200).json({
            error: undefined,
            data: parseUserForResponse(user),
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            error: 'ServerError',
            data: undefined,
            success: false,
        })
    }
}

export default {
    createUser,
    editUser,
    getUserByEmail,
}
