import { RequestHandler } from "express";
import { ObjectSchema } from "yup";
import Errors from "../constants/error";

type RequestValidate = (schema: ObjectSchema<{}>) => RequestHandler;

const RequestValidateBody: RequestValidate =
  (schema) => async (req, res, next) => {
    if (schema.fields && !Object.keys(schema.fields).length) {
      return res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
    try {
      await schema.validate(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }
  };

const RequestValidate = {
  body: RequestValidateBody,
};

export default RequestValidate;
