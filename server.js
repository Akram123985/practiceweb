const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Route to handle form submissions
app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    // Load existing comments
    fs.readFile("comments.json", "utf8", (err, data) => {
        let comments = [];
        if (!err && data) {
            comments = JSON.parse(data);
        }

        // Add new comment
        const newComment = { name, email, message };
        comments.push(newComment);

        // Save updated comments back to file
        fs.writeFile("comments.json", JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                console.error("Error saving comment:", err);
                return res.status(500).send("Error saving comment.");
            }
            res.redirect("/comments.html"); // Redirect user to comments page
        });
    });
});

// Route to get saved comments and send them to frontend
app.get("/get-comments", (req, res) => {
    fs.readFile("comments.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading comments file:", err);
            return res.status(500).json({ error: "Failed to load comments" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

