const express = require('express');

const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');

const startServer = () => {

    const app = express();
    app.use('/api', ApiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is listening at the port ${PORT}`)
    })
};

startServer();
