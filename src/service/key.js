/**
 * 系统密钥服务
 * @module service/key
 */
import fs from "node:fs"
import path from "node:path"
import { nanoid } from "nanoid"
import { Md5String } from "./utils.js"

const KeyName = ".key"
const KeyPath = path.resolve(process.cwd(), KeyName)

export let authKey = ""

export function initKey() {
    // 识别是否已经生成了key，key的生成可以通过随机字符串来解决
    fs.access(KeyPath, fs.constants.F_OK, (err) => {
        if (err) {
            // 如果没有key，则生成一个随机字符串作为key
            authKey = nanoid(32)
            fs.writeFileSync(KeyPath, authKey, "utf-8")
            console.log("生成新的key:", authKey)
        } else {
            authKey = fs.readFileSync(KeyPath, "utf-8")
            // 如果key已存在，则读取并打印
            console.log("key已存在", authKey)
        }
        authKey = Md5String(authKey)
    })
}
