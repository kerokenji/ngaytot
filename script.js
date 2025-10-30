let dotTimer = null;

function startDots() {
  const d = document.getElementById('dots');
  let n = 1;
  d.textContent = '.';
  dotTimer = setInterval(() => {
    n = (n % 3) + 1;
    d.textContent = '.'.repeat(n);
  }, 420);
}

function stopDots() {
  clearInterval(dotTimer);
  document.getElementById('dots').textContent = '';
}

function isValidDateInputs(day, month) {
  if (!Number.isFinite(day) || !Number.isFinite(month)) return false;
  if (month < 1 || month > 12) return false;
  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

function tinhO() {
  const dayEl = document.getElementById('day');
  const monthEl = document.getElementById('month');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const placeholder = document.getElementById('imagePlaceholder');

  const day = parseInt(dayEl.value, 10);
  const month = parseInt(monthEl.value, 10);

  result.style.opacity = 0;
  result.textContent = '';
  placeholder.style.display = 'none';
  placeholder.style.opacity = 0;

  if (!isValidDateInputs(day, month)) {
    result.style.opacity = 1;
    result.style.color = '#8b0000';
    result.textContent = 'Ngày tháng không hợp lệ!';
    return;
  }

  loading.style.display = 'block';
  startDots();

  setTimeout(() => {
    stopDots();
    loading.style.display = 'none';

    // ======= Bắt đầu phần thuật toán =======
    const weights = [1, 2, 1, 2, 1, 2, 1, 2];

    // Tính theo tháng
    let total = 0, idx = 0;
    while (true) {
      total += weights[idx];
      if (total >= month) break;
      idx = (idx + 1) % 8;
    }

    // Tính theo ngày
    const finalIndex = (idx + (day - 1)) % 8;
    const cell = finalIndex + 1;

    // ======= Phần giờ =======
    const gio = [
      { ten: "Tý", khung: "23h–1h" },
      { ten: "Sửu", khung: "1h–3h" },
      { ten: "Dần", khung: "3h–5h" },
      { ten: "Mão", khung: "5h–7h" },
      { ten: "Thìn", khung: "7h–9h" },
      { ten: "Tỵ", khung: "9h–11h" },
      { ten: "Ngọ", khung: "11h–13h" },
      { ten: "Mùi", khung: "13h–15h" },
      { ten: "Thân", khung: "15h–17h" },
      { ten: "Dậu", khung: "17h–19h" },
      { ten: "Tuất", khung: "19h–21h" },
      { ten: "Hợi", khung: "21h–23h" }
    ];

    let goodHours = [];
    let badHours = [];

    for (let i = 0; i < gio.length; i++) {
      const o = ((finalIndex + i) % 8) + 1; // Ô hiện tại
      const target = gio[i];
      if (o === 1 || o === 4 || o === 7) {
        goodHours.push(`${target.ten} (${target.khung})`);
      } else {
        badHours.push(`${target.ten} (${target.khung})`);
      }
    }

    // ======= Hiển thị kết quả =======
    const goodText = goodHours.join(', ');
    const badText = badHours.join(', ');

    result.style.color = '#3b2f2f';
    result.innerHTML = `
      <div style="font-weight:700;color:#3b2f2f;">Giờ tốt:</div>
      <div style="color:#065f46;margin-bottom:6px;">${goodText}</div>
      <div style="font-weight:700;color:#3b2f2f;">Giờ xấu:</div>
      <div style="color:#7b1a1a;">${badText}</div>
    `;
    result.style.textAlign = 'left';
    result.style.opacity = 1;

    // Hiệu ứng hiện hình minh họa như cũ
    setTimeout(() => {
      placeholder.style.display = 'block';
      requestAnimationFrame(() => { placeholder.style.opacity = 1; });
    }, 400);
  }, 900);
}
