const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

/**
 * GET all contacts
 */
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const favorite = req.query.favorite === "true" ? true : false;

  const skip = (page - 1) * limit;

  const totalContacts = await Contact.countDocuments({ owner });

  let result = await Contact.find({ owner }, "", { skip, limit });

  if (req.query.favorite) {
    result = result.filter((contact) => contact.favorite === favorite);
  }

  res.json({
    totalContacts,
    currentPage: page,
    totalPages: Math.ceil(totalContacts / limit),
    contacts: result,
  });
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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
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
