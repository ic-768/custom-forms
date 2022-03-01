import { Router, Request } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { secret, client } from "../config";

const userCollection = client.db("Custom-Forms").collection("Users");
const formsRouter = Router();

/*
 * Get bearer token from request
 */
const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

/*
 * Endpoint for user to create a new form
 */
formsRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request);
  const newForm = request.body.formData;

  const decodedToken = token
    ? (jwt.verify(token, secret as Secret) as JwtPayload)
    : null;

  if (!token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const { matchedCount } = await userCollection.updateOne(
    { _id: new ObjectId(decodedToken.id) },
    { $push: { forms: newForm } }
  );

  if (matchedCount === 0) {
    return response.status(401).json({ error: "Couldn't find user" });
  }

  // TODO get newForm from DB instead of passing it back
  response.status(201).json(newForm);
});

export default formsRouter;
