const express = require("express");
const router = express.Router();

const users = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
    { id: 3, name: "Jim", email: "jim@example.com" },
];

// GET all users
router.get("/", (req, res) => {
    res.json(users);
});

// POST (Create a new user)
router.post("/", (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.json(newUser);
});

// PUT (Update user details)
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    res.json(user);
});

// DELETE a user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully" });
});

module.exports = router; // Export router
