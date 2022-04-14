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

  return response.status(200).json(userForms);
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

  const formId = new ObjectId();

  const { matchedCount } = await userCollection.updateOne(
    { _id: new ObjectId(decodedToken.id) },
    { $push: { forms: { ...newForm, _id: formId } } }
  );

  if (matchedCount === 0) {
    return response.status(404).json({ error: "Couldn't find user" });
  }

  // TODO get newForm from DB instead of passing it back
  return response.status(201).json({ ...newForm, _id: formId });
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
    { _id: userId, "forms._id": formId },
    { $set: { "forms.$": { ...formToUpdate, _id: formId } } } // update form
  );

  if (matchedCount === 0) {
    return response.status(4041).json({ error: "Couldn't find user" });
  }

  return response.status(200).json(formToUpdate);
});

/*
 * Endpoint for user to delete a form
 */
formsRouter.delete("/", async (request, response) => {
  const token = getTokenFromRequest(request);

  const decodedToken = token
    ? (jwt.verify(token, secret as Secret) as JwtPayload)
    : null;

  if (!token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const userId = new ObjectId(decodedToken.id);
  const formId = new ObjectId(request.body.formId);

  const { modifiedCount } = await userCollection.updateOne(
    { _id: userId },
    { $pull: { forms: { _id: formId } } }
  );

  return modifiedCount === 0
    ? response.status(404).json({ error: "couldn't find form" })
    : response.sendStatus(200);
});

/*
 * Endpoint for user to delete multiple forms
 */
formsRouter.delete("/multiple", async (request, response) => {
  const token = getTokenFromRequest(request);

  const decodedToken = token
    ? (jwt.verify(token, secret as Secret) as JwtPayload)
    : null;

  if (!token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const userId = new ObjectId(decodedToken.id);
  const formIds = request.body.formIds;

  for (const formId of formIds) {
    await userCollection.updateOne(
      { _id: userId },
      { $pull: { forms: { _id: new ObjectId(formId) } } }
    );
  }

  response.status(200).json(formIds);
});

/*
 * Endpoint for any user (unauthenticated) to get a form by username and form id
 * in order to submit it
 */
formsRouter.get("/form-to-submit", async (request, response) => {
  const username = request.get("username");
  const formId = request.get("formId");

  const queryResult = await userCollection.findOne(
    {
      username,
    },
    { projection: { _id: 0, forms: 1 } }
  );
  const userForms = queryResult?.forms;

  const form = userForms?.filter(
    (f: any) => f._id.toString() === new ObjectId(formId).toString()
  );

  return response.status(200).json(form[0]);
});

export default formsRouter;
