// Contains all the related create, update and destroy functionality of the dashboard page.
// Since this is only on the dashboard page I'm preeeetty sure it's fine to not validate the user...

// This create function won't work without all the necessary targets and querySelectors in the DOM.
// Since we need the userid in the POST method for creating a new blog post, we grab it from a property fed in through the handlebars template.
const createPost = async (event) => {
    event.stopPropagation();

    const userId = event.target.getAttribute("data-userid");
    const blogContent = document.querySelector(".new-blog-title").textContent;

    const response = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({ userId, blogContent }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to create post.");
    }
}

// The big takeaways here:
// 1) When you click on the buttons, it grabs the data-postid attribute (which we set up on our handlebars templates), and gives us the (blog)Post model id. 
// 2) We then grab the new text content of the blog, by selecting a class that we made using handlebars (which uses the (blog)Post model id.
// 3) We then use the fetch API to send over the new text content in the request body, making a PUT request to our API endpoint to update a post.
const updatePost = async (event) => {
    event.stopPropagation();

    const postId = event.target.getAttribute("data-postid");
    const blogContent = document.querySelector(`.blog-title-${postId}`).textContent;
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ blogContent }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to update post.");
    }
};

const deletePost = async (event) => {
    event.stopPropagation();

    const postId = event.target.getAttribute("data-postid");
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to delete post.");
    }
}

// We have to put the new post selector first since not all users will have blog posts, and putting the others first will break the code.
// To make sure that the update and delete buttons work on all blog posts, I used querySelectorAll which returns an array, then used a forEach method to add event listeners to each post.
document.querySelector(".new-post").addEventListener("click", createPost);
document.querySelectorAll(".update-post").forEach((post) => {
    post.addEventListener("click", updatePost);
});
document.querySelectorAll(".delete-post").forEach((post) => {
    post.addEventListener("click", deletePost);
});
