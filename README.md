# AWS Material Receipt Dashboard

[繁體中文](README.zh-TW.md) | **English**

An AWS Serverless prototype for turning material-receipt Excel files into a traceable, reviewable dashboard workflow. A file uploaded to private S3 is parsed and validated by Lambda, evaluated against business rules, saved to DynamoDB, and shown through an HTTP API and CloudFront dashboard.

> **Public-safe repository:** all workbooks and records are synthetic demo data. No company data, personal data, AWS credentials, account identifiers, or live endpoints are included.

![AWS Serverless architecture](docs/assets/aws-serverless-architecture.svg)

## What it demonstrates

| Capability | Design outcome |
| --- | --- |
| Multi-version workbook parsing | Legacy and current Excel layouts are converted into one canonical data model before rules run. |
| Receipt assessment | Shortage, extra PN, pending receipt, quantity difference, and actual-receipt difference are evaluated separately. |
| Duplicate protection | A content hash prevents the same workbook from creating duplicate imports or recalculations. |
| Safe rejection path | Corrupt or invalid files are kept in `rejected/` with structured, traceable CloudWatch records. |
| Clear dashboard signals | PN coverage, receipt status, and data quality are intentionally presented as separate signals. |
| Controlled source access | The API does not expose internal object locations; source files are opened only through short-lived links. |

## Architecture

`Synthetic XLSX → Private S3 → Processor Lambda → DynamoDB → HTTP API → CloudFront Dashboard`

The AWS SAM template provisions private source and frontend buckets, CloudFront, two DynamoDB tables, Processor and API Lambda functions, an HTTP API, IAM permissions, and CloudWatch log groups.

## Project map

```text
aws-material-receipt-dashboard/
├─ apps/dashboard/              Dashboard UI, API routes, Lambda handlers, rules, and tests
│  ├─ app/                      Next.js pages and API routes
│  ├─ aws/                      Processor, API, and DynamoDB adapters
│  ├─ lib/                      Excel parser, rule engine, and ingestion services
│  ├─ static/                   Static-dashboard build entry point
│  └─ tests/                    31 automated tests
├─ infrastructure/aws/          AWS SAM / CloudFormation template and deployment examples
├─ synthetic-data/              Synthetic XLSX examples and their specification
│  └─ demo-incoming/            Demo files ready for upload-based verification
├─ docs/                        Architecture, deployment, verification, and presentation materials
│  ├─ architecture/             Canonical model, UI, access-control, and AWS design notes
│  ├─ deployment/               Configuration, deployment, verification, inventory, and teardown
│  └─ presentation/             Public-safe project presentation
└─ scripts/                     Local validation and frontend publishing scripts
```

Start with the [documentation index](docs/README.md), review the [public project presentation](docs/presentation/AWS_Material_Receipt_Dashboard_Public_zh-TW.pptx), or use the [繁體中文文件索引](docs/README.zh-TW.md).

## Quick start: local verification

```powershell
cd apps/dashboard
pnpm install --frozen-lockfile
pnpm test
pnpm run build:static
```

To validate the full SAM template from the repository root:

```powershell
.\scripts\Build-AwsPrototype.ps1
```

## Deployment guide

Follow these documents in order:

1. [Configuration](docs/deployment/configuration.md)
2. [Deployment](docs/deployment/deploy.md)
3. [Verification](docs/deployment/verification.md)
4. [AWS resource inventory](docs/deployment/aws-resource-inventory.md)
5. [Teardown](docs/deployment/teardown.md)

## Security and scope

- Never commit `.env` files, AWS credentials, company source workbooks, real work orders, or production URLs.
- This template is a training prototype. Its CORS and unauthenticated-demo design must not be reused unchanged in production.
- A public, write-enabled demo API should have authentication, origin restrictions, rate limiting, and cost protections before real use.

## License

Released under the [MIT License](LICENSE).
