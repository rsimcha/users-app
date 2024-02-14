import { Request, Response } from "express";
import axios from "axios";
import { UserModel } from "../db/users";

const externalAPI = "https://reqres.in";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = req.params.page;
    const response = await axios.get(`${externalAPI}/api/users?page=${page}`);
    const users = response.data.data;
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${externalAPI}/api/users/${id}`);
    const user = response.data.data;
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const response = await UserModel.create(newUser);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const response = await UserModel.findOneAndUpdate({ id }, updatedUser, {
      new: true,
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await UserModel.findOneAndDelete({ id });
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};
