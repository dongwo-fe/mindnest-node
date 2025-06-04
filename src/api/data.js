import express from 'express';
import multer from "multer";
import fs from "node:fs";
import path from "node:path";

import { authMiddleware } from '../middleware/auth.js';

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

router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// 更新文件
router.post('/update', upload.single("filedata"), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    res.send("200")
})
export default router;