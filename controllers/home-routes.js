const router = require("express").Router();
const { User, Post, Comment } = require("../models");
 
// We grab only the username and comment content from this?
router.get("/", async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });
        const posts = postsData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render("homepage", {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;