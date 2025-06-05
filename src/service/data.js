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

let catalogueData = null;

// 获取目录数据
export function getCatalogue() {
    if (catalogueData === null) {
        // 读取数据文件
        const data = fs.readFileSync(cataloguePath, 'utf8');
        catalogueData = JSON.parse(data);
    }
    return catalogueData;
}

export function updateFileData(filepath) {
    if (catalogueData === null) {
        getCatalogue()
    }
    // 按照path的层级放文件的目录层级
    filepath = filepath.replace(/\\/g, '/'); // 替换反斜杠为正斜杠，确保路径格式一致
    const list = filepath.split('/');
    if (list.length > 0 && list[0] === ".") list.shift(); // 如果路径以点开头，移除第一个元素
    if (list.length > 0 && list[0] === "..") list.shift(); // 如果路径以点点开头，移除第一个元素
    const filename = list.pop(); // 获取文件名

    let curdata = catalogueData
    if (list.length > 1) {
        for (let i = 0; i < list.length - 1; i++) {
            if (!curdata[list[i]]) {
                curdata[list[i]] = {};
            }
            curdata = curdata[list[i]]; // 更新当前数据指针
        }
        curdata[list[list.length - 1]] = {
            name: filename,
            type: "file",
            date: Date.now()
        }
    } else {
        curdata[filename] = {
            name: filename,
            type: "file",
            date: Date.now()
        }
    }
}