const express = require('express');

const app = express();
const { PORT } = require('./config/serverConfig.js');

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is listening at the port ${PORT}`)
    })
};

startServer();
