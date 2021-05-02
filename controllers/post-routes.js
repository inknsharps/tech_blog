const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/:id", async (req, res) => {
    try {
        const rawPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "post_creator",
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    as: "post_comments",
                    include: { 
                        model: User, 
                        as: "comment_creator", 
                        attributes: ["username"]
                    },
                }
            ],
        });
        const postData = rawPostData.get({ plain: true });
        console.log(postData)
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json("Page not found!");
    }
});

// Route for posting comments
// Probably should throw in the authorization middleware once we've gotten the page set up for that
// The req.body should probably reference the post id, then contain the posting user's data so it can be cross referenced
router.post("/:id", async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json("Server error!")
    }
});

module.exports = router;