# AWS 物料點收管理看板

**繁體中文** | [English](README.md)

本專案是一套以 AWS Serverless 架構建立的物料點收示範系統。Excel 檔案進入私有 S3 後，會由 Lambda 自動解析、檢核與套用規則；結果保存於 DynamoDB，再透過 HTTP API 與 CloudFront 看板呈現。

> **公開安全原則：**本 Repository 僅使用合成 Demo 資料；不含公司資料、個人資料、AWS 憑證、帳號識別資訊或實際雲端端點。

![AWS Serverless architecture](docs/assets/aws-serverless-architecture.svg)

## 專案展示重點

| 能力 | 設計結果 |
| --- | --- |
| 新舊格式解析 | 舊版與新版 Excel 會先轉換為統一資料模型，再套用同一套規則。 |
| 點收判定 | 缺料、額外 PN、尚未完成、數量差異與實點差異分開判定。 |
| 重複匯入防止 | 系統以檔案內容雜湊辨識相同檔案，避免重複建立匯入紀錄或重複計算。 |
| 檔案拒收與追溯 | 損壞或格式不符的檔案保留在 `rejected/`，並留下可追溯的 CloudWatch 結構化日誌。 |
| 看板資訊分層 | PN 覆蓋率、點收結果與資料品質刻意分開呈現，避免進度掩蓋異常。 |
| 受控來源檔開啟 | API 不公開來源檔內部位置；需要查看時才核發短效連結。 |

## 架構

`Synthetic XLSX → Private S3 → Processor Lambda → DynamoDB → HTTP API → CloudFront Dashboard`

AWS SAM 範本會建立私有來源與前端 S3、CloudFront、兩張 DynamoDB 資料表、Processor 與 API Lambda、HTTP API、IAM 權限與 CloudWatch Log Group。

## 專案結構

```text
aws-material-receipt-dashboard/
├─ apps/dashboard/              看板前端、API 路由、Lambda Handler、規則與測試
│  ├─ app/                      Next.js 頁面與 API 路由
│  ├─ aws/                      Processor、API 與 DynamoDB Adapter
│  ├─ lib/                      Excel 解析、規則判定與匯入服務
│  ├─ static/                   靜態看板建置入口
│  └─ tests/                    31 項自動測試
├─ infrastructure/aws/          AWS SAM / CloudFormation 範本與部署設定範例
├─ synthetic-data/              合成 XLSX 範例與格式規格
│  └─ demo-incoming/            可直接上傳驗證的示範檔案
├─ docs/                        架構、部署、驗證與公開簡報
│  ├─ architecture/             資料模型、UI、受控開檔與 AWS 設計文件
│  ├─ deployment/               設定、部署、驗證、資源盤點與清理流程
│  └─ presentation/             移除識別資訊後的公開專案簡報
└─ scripts/                     本機驗證與前端發布腳本
```

建議先閱讀[文件索引](docs/README.zh-TW.md)，也可直接查看[公開專案簡報](docs/presentation/AWS_Material_Receipt_Dashboard_Public_zh-TW.pptx)；英文讀者請見 [Documentation index](docs/README.md)。

## 本機驗證

```powershell
cd apps/dashboard
pnpm install --frozen-lockfile
pnpm test
pnpm run build:static
```

如需驗證完整 SAM 範本，請由專案根目錄執行：

```powershell
.\scripts\Build-AwsPrototype.ps1
```

## 部署與驗證

請依序閱讀：

1. [設定說明](docs/deployment/configuration.md)
2. [部署流程](docs/deployment/deploy.md)
3. [驗證清單](docs/deployment/verification.md)
4. [AWS 資源盤點](docs/deployment/aws-resource-inventory.md)
5. [清理流程](docs/deployment/teardown.md)

## 安全與限制

- 請勿將 `.env`、AWS credentials、公司來源檔、真實工單或正式環境網址提交到 Git。
- 範本預設為訓練用 Demo 環境；CORS 與未登入設計不可直接沿用到正式系統。
- 不建議長期公開可寫入的 Demo API；需要 Live Demo 時，應另行補上身分驗證、來源限制、限流與費用防護。

## 授權

本專案採用 [MIT License](LICENSE)。
