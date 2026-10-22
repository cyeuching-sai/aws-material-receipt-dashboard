# 文件索引

本專案的文件依「先理解設計，再執行部署與驗證」的順序整理。

## 1. 架構與設計

- [AWS 服務選型](architecture/AWS_Service_Selection_V1.md)：各 AWS 元件的責任與選用原因。
- [統一資料模型](architecture/Canonical_Data_Model_V1.md)：新舊 Excel 轉換後使用的資料欄位。
- [合成檔案規格](architecture/Synthetic_Demo_File_Spec_V1.md)：Demo XLSX 的欄位與測試情境。
- [來源文件受控開啟設計](architecture/Source_Document_Access_Design_V1.md)：短效連結與來源檔保護方式。
- [看板介面設計需求](architecture/Dashboard_UI_Design_Requirements_V1.md)：看板資訊分層與操作原則。

## 2. 部署、驗證與清理

- [設定說明](deployment/configuration.md)：環境變數與部署前設定。
- [部署流程](deployment/deploy.md)：以 AWS SAM 部署的步驟。
- [驗證清單](deployment/verification.md)：本機與 AWS 驗證項目。
- [AWS 資源盤點](deployment/aws-resource-inventory.md)：範本建立的資源與用途。
- [清理流程](deployment/teardown.md)：Demo 結束後的資源清理方式。
