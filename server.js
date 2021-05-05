const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("handlebars-helpers")();
// We attach the custom helpers to the handlebars-helpers object because express handlebars doesn't like to take multiple helper objects
helpers.formatTime = require("./utils/custom-helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection.js");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET,
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers"));

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`));
});