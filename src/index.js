import express from "express"

import { initKey } from "./service/key.js"

import test from "./api/test.js";

if (!process.env.NODE_ENV) process.env.NODE_ENV = {}

const app = express()
const port = process.env.NODE_ENV.PORT || 3000

// 初始化路由
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api_test", test);

app.listen(port, () => {
    console.log(`服务启动 http://localhost:${port}`)
    initKey()
})