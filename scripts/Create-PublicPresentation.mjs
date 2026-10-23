import { createRequire } from 'module';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

const require = createRequire(import.meta.url);
const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();

pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'AWS Material Receipt Dashboard';
pptx.company = 'Open-source project';
pptx.subject = 'Public-safe project overview';
pptx.title = 'AWS Material Receipt Dashboard';
pptx.lang = 'zh-TW';
pptx.theme = {
  headFontFace: 'Cambria',
  bodyFontFace: 'Arial',
  lang: 'zh-TW',
};
pptx.defineLayout({ name: 'WIDE_SAFE', width: 13.333, height: 7.5 });
pptx.layout = 'WIDE_SAFE';

const C = {
  navy: '123047',
  teal: '087E8B',
  mint: 'DDF3F0',
  sky: 'EAF4F8',
  paper: 'F8FBFC',
  ink: '213547',
  muted: '5C7180',
  amber: 'E69A24',
  coral: 'C85A54',
  white: 'FFFFFF',
  line: 'C6D7DF',
};

function rect(slide, x, y, w, h, fill, radius = false, line = fill) {
  slide.addShape(radius ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {
    x, y, w, h,
    rectRadius: radius ? 0.08 : undefined,
    fill: { color: fill },
    line: { color: line, transparency: line === fill ? 100 : 0, width: 0.8 },
  });
}

function text(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, {
    x, y, w, h,
    margin: 0,
    fontFace: options.fontFace ?? 'Arial',
    fontSize: options.fontSize ?? 16,
    color: options.color ?? C.ink,
    bold: options.bold ?? false,
    align: options.align ?? 'left',
    valign: options.valign ?? 'mid',
    breakLine: false,
    fit: 'shrink',
    ...options,
  });
}

function header(slide, section, title, subtitle = '') {
  rect(slide, 0, 0, 13.333, 7.5, C.paper);
  text(slide, section.toUpperCase(), 0.68, 0.46, 2.1, 0.24, { fontSize: 9, color: C.teal, bold: true, charSpacing: 1.2 });
  text(slide, title, 0.68, 0.76, 11.95, 0.55, { fontFace: 'Cambria', fontSize: 30, color: C.navy, bold: true });
  if (subtitle) text(slide, subtitle, 0.68, 1.40, 11.7, 0.34, { fontSize: 13, color: C.muted });
  slide.addShape(pptx.ShapeType.line, { x: 0.68, y: 1.93, w: 11.97, h: 0, line: { color: C.line, width: 1 } });
}

function footer(slide, page) {
  text(slide, 'AWS Material Receipt Dashboard · Public Project Overview', 0.68, 7.10, 8.1, 0.16, { fontSize: 8, color: C.muted });
  text(slide, String(page).padStart(2, '0'), 12.15, 7.08, 0.5, 0.18, { fontSize: 8, color: C.muted, align: 'right' });
}

function card(slide, x, y, w, h, title, body, accent = C.teal) {
  rect(slide, x, y, w, h, C.white, true, C.line);
  rect(slide, x + 0.25, y + 0.28, 0.12, 0.45, accent, true);
  text(slide, title, x + 0.55, y + 0.25, w - 0.78, 0.35, { fontSize: 17, bold: true, color: C.navy });
  text(slide, body, x + 0.27, y + 0.86, w - 0.54, h - 1.08, { fontSize: 12, color: C.muted, valign: 'top', breakLine: false });
}

// 1. Title
{
  const s = pptx.addSlide();
  rect(s, 0, 0, 13.333, 7.5, C.navy);
  rect(s, 0.72, 0.78, 1.80, 0.46, C.teal, true);
  text(s, 'AWS SERVERLESS PROTOTYPE', 0.89, 0.89, 1.48, 0.16, { fontSize: 8.5, color: C.white, bold: true, align: 'center', charSpacing: 0.8 });
  text(s, '物料點收管理看板', 0.72, 1.75, 8.5, 0.70, { fontFace: 'Cambria', fontSize: 39, color: C.white, bold: true });
  text(s, '從 Excel 匯入、規則判定、資料保存到受控查詢的可驗證流程', 0.75, 2.67, 8.2, 0.36, { fontSize: 17, color: 'D8EBF0' });
  text(s, 'Public project overview · 只使用合成 Demo 資料', 0.75, 3.27, 6.6, 0.26, { fontSize: 12, color: 'A9CCD2' });
  const steps = ['上傳', '解析', '判定', '保存', '查詢'];
  steps.forEach((label, i) => {
    const x = 0.75 + i * 1.63;
    rect(s, x, 5.40, 1.35, 0.64, i === 2 ? C.teal : '234962', true);
    text(s, label, x, 5.61, 1.35, 0.18, { fontSize: 12, color: C.white, bold: true, align: 'center' });
    if (i < steps.length - 1) text(s, '›', x + 1.38, 5.53, 0.2, 0.25, { fontSize: 20, color: '8BBCC5', align: 'center' });
  });
  text(s, '公開版已移除：個人資料、AWS 帳號／使用者、憑證與實際端點', 0.75, 6.69, 7.7, 0.22, { fontSize: 10, color: 'A9CCD2' });
}

// 2. Objective
{
  const s = pptx.addSlide();
  header(s, '01 · Objective', '把 Excel 點收資料轉成可追溯的管理資訊', '重點不是把檔案放上雲端，而是讓每一次匯入都有一致判定、可查詢結果與異常紀錄。');
  card(s, 0.68, 2.42, 3.75, 2.55, '統一資料模型', '新舊版 Excel 的工作表與欄位不同，先轉換成同一份資料模型，再套用規則。', C.teal);
  card(s, 4.79, 2.42, 3.75, 2.55, '規則與品質分開', '點收結果處理業務異常；欄位缺失等歷史資料問題則獨立標記，不覆蓋點收結果。', C.amber);
  card(s, 8.90, 2.42, 3.75, 2.55, '可追溯拒收流程', '損壞或不符合規格的檔案不會污染正常工單；系統保留檔案與拒收原因供後續追查。', C.coral);
  text(s, '設計原則：先防呆、再判定；先留紀錄、再讓人處理。', 0.68, 5.64, 11.96, 0.34, { fontSize: 20, color: C.navy, bold: true, align: 'center' });
  footer(s, 2);
}

// 3. Architecture
{
  const s = pptx.addSlide();
  header(s, '02 · Architecture', '事件驅動的 Serverless 資料流程', '所有來源檔皆為合成 XLSX；來源 Bucket 保持私有，前端經 API 讀取資料。');
  const flow = [
    ['Synthetic XLSX', '合成來源檔', C.teal],
    ['Private S3', '私有來源位置', C.navy],
    ['Processor Lambda', '解析・規則・拒收', C.teal],
    ['DynamoDB', '最新狀態・匯入紀錄', C.navy],
    ['HTTP API', '受控查詢', C.teal],
    ['Dashboard', 'CloudFront 看板', C.navy],
  ];
  flow.forEach((item, i) => {
    const x = 0.58 + i * 2.10;
    rect(s, x, 3.00, 1.72, 1.18, C.white, true, C.line);
    rect(s, x, 3.00, 1.72, 0.33, item[2], true);
    text(s, item[0], x + 0.13, 3.54, 1.46, 0.25, { fontSize: 11.5, color: C.navy, bold: true, align: 'center' });
    text(s, item[1], x + 0.11, 3.86, 1.50, 0.16, { fontSize: 8.5, color: C.muted, align: 'center' });
    if (i < flow.length - 1) text(s, '→', x + 1.77, 3.45, 0.27, 0.22, { fontSize: 18, color: C.teal, align: 'center' });
  });
  rect(s, 3.22, 5.13, 6.92, 0.68, C.mint, true);
  text(s, '損壞／格式不符 → rejected/ 保留 + CloudWatch 結構化拒收紀錄', 3.42, 5.36, 6.52, 0.20, { fontSize: 13, color: C.navy, bold: true, align: 'center' });
  footer(s, 3);
}

// 4. Rule engine
{
  const s = pptx.addSlide();
  header(s, '03 · Rule Engine', '同一套規則，優先呈現最需要處理的異常', '判定以統一資料模型為基礎；顯示結果會依風險與處理優先順序決定。');
  const rows = [
    ['1', '缺料', '優先顯示，立即需要處理'],
    ['2', '額外 PN', '舊版資料出現需求外 PN 時，需要複核'],
    ['3', '尚未完成', '需求 PN 尚未全部有點收紀錄'],
    ['4', '數量差異／實點差異', '數量或點收結果與預期不一致'],
    ['5', '已完成', '只有全部符合時才顯示'],
  ];
  rows.forEach((row, i) => {
    const y = 2.32 + i * 0.74;
    rect(s, 1.05, y, 0.46, 0.46, i === 0 ? C.coral : (i === 4 ? C.teal : C.navy), true);
    text(s, row[0], 1.05, y + 0.13, 0.46, 0.15, { fontSize: 11, color: C.white, bold: true, align: 'center' });
    text(s, row[1], 1.82, y + 0.08, 2.25, 0.25, { fontSize: 15, color: C.navy, bold: true });
    text(s, row[2], 4.20, y + 0.09, 7.85, 0.24, { fontSize: 12, color: C.muted });
    if (i < rows.length - 1) s.addShape(pptx.ShapeType.line, { x: 1.82, y: y + 0.60, w: 10.2, h: 0, line: { color: C.line, width: 0.7 } });
  });
  footer(s, 4);
}

// 5. Dashboard
{
  const s = pptx.addSlide();
  header(s, '04 · Dashboard', '避免「完成率 100%」掩蓋實際異常', '看板不把所有問題塞進單一狀態，而是讓管理者同時看到進度、點收結果與資料品質。');
  const blocks = [
    ['PN 覆蓋率', '只比較需求 PN 與已有點收紀錄的 PN。', C.teal, 'Progress'],
    ['點收結果', '缺料、數量差異與實點差異由獨立規則判定。', C.coral, 'Receipt status'],
    ['資料品質', '欄位缺失等歷史資料問題另行標記，不改寫點收結果。', C.amber, 'Data quality'],
  ];
  blocks.forEach((b, i) => {
    const y = 2.30 + i * 1.28;
    rect(s, 1.00, y, 11.30, 0.96, C.white, true, C.line);
    rect(s, 1.00, y, 1.83, 0.96, b[2], true);
    text(s, b[3], 1.18, y + 0.26, 1.45, 0.16, { fontSize: 10, color: C.white, bold: true, align: 'center' });
    text(s, b[0], 3.18, y + 0.18, 2.1, 0.24, { fontSize: 16, color: C.navy, bold: true });
    text(s, b[1], 5.32, y + 0.21, 6.30, 0.25, { fontSize: 12.2, color: C.muted });
  });
  text(s, '管理者可以先篩選需要處理的工單，再開啟對應來源文件追查。', 1.0, 6.26, 11.2, 0.26, { fontSize: 15, color: C.navy, bold: true, align: 'center' });
  footer(s, 5);
}

// 6. Rejection
{
  const s = pptx.addSlide();
  header(s, '05 · Rejection path', '拒收不是刪除：保留失效檔，也保留可追溯證據', '無效數字、缺少工作表／必要欄位、檔名不符或無法讀取的 XLSX，均不會當成正常點收資料。');
  const boxes = [
    ['檔案進入', 'incoming/in-progress', C.navy],
    ['Lambda 檢核', '讀取、解析、驗證格式', C.teal],
    ['拒收與保留', 'rejected/ + error record', C.coral],
    ['追溯查詢', 'CloudWatch structured log', C.amber],
  ];
  boxes.forEach((b, i) => {
    const x = 0.78 + i * 3.12;
    rect(s, x, 3.02, 2.40, 1.40, C.white, true, C.line);
    rect(s, x, 3.02, 2.40, 0.18, b[2]);
    text(s, b[0], x + 0.33, 3.32, 1.82, 0.22, { fontSize: 15, color: C.navy, bold: true, align: 'center' });
    text(s, b[1], x + 0.25, 3.74, 1.97, 0.22, { fontSize: 10.5, color: C.muted, align: 'center' });
    if (i < boxes.length - 1) text(s, '→', x + 2.50, 3.55, 0.45, 0.20, { fontSize: 21, color: C.teal, align: 'center' });
  });
  rect(s, 2.27, 5.42, 8.78, 0.70, 'FCEDEC', true, 'F0C6C3');
  text(s, '拒收檔不會建立或覆蓋正常工單狀態，但可從來源位置、拒收位置與錯誤代碼追查。', 2.50, 5.66, 8.32, 0.20, { fontSize: 12.5, color: '8F312C', bold: true, align: 'center' });
  footer(s, 6);
}

// 7. Data and API
{
  const s = pptx.addSlide();
  header(s, '06 · Data and API', '最新狀態與匯入紀錄分開保存，讓看板與追溯各司其職', '前端只透過 API 取得需要顯示的資料，不直接讀取資料表或來源檔內部位置。');
  card(s, 1.02, 2.45, 4.85, 2.35, 'Work orders', '每張工單只保留最新狀態，供看板快速呈現進度、點收結果與資料品質。', C.teal);
  card(s, 6.46, 2.45, 4.85, 2.35, 'Ingestion records', '保留每次檔案處理結果、處理時間與失敗原因，也支援避免相同內容重複匯入。', C.amber);
  rect(s, 3.15, 5.50, 7.03, 0.61, C.mint, true);
  text(s, 'API 回傳看板需要的資料；來源文件僅透過短效連結受控開啟。', 3.38, 5.71, 6.56, 0.18, { fontSize: 12.2, color: C.navy, bold: true, align: 'center' });
  footer(s, 7);
}

// 8. Verification
{
  const s = pptx.addSlide();
  header(s, '07 · Verification', '先在本機驗證邏輯，再進行 AWS 端到端驗收', '本機測試降低部署後反覆除錯的成本；雲端驗收確認實際元件與資料流程已正確串接。');
  const stats = [
    ['31', '本機自動測試通過', '解析、規則、重複匯入防止、API 資料保護與損壞檔處理'],
    ['1', '端到端流程驗收', '來源檔 → S3 → Lambda → DynamoDB → API → 看板'],
    ['1', '損壞檔拒收實測', '檔案保留在拒收區，並留下可查詢的錯誤紀錄'],
  ];
  stats.forEach((st, i) => {
    const x = 0.76 + i * 4.15;
    rect(s, x, 2.42, 3.72, 3.10, C.white, true, C.line);
    text(s, st[0], x, 2.77, 3.72, 0.75, { fontSize: 43, color: i === 2 ? C.coral : C.teal, bold: true, align: 'center' });
    text(s, st[1], x + 0.28, 3.72, 3.16, 0.25, { fontSize: 16, color: C.navy, bold: true, align: 'center' });
    text(s, st[2], x + 0.35, 4.28, 3.02, 0.68, { fontSize: 10.2, color: C.muted, align: 'center', valign: 'mid' });
  });
  footer(s, 8);
}

// 9. Rebuild and close
{
  const s = pptx.addSlide();
  header(s, '08 · Reproduce', '可以重新建置，也可以安全清理', 'Repository 保留程式碼、SAM 範本、合成資料、測試與部署文件；不保留任何真實營運或雲端帳號資料。');
  const steps = [
    ['01', '取得專案', 'Clone Repository'],
    ['02', '本機驗證', 'pnpm test + static build'],
    ['03', '設定 AWS', '依 configuration 文件填入自己的帳號設定'],
    ['04', '部署與驗收', 'SAM deploy + verification checklist'],
  ];
  steps.forEach((st, i) => {
    const x = 0.76 + i * 3.12;
    rect(s, x, 2.72, 2.55, 2.15, i % 2 === 0 ? C.navy : C.teal, true);
    text(s, st[0], x + 0.25, 3.02, 0.52, 0.20, { fontSize: 12, color: 'BDE8E9', bold: true });
    text(s, st[1], x + 0.25, 3.42, 2.05, 0.26, { fontSize: 16, color: C.white, bold: true });
    text(s, st[2], x + 0.25, 4.03, 2.05, 0.32, { fontSize: 10.5, color: 'D8EBF0', valign: 'top' });
  });
  rect(s, 1.76, 5.70, 9.80, 0.58, C.mint, true);
  text(s, '公開版本僅供學習與展示；正式系統需補上登入、權限、網路與成本治理。', 1.98, 5.90, 9.36, 0.18, { fontSize: 12.3, color: C.navy, bold: true, align: 'center' });
  footer(s, 9);
}

const output = resolve(process.cwd(), 'docs', 'presentation', 'AWS_Material_Receipt_Dashboard_Public_zh-TW.pptx');
mkdirSync(dirname(output), { recursive: true });
await pptx.writeFile({ fileName: output });
console.log(output);
