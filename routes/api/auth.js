const express = require("express");

const ctrl = require("../../controllers/auth");

const {
  validateBodyPost,
  validateSubscription,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

/**
 * Signup
 */
const router = express.Router();
router.post(
  "/register",
  validateBodyPost(schemas.registerSchema),
  ctrl.register
);

/**
 * Signin
 */
router.post("/login", validateBodyPost(schemas.loginSchema), ctrl.login);

/**
 * CurrentUser
 */
router.get("/current", authenticate, ctrl.getCurrent);

/**
 * Logout
 */
router.post("/logout", authenticate, ctrl.logout);

/**
 * Update
 */
router.patch(
  "/:userId/subscription",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
