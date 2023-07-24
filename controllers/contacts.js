const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

/**
 * GET all contacts
 */
const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

/**
 * GET one contact by id
 */
const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// /**
//  * ADD one contact
//  */
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// /**
//  * PUT one contact by id
//  */
const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

/**
 * UPDATE one contact by id
 */
const updateStatusContact = async (req, res) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

/**
 * DELETE one contact by id
 */
const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
