import { check } from "express-validator";

export const userSignupValidator = [
  check("name").not().isEmpty().withMessage("name is required"),

  check("email").isEmail().withMessage("give a valid email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters"),
];
