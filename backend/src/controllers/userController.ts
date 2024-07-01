import userModel from "../models/userModel";
import todoModel from "../models/todoModel";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User, userValidation } from "../validators/userValidators";
import { catchBlock } from "../helper/commonCode";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ZodError } from "zod";

const postUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    userValidation.parse(user);
    const alreadyExistUser = await userModel.findOne({ email: user.email });
    if (alreadyExistUser)
      return res.status(400).send({ message: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const data = await userModel.create({ ...user, password: hashedPassword });
    return res
      .status(200)
      .send({ data: data, message: "User added successfully" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any | ZodError) {
    return catchBlock(e, res, "User not added");
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const { email, password } = user;
    userValidation.parse(user);
    const data = await userModel.findOne({ email });
    if (!data) return res.status(400).send({ message: "User doesnot exists" });

    const isCorrectPassword = bcrypt.compareSync(password, data.password);
    if (data && isCorrectPassword) {
      const token = jwt.sign(
        { user: { userId: data._id, email: data.email } },
        `${process.env.SECRET_KEY}`,
        { expiresIn: "10d" }
      );
      return res.status(200).send({
        data: { token, email: data.email },
        message: "User logged in successfully",
      });
    } else {
      return res.status(400).send({ message: "Credentials not correct" });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any | ZodError) {
    return catchBlock(e, res, "User not loged in");
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    userValidation.parse(user);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const data = await userModel.findByIdAndUpdate(req.query.id, {
      ...user,
      hashedPassword,
    });
    if (!data)
      return res.status(200).send({ data: data, message: "User not found" });
    return res
      .status(200)
      .send({ data: data, message: "User updated successfully" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any | ZodError) {
    return catchBlock(e, res, "User not updated");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.query.id);
    const delUser = await userModel.findByIdAndDelete(req.query.id);
    const todoData = await todoModel.deleteMany({ userId: user?.id });
    console.log(todoData);

    if (!user)
      return res.status(200).send({ data: delUser, message: "User not found" });
    return res
      .status(200)
      .send({ data: user, message: "User Deleted Successfully" });
  } catch (e: any | ZodError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return catchBlock(e, res, "User not deleted");
  }
};

export { postUser, loginUser, updateUser, deleteUser };
