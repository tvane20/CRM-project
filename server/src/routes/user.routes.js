const express = require('express');

const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const { isAuth } = require('../middlewares/authenticator');

const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUsers,
  register,
} = require('../controllers/user.controller');

const { verifyEmail } = require('../services/emails/emailVerification');
const { sendNotifEmail, postEmail } = require('../services/emails/email.controller');

const userRouter = express.Router(); // Create an Express router

// User CRUD ops.
userRouter.post('/register', sanitizeBodyData, validateBodyData, register);
userRouter.get('/verify-email/:token', verifyEmail);
userRouter.use(isAuth);
userRouter.post('/', sanitizeBodyData, validateBodyData, createUsers);
userRouter.get('/', getUsers);
userRouter.get('/:id', validateParamsId, getUserById);
userRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateUser,
);
userRouter.delete('/:id', validateParamsId, deleteUser);

// User mailing
userRouter.post('/notif', sendNotifEmail);
userRouter.post('/send/:id', validateParamsId, postEmail);

// // Endpoint GET all users
// const { permission, authenticator } = require('../middlewares/authenticator');
// userRouter.get('/', authenticator, permission('admin'), getUsers);
// Endpoint for logging in an existing user
// userRouter.post(
//   '/login',
//   [validateEmail(), validatePassword(), handleValidationError],
//   loginUser,
// );

module.exports = userRouter;
