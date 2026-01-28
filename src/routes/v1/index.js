const express = require('express');
const UserController = require('../../controllers/user-controller');

const router = express.Router();

router.post('/user/signup', UserController.create);
router.delete('/user/:id', UserController.destroy);
router.get('/user/:id', UserController.get);
router.post('/user/signin', UserController.signIn);

module.exports = router;
