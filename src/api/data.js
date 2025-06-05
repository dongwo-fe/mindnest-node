import express from 'express';
import multer from "multer";
import fs from "node:fs";
import path from "node:path";

import { authMiddleware } from '../middleware/auth.js';
import { getCatalogue } from '../service/data.js';

const router = express.Router();

router.use(authMiddleware);

// 配置 Multer 存储引擎
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'notes/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// 创建 Multer 实例
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB 限制
    },
    // fileFilter: (req, file, cb) => {
    //     // 限制上传文件类型
    //     const filetypes = /jpeg|jpg|png|gif/;
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimetype = filetypes.test(file.mimetype);

    //     if (extname && mimetype) {
    //         cb(null, true);
    //     } else {
    //         cb(new Error('只允许上传图片文件！'), false);
    //     }
    // }
});

// 获取文件列表
router.get('/', (req, res) => {
    const data = getCatalogue()
    res.send('Welcome to the API!');
    res.sendSuccess(data);
});

// 更新文件
router.post('/update', upload.single("filedata"), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    res.send("200")
    res.sendSuccess({
        filename: req.file.originalname,
        size: req.file.size,
    })
});

// 下载单文件
router.get('/download', (req, res) => {
    const filePath = path.join('notes', req.query.filename);

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                console.error("下载文件失败:", err);
                res.sendError(500, "下载文件失败");
            }
        });
    } else {
        res.sendError(404, "文件不存在");
    }
});

export default router;