const express = require('express');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

const router = express.Router();

router.post('/user/signup', AuthRequestValidators.validateUser, UserController.create);
router.delete('/user/:id', UserController.destroy);
router.get('/user/:id', UserController.get);
router.post('/user/signin', AuthRequestValidators.validateUser, UserController.signIn);

module.exports = router;
