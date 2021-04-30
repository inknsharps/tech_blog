const router = require("express").Router();
const { Post, Comment } = require("../models");
 
router.get("/", async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;