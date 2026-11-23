// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  if (!records || !Array.isArray(records)) {
    return { minutes: 0, count: 0 };
  }

  const todayDate = new Date(today);
  // 最近 7 天：包含今天與往前 6 天
  const startDate = new Date(todayDate);
  startDate.setDate(startDate.getDate() - 6);

  let totalMinutes = 0;
  let count = 0;

  for (const record of records) {
    if (!record || !record.log_date) continue;
    const logDate = new Date(record.log_date);

    // 檢查是否在最近 7 天的範圍內
    if (logDate >= startDate && logDate <= todayDate) {
      if (typeof record.minutes === 'number') {
        totalMinutes += record.minutes;
      }
      count++;
    }
  }

  return { minutes: totalMinutes, count: count };
}
