// recent7.js：照 rules.md 寫的版本
// 輸入：records＝一串紀錄，每筆像 { log_date: '2026-11-23', minutes: 30 }（minutes 可能是 null）
//       today＝今天的日期，例如 '2026-11-23'
// 輸出：{ minutes: 總共幾分鐘, count: 幾筆 }
// 格式說明在 README.md；要怎麼算看 rules.md。

function recent7(records, today) {
  if (!Array.isArray(records) || !today) {
    return { minutes: 0, count: 0 };
  }

  // 解析 'YYYY-MM-DD' 為純 UTC 時間戳記，避免本地時區夏令時間或跨日偏差
  function parseUTCDate(dateStr) {
    const parts = dateStr.split('-');
    return Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const todayMs = parseUTCDate(today);
  const startMs = todayMs - 6 * MS_PER_DAY; // 規則 1：包含今天往前算 6 天（共 7 天）

  let totalMinutes = 0;
  let count = 0;

  for (let i = 0; i < records.length; i++) {
    const rec = records[i];
    if (!rec || !rec.log_date) continue;

    // 規則 3 & 補充規則：minutes 為 null、undefined 或缺漏時整筆不算
    if (rec.minutes === null || rec.minutes === undefined) {
      continue;
    }

    // 補充規則：字串轉成數字資料
    const mins = Number(rec.minutes);
    if (Number.isNaN(mins)) {
      continue;
    }

    // 規則 1 & 2：只算 [startMs, todayMs] 範圍內的紀錄，太早或未來都不算
    const logMs = parseUTCDate(rec.log_date);
    if (logMs < startMs || logMs > todayMs) {
      continue;
    }

    // 規則 4 & 5：每筆分開算；minutes 為 0 算進筆數但不加分鐘；保留小數
    totalMinutes += mins;
    count += 1;
  }

  // 避免 JavaScript 浮點數加法微小誤差（例如 0.1 + 0.2）
  totalMinutes = Math.round(totalMinutes * 1e10) / 1e10;

  return { minutes: totalMinutes, count: count };
}

