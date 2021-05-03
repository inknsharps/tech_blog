// DASHBOARD ROUTE
// MAKE SURE TO ADD AUTHENTICATION HERE
const router = require("express").Router();
const { User, Post } = require("../models");

// This will get the user by id, and display all the blog posts they've made.
router.get("/:id", async (req, res) => {
    try {
        const userSpecificPosts = await User.findByPk(req.params.id, {
            include: 
                { model: Post, as: "post_creator" }
        });
        const usersPosts = userSpecificPosts.get({ plain:true });
        console.log(usersPosts)
        res.status(200).json(usersPosts);
    } catch (err) {
        res.status(400).json("Page not found!");
    }
});

module.exports = router;