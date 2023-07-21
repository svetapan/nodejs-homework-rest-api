const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateBodyPost,
  isValidId,
  validateBodyPut,
  validateBodyPatch,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBodyPost(schemas.addSchema), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  validateBodyPut(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyPatch(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
