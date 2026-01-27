const express = require('express');
const UserController = require('../../controllers/user-controller');

const router = express.Router();

router.post('/user/signup', UserController.create);
router.delete('/user/:id', UserController.destroy);

module.exports = router;
