import { app } from "./app.js";
import { connectDB } from "./config/mongodb.js";
const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello my Chutidet server!')
// })

try {
    await connectDB()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
});
} catch (error) {
    console.error("Startup failed", error);
    process.exit(1);
}
