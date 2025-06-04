# API 文档

## 1. 全局鉴权说明
所有 API 请求需在 Header 中携带固定的 `Authorization` Key 进行鉴权校验。  
示例：

---

## 2. 系统初始化鉴权 Key

### 2.1 初始化 Key
- **接口地址**：`POST /api/auth/init`
- **请求参数**：
  - `adminPassword` (string)：管理员初始化密码
- **返回参数**：
  - `authKey` (string)：系统生成的全局鉴权 Key

---

## 3. 文档上传

### 3.1 上传文档
- **接口地址**：`POST /api/docs/upload`
- **请求参数**（form-data）：
  - `file` (file)：要上传的文档文件
- **返回参数**：
  - `docId` (string)：文档唯一标识
  - `fileName` (string)：文件名

---

## 4. 文档下载

### 4.1 下载文档
- **接口地址**：`GET /api/docs/download/:docId`
- **请求参数**：
  - `docId` (path)：文档唯一标识
- **返回**：
  - 文件流

---

## 5. 获取文档列表

### 5.1 获取文档列表
- **接口地址**：`GET /api/docs/list`
- **请求参数**：无
- **返回参数**：
  - `docs` (array)：文档列表
    - `docId` (string)：文档唯一标识
    - `fileName` (string)：文件名
    - `uploadTime` (string)：上传时间

---

## 6. 错误码说明
- 401 Unauthorized：鉴权失败
- 400 Bad Request：请求参数错误
- 500 Internal Server Error：服务器内部错误