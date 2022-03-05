import { Router, Request } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { secret, client } from "../config";

const userCollection = client.db("Custom-Forms").collection("Users");
const formsRouter = Router();

/*
 * Get bearer token from request
 */
const getTokenFromRequest = (request: Request): string | null => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

/*
 * Endpoint for user to get all their forms
 */
formsRouter.get("/", async (request, response) => {
  const token = getTokenFromRequest(request);

  const decodedToken = token
    ? (jwt.verify(token, secret as Secret) as JwtPayload)
    : null;

  if (!token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const userForms = (
    await userCollection.findOne(
      {
        _id: new ObjectId(decodedToken.id),
      },
      { projection: { _id: 0, forms: 1 } }
    )
  )?.forms;

  if (!userForms) {
    return response.status(401).json({ error: "Couldn't find user" });
  }

  response.status(201).json(userForms);
});

/*
 * Endpoint for user to create a new form
 */
formsRouter.post("/", async (request, response) => {
  const token = getTokenFromRequest(request);
  const newForm = request.body.formData;

  const decodedToken = token
    ? (jwt.verify(token, secret as Secret) as JwtPayload)
    : null;

  if (!token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const { matchedCount } = await userCollection.updateOne(
    { _id: new ObjectId(decodedToken.id) },
    { $push: { forms: { ...newForm, _id: new ObjectId() } } }
  );

  if (matchedCount === 0) {
    return response.status(401).json({ error: "Couldn't find user" });
  }

  // TODO get newForm from DB instead of passing it back
  response.status(201).json(newForm);
});

/**
 * Endpoint for user to update a form
 */
formsRouter.put("/", async (request, response) => {
  const token = getTokenFromRequest(request);
  const formToUpdate = request.body.formData;

  const decodedToken = token
    ? (jwt.verify(token, secret as Secret) as JwtPayload)
    : null;

  if (!token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const userId = new ObjectId(decodedToken.id);
  const formId = new ObjectId(formToUpdate._id);
  const { matchedCount } = await userCollection.updateOne(
    { _id: userId, "forms._id": formId }, // find form with id
    { $set: { "forms.$": formToUpdate } } // update form
  );

  if (matchedCount === 0) {
    return response.status(401).json({ error: "Couldn't find user" });
  }

  response.status(201).json(formToUpdate);
});

export default formsRouter;
