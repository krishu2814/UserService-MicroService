const express = require('express');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

const router = express.Router();

router.post('/user/signup', AuthRequestValidators.validateUser, UserController.create);
router.delete('/user/:id', UserController.destroy);
router.post('/user/signin', AuthRequestValidators.validateUser, UserController.signIn);
router.get('/user/isAuthenticated', UserController.isAuthenticated);
// router.get('/dummy', (req, res) => {
//     return res.status(200).send({
//         message: 'OK'
//     });
// });
router.get('/user/:id', UserController.get);

module.exports = router;
