# Documentation index

[繁體中文](README.zh-TW.md) | **English**

Use this order to understand, reproduce, and safely retire the prototype.

## 1. Understand the design

- [AWS service selection](architecture/AWS_Service_Selection_V1.md) — responsibilities and reasons for each AWS service.
- [Canonical data model](architecture/Canonical_Data_Model_V1.md) — shared fields after legacy and current workbook conversion.
- [Synthetic demo file specification](architecture/Synthetic_Demo_File_Spec_V1.md) — workbook columns and test scenarios.
- [Controlled source-document access](architecture/Source_Document_Access_Design_V1.md) — short-lived links and source protection.
- [Dashboard UI design requirements](architecture/Dashboard_UI_Design_Requirements_V1.md) — information hierarchy and operating principles.

> The detailed design documents above are maintained in Traditional Chinese; the [English project overview](../README.md) provides the implementation context for international readers.

## 2. Deploy, verify, and clean up

- [Configuration](deployment/configuration.md) — required environment values and preparation.
- [Deployment](deployment/deploy.md) — deployment through AWS SAM.
- [Verification checklist](deployment/verification.md) — local and AWS acceptance checks.
- [AWS resource inventory](deployment/aws-resource-inventory.md) — resources provisioned by the template.
- [Teardown](deployment/teardown.md) — remove a demo deployment safely.

## 3. Presentation

- [Public project presentation](presentation/AWS_Material_Receipt_Dashboard_Public_zh-TW.pptx) — a Traditional-Chinese, public-safe project overview. It excludes personal details, account identifiers, credentials, and live endpoint information.
