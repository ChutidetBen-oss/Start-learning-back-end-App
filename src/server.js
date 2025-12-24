import { app } from "./app.js";
import { createUser, deleteUser, getUsers, testAPI } from "./module/users/users.controller.js";
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello my Chutidet server!')
// })




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
