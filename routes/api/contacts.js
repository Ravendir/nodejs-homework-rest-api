const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../model/index");

const { postValidate, updateValidate } = require("../../services/validation");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  if (contacts.length === 0) {
    return res.status(400).json({ message: "contacts not found" });
  }
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact.length === 0) {
    return res.status(404).json({
      message: `Contact with id: "${contactId}" does't exist. Please try again!`,
    });
  }
  return res.status(200).json({ contact });
});

router.post("/", postValidate, async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const body = {
    name,
    email,
    phone,
    favorite: favorite || false,
  };
  addContact(body);
  res.status(201).json({ body });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToDelete = await removeContact(contactId);
  return res
    .status(contactToDelete.status)
    .json({ message: contactToDelete.message });
});

router.put("/:contactId", updateValidate, async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body)) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updContact = await updateContact(contactId, req.body);

  if (updateContact.message === 400) {
    res.status(updContact.status).json({ message: updateContact.message });
  }

  return res.status(200).json({ ...updContact });
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const updStatus = await updateStatusContact(contactId, req.body);
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  if (!updStatus) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ updStatus });
});

module.exports = router;
