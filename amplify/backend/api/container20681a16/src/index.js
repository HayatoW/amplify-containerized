const express = require("express");
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// すべてのメソッドに対し CORS を有効にする
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get("/", async (req, res, next) => {

    try {
        res.contentType("application/json").send({
            "randomNumber": Math.floor(Math.random() * 101)
        })
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});
