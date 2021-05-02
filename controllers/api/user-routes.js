const { User } = require("../../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const rawUserData = await User.findAll();
        const userData = rawUserData.map((user) => user.get({ plain: true }));
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// This makes a new user model
// Make sure to attach the new user info to the req.body for this
router.post("/", async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(newUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Make sure to attach the user info the to req.body when you do this post.
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email } });

        if (!userData) {
            res.status(400).json("Incorrect email or password, please try again.");
            return;
        }

        const passwordData = await userData.validatePassword(req.body.password);

        if (!passwordData) {
            res.status(400).json("Incorrect email or password, please try again.");
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;