const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const db = require('./models/index');
const { User, Role } = require('./models/index');

const startServer = () => {

    const app = express();
    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server is listening at the port ${PORT}`)
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true})
        }

        /*
        const u1 = await User.findByPk(4);
        const u2 = await Role.findByPk(1);

        // u1.addRole(u2); // INSERT INTO `User_Roles`
        const response = await u2.getUsers();
        // console.log(u2);
        console.log("////////////////////");
        console.log(response);
        */
    })
};

startServer();
