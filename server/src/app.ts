import express from "express";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
require("dotenv").config();

const port = 3001;
const client = new MongoClient(process.env.URI as string);

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function createUser(client: MongoClient, newUser: object) {
  const response = await client
    .db("Custom-Forms")
    .collection("Users")
    .insertOne(newUser);

  const createdUser = await client
    .db("Custom-Forms")
    .collection("Users")
    .findOne({ _id: response.insertedId });

  return createdUser;
}

async function main(): Promise<void> {
  try {
    await client.connect();
  } catch (e) {
    console.log("Error connecting:" + e);
  }

  app.get("/", async (req, res) => {
    res.send("Hello World!");
  });

  // create user
  app.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = await createUser(client, {
        username,
        password: passwordHash,
      });
      res.send(user);
    } catch (e) {
      res.send("Error creating user:" + e);
    }
  });

  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
}

main();
