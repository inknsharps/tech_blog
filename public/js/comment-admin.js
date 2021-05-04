// Contains all the related functionality about creating, updating, and deleting comments.
// These follow the same structure as the post-admin fetch calls since the backend API functions pretty similarly.
// NOTE: These all need to be linked to the DOM and Handlebars templates before they are functional.

// The properties we need to create a comment are the userId, the postId, and the new comment's text, so these need to be grabbed from the DOM accordingly.
const createComment = async (event) => {
    event.stopPropagation();

    const userId = event.target.getAttribute("data-userid");
    const postId = event.target.getAttribute("data-postid");
    const commentContent = document.querySelector(".new-comment").textContent;

    const response = await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({ userId, commentContent }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to create comment.");
    }
};

const updateComment = async (event) => {
    event.stopPropagation();

    const commentId = event.target.getAttribute("data-commentid");
    const commentContent = document.querySelector(`.comment-content-${commentId}`).textContent;
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ commentContent }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to update comment.");
    }
};

const deleteComment = async (event) => {
    event.stopPropagation();

    const commentId = event.target.getAttribute("data-commentid");
    const response = await fetch(`/api/commentss/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to delete comment.");
    }
};

document.querySelector(".new-comment").addEventListener("click", createComment);
document.querySelectorAll(".update-comment").forEach((comment) => {
    comment.addEventListener("click", updateComment);
});
document.querySelectorAll(".delete-comment").forEach((comment) => {
    comment.addEventListener("click", deleteComment);
});
