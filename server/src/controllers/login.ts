import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";

import { secret, client } from "../config";

const loginRouter = Router();
const userCollection = client.db("Custom-Forms").collection("Users");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await userCollection.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, secret as Secret);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default loginRouter;
