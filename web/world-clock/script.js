// Live Clock Updater
function updateClocks() {
  const now = new Date();

  const indiaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  document.getElementById('india-time').textContent = indiaTime.toLocaleTimeString();

  const chinaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
  document.getElementById('china-time').textContent = chinaTime.toLocaleTimeString();

  const japanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  document.getElementById('japan-time').textContent = japanTime.toLocaleTimeString();
}

// Generate the 24x3 time table using UTC as base
function generateTableRows() {
  const tbody = document.getElementById("time-table-body");

  for (let h = 0; h < 24; h++) {
    const utcTime = formatTime(h, 0);
    const indiaTime = shiftTime(h, 5.5);
    const chinaTime = shiftTime(h, 8);
    const japanTime = shiftTime(h, 9);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${utcTime}</td>
      <td>${indiaTime}</td>
      <td>${chinaTime}</td>
      <td>${japanTime}</td>
    `;
    tbody.appendChild(row);
  }
}

// Format time like "01:00"
function formatTime(hour, minute) {
  return hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0');
}

// Shift UTC hour by offset (e.g., +5.5 for IST)
function shiftTime(baseHour, offset) {
  let shifted = (baseHour + offset) % 24;
  if (shifted < 0) shifted += 24;
  let hour = Math.floor(shifted);
  let minute = shifted % 1 === 0.5 ? 30 : 0;
  return formatTime(hour, minute);
}
