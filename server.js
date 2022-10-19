const { readdirSync } = require("fs");
const express = require('express');
const app = express();
const port =  6060;
const helmet = require('helmet');
const colors = require("colors");
const morgan = require("morgan");
const cors = require('cors');
const router = require("./routes/image");

// middlewares
app.use(router);
app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// DB Connection
// mongoose
//     .connect(process.env.DATABASE)
//     .then(() => console.log("DB connected".red.bold))
//     .catch((err) => console.log("DB Error => ", err));

// routes middleware
// readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

// server

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});