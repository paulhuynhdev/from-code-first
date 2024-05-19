import * as schema from "yup";

export const CreateUserSchema = schema.object({
  id: schema.number(),
  email: schema
    .string()
    .email("Must be a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be valid"
    )
    .required(),
  username: schema.string().min(5).max(30).required(),
  firstName: schema.string().min(2).max(30).required(),
  lastName: schema.string().min(2).max(30).required(),
});

export const UpdateUserSchema = schema.object({
  id: schema
    .number()
    .notRequired()
    .test(
      "id",
      "ID field should not be included",
      (value) => value === undefined
    ),
  email: schema
    .string()
    .email("Must be a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be valid"
    ),
  username: schema.string().min(5).max(30),
  firstName: schema.string().min(2).max(30),
  lastName: schema.string().min(2).max(30),
});
