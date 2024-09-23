import { expressjwt } from "express-jwt";
import User from "../Models/user.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import _ from "lodash";
import MailMessage from "nodemailer/lib/mailer/mail-message.js";
import { OAuth2Client } from "google-auth-library";
import { response } from "express";
import fetch from "node-fetch";
import axios from "axios";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ status: false, error: "email is taken" });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_USER, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                      <h1>Please use the following link to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                      <hr />
                      <p>This email may contain sensitive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `,
    };

    sendEmail(req, res, emailData);

    // const newUser = new User({ name, email, password });

    // await newUser.save()
    return res.json({
      status: true,
      message: "Email has been sent to signup the user",
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const accountActivation = async (req, res) => {
  try {
    const { token } = req.body;

    if (token) {
      jwt.verify(
        token,
        process.env.JWT_ACCOUNT_ACTIVATION,
        function (err, data) {
          if (err) {
            return res.status(401).json({
              error: "Expired link.Signup",
            });
          }

          const { name, email, password } = jwt.decode(token);

          const user = new User({ name, email, password });

          user.save();
          return res.json({ message: "signup successful,please signin" });
        }
      );
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found,please signup" });
    }

    if (!user.authentication(password)) {
      return res.status(401).json({ error: "Email and Password do not match" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { _id, name, role } = user;

    return res.json({ token: token, user: { _id, name, role } });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.auth._id });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ error: "Admin Resource.Access denied" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }

  next();
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User with the give email does not exist",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });

    const emailData = {
      from: process.env.EMAIL_USER, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "PASSWORD RESET LINK",
      html: `
                  <h1>Please use the following link rest your password</h1>
                  <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                  <hr />
                  <p>This email may contain sensitive information</p>
                  <p>${process.env.CLIENT_URL}</p>
              `,
    };

    const updateResetLink = await User.updateOne({ resetPasswordLink: token });

    if (updateResetLink.acknowledged !== true) {
      return res
        .status(400)
        .json({
          error: "Database connection error for forget password request",
        });
    }
    sendEmail(req, res, emailData);

    // const newUser = new User({ name, email, password });

    // await newUser.save()
    return res.json({
      status: true,
      message: "Email has been sent to reset the password",
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, resetPasswordLink } = req.body;

    if (resetPasswordLink) {
      jwt.verify(
        resetPasswordLink,
        process.env.JWT_RESET_PASSWORD,
        function (err, data) {
          if (err) {
            return res.status(401).json({
              error: "Expired link.Try Again",
            });
          }
        }
      );

      const user = await User.findOne({ resetPasswordLink });

      if (!user) {
        return res.status(401).json({
          error: "Something went wrong.Try later",
        });
      }

      const updatedFields = {
        password: newPassword,
        resetPasswordLink: "",
      };

      const userExtend = _.extend(user, updatedFields);

      const updatedPassword = await userExtend.save();

      if (!updatedPassword) {
        return res.status(401).json({
          error: "Error in resetting the password",
        });
      } else {
        return res.json({
          message: "Success!,Now you can login with your new password",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
  try {
    const { data } = req.body;
    const clientData = await client
      .verifyIdToken({ idToken: data, audience: process.env.GOOGLE_CLIENT_ID })
      .then((response) => {
        console.log("GOOGLE LOGIN RESPONSE", response.payload);
        return response.payload;
      })
      .catch((err) => console.log(err));
    const { email_verified, email, name } = clientData;
    if (email_verified) {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          const { _id, email, name, role } = user;

          return res.json({ token: token, user: { _id, email, name, role } });
        } else {
          const password = email + process.env.JWT_SECRET;
          const user = new User({ name, email, password });
          user.save((err, data) => {
            if (err) {
              console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
              return res.status(400).json({
                error: "User signup failed with google",
              });
            }
            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, role } = data;
            return res.json({ token: token, user: { _id, name, role } });
          });
        }
      } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
      }
    } else {
      return res.json({ error: "Google login failed,try again!" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

export const facebookLogin = async (req, res) => {
  const { userId, accessToken } = req.body;

  const url = `https://graph.facebook.com/v12.0/${userId}?fields=id,name,email&access_token=${accessToken}`;
  try {
    const response = await fetch(url);
    const userData = await response.json();

    // Check if there's an error from Facebook API
    if (userData.error) {
      console.log(userData.error.message);
      return res.json({ error: userData.error.message });
    }

    // Log or return the user data
    console.log(userData);
    const { id, email, name } = userData;
    if (userData) {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          const { _id, email, name, role } = user;

          return res.json({ token: token, user: { _id, email, name, role } });
        } else {
          const password = email + process.env.JWT_SECRET;
          const user = new User({ name, email, password });
          const updatedUser = await user.save();
          if (!updatedUser) {
            console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
            return res.status(400).json({
              error: "User signup failed with facebook",
            });
          } else {
            const token = jwt.sign(
              { _id: updatedUser._id },
              process.env.JWT_SECRET,
              { expiresIn: "7d" }
            );
            const { _id, email, name, role } = updatedUser;
            return res.json({ token: token, user: { _id, name, role } });
          }
        }
      } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
      }
    } else {
      return res.json({ error: "Facebook login failed,try again!" });
    }
  } catch (error) {
    console.error("Error fetching user data from Facebook:", error);
    return res.json({ error: error.message });
  }
};
