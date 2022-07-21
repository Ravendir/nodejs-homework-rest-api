const express = require("express");
const contactsRouter = express.Router();

const { tokenMiddleware } = require("../../services/tokenMiddleware");

const asyncWrapper = require("../../services/asyncWrapper");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../model/contacts");

const { postValidate, updateValidate } = require("../../services/validation");

contactsRouter.get("/", tokenMiddleware, asyncWrapper(listContacts));

contactsRouter.get(
  "/:contactId",
  tokenMiddleware,
  asyncWrapper(getContactById)
);

contactsRouter.post(
  "/",
  tokenMiddleware,
  postValidate,
  asyncWrapper(addContact)
);

contactsRouter.delete(
  "/:contactId",
  tokenMiddleware,
  asyncWrapper(removeContact)
);

contactsRouter.put(
  "/:contactId",
  tokenMiddleware,
  updateValidate,
  asyncWrapper(updateContact)
);

contactsRouter.patch(
  "/:contactId/favorite",
  tokenMiddleware,
  asyncWrapper(updateStatusContact)
);

module.exports = contactsRouter;
