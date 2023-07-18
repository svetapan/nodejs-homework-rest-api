const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBodyPost, validateBodyPut } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBodyPost(schemas.addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBodyPut(schemas.addSchema), ctrl.updateById);

module.exports = router;
