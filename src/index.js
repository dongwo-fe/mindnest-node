import express from "express"
import bodyParser from "body-parser";

import { initKey } from "./service/key.js"
import { checkDataFile } from "./service/data.js";

import test from "./api/test.js";
import data from "./api/data.js";

if (!process.env.NODE_ENV) process.env.NODE_ENV = {}

const app = express()
const port = process.env.NODE_ENV.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 初始化路由
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api_test", test);
app.use("/api_data", data);


checkDataFile();

app.listen(port, () => {
    console.log(`服务启动 http://localhost:${port}`)
    initKey()
})

// 自定义范围内容
app.response.sendError = function (code, message) {
    this.status(code).json({
        code: code,
        message: message
    });
}