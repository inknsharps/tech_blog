// Contains all the related functionality about creating, updating, and deleting comments.
// These follow the same structure as the post-admin fetch calls since the backend API functions pretty similarly.
// NOTE: These all need to be linked to the DOM and Handlebars templates before they are functional.

// The properties we need to create a comment are the userId, the postId, and the new comment's text, so these need to be grabbed from the DOM accordingly.
const createComment = async (event) => {
    event.stopPropagation();

    const userId = document.querySelector(".user-profile").getAttribute("data-currentuser");
    console.log(userId);
    const postId = event.target.getAttribute("data-postid");
    console.log(postId);
    const commentContent = document.querySelector(".input-comment").value;
    console.log(commentContent);

    const response = await fetch(`/api/comments/${userId}/${postId}`, {
        method: "POST",
        body: JSON.stringify({ userId, postId, commentContent }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to create comment.");
    }
};

// Couple of explanations for this one:
// 1) We want to store the currently logged in user's ID somewhere in the DOM for future reference.
// 2) Once we have that, we can use that to compare against the IDs assigned to comments, blog posts, whatever.
// 3) I'm pretty sure there's better ways to to handle this but I'm tired
const updateComment = async (event) => {
    event.stopPropagation();

    const currentUserId = document.querySelector(".user-profile").getAttribute("data-currentuser");
    console.log(currentUserId);
    const commentUserId = event.target.getAttribute("data-userid");
    console.log(commentUserId);
    const commentId = event.target.getAttribute("data-commentid");
    const commentContent = document.querySelector(`.input-content-${commentId}`).textContent;
    if (currentUserId !== commentUserId){
        return alert("You cannot edit another user's comments!");
    }
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
    console.log(commentId);
    const response = await fetch(`/api/comments/${commentId}`, {
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
