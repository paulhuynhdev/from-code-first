import { Request, Response } from "express";
import Errors from "../constants/error";
import generateRandomPassword from "../helpers/generateRandomPassword";
import parseUserForResponse from "../helpers/parseUserForResponse";
import { prisma } from "../database";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // Check if the username is already in use
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username: req.body.username },
    });
    if (existingUserByUsername) {
      return res.status(409).json({
        error: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }
    // Check if the email is already in use
    const existingUserByEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (existingUserByEmail) {
      return res.status(409).json({
        error: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: generateRandomPassword(10),
      },
    });

    return res.status(201).json({
      error: undefined,
      data: parseUserForResponse(user),
      succes: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      data: undefined,
      success: false,
    });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    // check user exists
    const user = await prisma.user.findFirst({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      });
    }
    // Check if the username is already in use
    const existingUserByUsername = await prisma.user.findFirst({
      where: {
        username: req.body.username,
        NOT: { id: parseInt(userId) },
      },
    });
    if (existingUserByUsername) {
      return res.status(409).json({
        error: Errors.UsernameAlreadyTaken,
        data: undefined,
        success: false,
      });
    }
    // Check if the email is already in use
    const existingUserByEmail = await prisma.user.findFirst({
      where: { email: req.body.email, NOT: { id: parseInt(userId) } },
    });
    if (existingUserByEmail) {
      return res.status(409).json({
        error: Errors.EmailAlreadyInUse,
        data: undefined,
        success: false,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: userData,
    });
    return res.status(200).json({
      error: undefined,
      data: parseUserForResponse(updatedUser),
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      data: undefined,
      success: false,
    });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const user = await prisma.user.findFirst({
      where: { email: email?.toString() },
    });
    if (!user) {
      return res.status(404).json({
        error: Errors.UserNotFound,
        data: undefined,
        success: false,
      });
    }
    return res.status(200).json({
      error: undefined,
      data: parseUserForResponse(user),
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      data: undefined,
      success: false,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;

    if (sort !== "recent") {
      return res.status(400).json({
        error: Errors.ClientError,
        data: undefined,
        success: false,
      });
    }
    const postsWithVotes = await prisma.post.findMany({
      include: {
        votes: true,
        memberPostedBy: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
      orderBy: {
        dateCreated: "desc",
      },
    });

    return res.json({
      error: undefined,
      data: { posts: postsWithVotes },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "ServerError",
      data: undefined,
      success: false,
    });
  }
};

export default {
  createUser,
  editUser,
  getUserByEmail,
  getUsers,
};
