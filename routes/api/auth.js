const express = require("express");

const ctrl = require("../../controllers/auth");

const {
  validateBodyPost,
  validateSubscription,
  authenticate,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

/**
 * Signup
 */
router.post(
  "/register",
  validateBodyPost(schemas.registerSchema),
  ctrl.register
);

/**
 * Verify
 */
router.get("/verify/:verificationCode", ctrl.verify);

router.post(
  "/verify",
  validateBodyPost(schemas.userEmailSchema),
  ctrl.resendVerify
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
