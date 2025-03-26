const express = require("express");
const app = express();
const port = 3000;
const users = [];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.find((user) => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully" });
});


app.put("/users/:id", (req, res) => {
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


app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.json(newUser);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];
    res.json(users);
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log(error);
    }
});


