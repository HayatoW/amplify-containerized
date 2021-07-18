const express = require("express");
const http = require('http');
const port = process.env.PORT || 3001;

const { fizzBuzz } = require('./fizzbuzz');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// すべてのメソッドに対し CORS を有効にする
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get("/fizzbuzz", (req, res, next) => {
    // python コンテナとの通信設定
    const options = {
        port: 5000,
        host: 'localhost',  // ローカル開発の場合は 'python' に置き換える
        method: 'GET',
        path: '/random'
    };

    // python コンテナから乱数を受け取る
    http.get(options, data => {
        var body = '';
        data.on('data', (chunk) => {
            body += chunk
        });
        data.on('end', () => {
            console.log(body);
            const randomNumber = body;
            const fizzOrBuzz = fizzBuzz(randomNumber);

            try {
                res.contentType("application/json").send({
                    "newRandomNumber": body,
                    "fizzOrBuzz": fizzOrBuzz
                });
            } catch (error) {
                console.error(error);
                next(error);
            }
        }).on('error', (error) => {
            console.error(error);
        });
    });
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});