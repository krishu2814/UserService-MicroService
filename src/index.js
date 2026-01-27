const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');

const startServer = () => {

    const app = express();
    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', ApiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is listening at the port ${PORT}`)
    })
};

startServer();
