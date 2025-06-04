import crypto from "node:crypto";
import fs from "node:fs"

/**
 * 计算字符串的MD5值
 * @function Md5String
 * @param {*} txt 文本
 * @returns md5加密后的字符串
 * @description 使用Node.js的crypto模块对字符串进行MD5加密
 */
export function Md5String(txt) {
    return crypto.createHash("md5").update(txt).digest("hex");
}

/**
 * 计算文件的 MD5 值（异步）
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export function md5File(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("md5")
        const stream = fs.createReadStream(filePath)
        stream.on("data", chunk => hash.update(chunk))
        stream.on("end", () => resolve(hash.digest("hex")))
        stream.on("error", err => reject(err))
    })
}
