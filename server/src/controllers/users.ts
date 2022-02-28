import { MongoClient } from "mongodb";
import { Router } from "express";
import bcrypt from "bcrypt";

import { client } from "../config";

const userRouter = Router();
const userCollection = client.db("CustomForms").collection("Users");

async function createUser(
  client: MongoClient,
  newUser: { username: string; passwordHash: string }
) {
  const response = await userCollection.insertOne(newUser);

  const createdUser = await userCollection.findOne({
    _id: response.insertedId,
  });

  return createdUser;
}

userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await createUser(client, {
      username,
      passwordHash,
    });
    res.send(user);
  } catch (e) {
    res.send("Error creating user:" + e);
  }
});

export default userRouter;
