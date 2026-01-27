const express = require("express");
const router = express.Router();

const v1ApiRoutes = require('./v1/index');

router.use('/v1', v1ApiRoutes); // v1ApiRoutes -> router in other file -> /user

module.exports = router;
