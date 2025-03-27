const express = require("express");
const app = express();
const port = 3000;
const usersRoutes = require("./Routes/users");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log(error);
    }
});


