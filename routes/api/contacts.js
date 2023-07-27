const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateBodyPost,
  isValidId,
  validateBodyPut,
  validateBodyPatch,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBodyPost(schemas.addSchema), ctrl.add);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBodyPut(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBodyPatch(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
