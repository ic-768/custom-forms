import { Router } from "express";
import bcrypt from "bcrypt";

import { client } from "../config";

const userRouter = Router();
const userCollection = client.db("Custom-Forms").collection("Users");

/*
 * Helper function to handle user sign-up
 */
async function createUser(newUser: { username: string; passwordHash: string }) {
  const existingUser = await userCollection.findOne({
    username: newUser.username,
  });

  if (existingUser) {
    return null;
  }

  const response = await userCollection.insertOne(newUser);
  const createdUser = await userCollection.findOne({
    _id: response.insertedId,
  });

  return createdUser;
}

/**
 * Sign user up if username is unique
 */
userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await createUser({
      username,
      passwordHash,
    });

    if (user === null) {
      res.status(401).json({ error: "User already exists" });
      return;
    }

    res.send(user);
  } catch (e) {
    res.send("Error creating user:" + e);
  }
});

export default userRouter;
