import { authKey } from "../service/key.js";

export function authMiddleware(req, res, next) {
    // 检查请求头中是否包含授权信息
    // const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //     return res.sendError(401, "禁止访问");
    // }

    // // 验证授权信息
    // const token = authHeader.split(' ')[1];
    // if (token !== authKey) {
    //     return res.sendError(403, "失效的访问");
    // }

    // 如果验证通过，继续处理请求
    next();
}