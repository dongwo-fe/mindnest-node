/**
 * 用json文件来统一管理数据
 */
import fs from "node:fs";
import path from "node:path";

// 数据文件名
const catalogueName = ".data.json"
const cataloguePath = path.resolve(process.cwd(), catalogueName)

// 笔记目录
const noteDir = path.resolve(process.cwd(), "notes")

export function checkDataFile() {
    // 检查文件是否存在
    if (!fs.existsSync(cataloguePath)) {
        // 如果文件不存在，则创建一个空的JSON文件
        fs.writeFileSync(cataloguePath, JSON.stringify({}));
    }
    // 检查目录是否存在
    if (!fs.existsSync(noteDir)) {
        // 如果目录不存在，则创建目录
        fs.mkdirSync(noteDir, { recursive: true });
    }
}
