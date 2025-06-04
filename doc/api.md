# API 文档

## 1. 全局鉴权说明
所有 API 请求需在 Header 中携带固定的 `Authorization` Key 进行鉴权校验。系统生成的key需要使用md5加密。

## 2. 文档上传

- **接口地址**：`POST /api_data/update`
- **请求参数**（form-data）：[]
  - `file` (file)：要上传的文档文件
  - `file_path`:文件路径
- **返回参数**：

## 3. 文档下载

- **接口地址**：`GET /api_data/:file_name`
- **请求参数**：
  - `file_path` (path)：文档的路径
  - `file_name` (path)：文档的名称
- **返回**：
  - 文件流

## 4. 获取文档列表

- **接口地址**：`GET /api_data/list`
- **请求参数**：无
- **返回参数**：
  - `list` (array)：文档列表
    - `fileName` (string)：文件名
    - `file_path` (string)：文档路径
    - `file_date` (string)：上传时间

## 99. 返回范例
``` json
{
  "code":200,
  "data":null,
  "message":""
}
```
## 00. 错误码说明
- 401 Unauthorized：鉴权失败
- 400 Bad Request：请求参数错误
- 500 Internal Server Error：服务器内部错误