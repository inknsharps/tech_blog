const { Post } = require("../../models");
const router = require("express").Router();

// Dashboard needs to view all posts from the logged in user

// This is for a brand spanking new post
// Probably need to grab the new post content and the user id from the req.body
router.post("/", async (req, res) => {
    try {
        const newPost = Post.create({
            userId: req.body.userId,
            blogContent: req.body.blogContent
        });
        res.status(200).json("New Post Created!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// This is for updating an existing post
// Will need to feed in the specific post id through the req.params, and the updated blog text through req.body
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = Post.update({
            blogContent: req.body.blogContent
        },
        {
            where: { id: req.params.id }
        });
        res.status(200).json("Post Updated!");
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;