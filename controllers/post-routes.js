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
        res.status(400).json("page not found");
    }
});

module.exports = router;