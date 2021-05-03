const router = require("express").Router();
const { User, Post, Comment } = require("../models");
 
// We grab only the username and comment content from this?
router.get("/", async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "post_creator",
                    attributes: ["username"]
                }
            ]
        });
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in, // logged in status from the session object
            userId: req.session.user_id // user id from the session object
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This is a placeholder, and will need the login page to be rendered.
router.get("/login", async (req, res) => {
    try {
        res.status(200).render("login");
    } catch (err) {
        res.status(400).json(err);
    }
});

// This is a placeholder, and will need the create account page.
router.get("/signup", async (req, res) => {
    try {
        res.status(200).json("Creating a new account!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// This is a placeholder, and will need the logout page to be rendered.
router.get("/logout", async (req, res) => {
    try {
        res.status(200).json("Logged out!");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;