document.addEventListener("DOMContentLoaded", () => {
    console.log("Fetching comments...");  // Debugging line

    fetch("/get-comments")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(comments => {
            console.log("Comments received:", comments); // Debugging line
            const commentsContainer = document.getElementById("comments-container");
            commentsContainer.innerHTML = ""; 

            if (comments.length === 0) {
                commentsContainer.innerHTML = "<p>No comments yet. Be the first to leave one!</p>";
                return;
            }

            comments.forEach(comment => {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment-box");
                commentDiv.innerHTML = `
                    <h3>${comment.name} <span>(${comment.email})</span></h3>
                    <p>${comment.message}</p>
                    <hr>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error("Error loading comments:", error);
            document.getElementById("comments-container").innerHTML = "<p>Failed to load comments.</p>";
        });
});

