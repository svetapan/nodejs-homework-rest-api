const contacts = require("../models/contacts.js");

const { HttpError, ctrlWrapper } = require("../helpers");

/**
 * GET all contacts
 */
const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

/**
 * GET one contact by id
 */
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

/**
 * ADD one contact
 */
const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

/**
 * DELETE one contact by id
 */
const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

/**
 * PUT one contact by id
 */
const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
