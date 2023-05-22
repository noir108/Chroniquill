$(document).ready(function () {
  const calendarBody = $('.calendar-body');
  const monthYear = $('#month-year');
  const prevBtn = $('#prev-btn');
  const nextBtn = $('#next-btn');

  // カレンダーの初期表示
  const currentDate = new Date();
  showCalendar();

  // 前月ボタンクリック時の処理
  prevBtn.on('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    showCalendar();
  });

  // 次月ボタンクリック時の処理
  nextBtn.on('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    showCalendar();
  });

  // カレンダーを表示する関数
  function showCalendar() {
    calendarBody.empty();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 月と年を表示
    monthYear.text(`${year}年 ${month + 1}月`);

    // プルダウンメニューを生成して年月の選択を可能にする
    createMonthSelect();

    // 1日の曜日を取得
    const firstDay = new Date(year, month, 1).getDay();

    // 月の最終日を取得
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 日付を表示
    for (let i = 0; i < firstDay; i++) {
      const emptyDate = $('<div></div>').addClass('date');
      calendarBody.append(emptyDate);
    }

    for (let i = 1; i <= lastDate; i++) {
      const date = $('<div></div>').addClass('date').text(i);
      calendarBody.append(date);

      // 今日の日付に色を付ける
      const today = new Date();
      if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
        date.addClass('today');
      }

      // 予定名を表示
      const event = getEventForDate(year, month, i);
      if (event) {
        const eventName = $('<div></div>').addClass('event-name').text(event);
        date.append(eventName);
      }
    }
  }

  function createMonthSelect() {
    const selectContainer = $('.month-select');
    // 年と月の選択肢を生成する
    const currentYear = currentDate.getFullYear();
    const yearsToShow = 2; // 表示する過去の年数
    const startYear = currentYear - yearsToShow;
    const endYear = currentYear + 1;
    const currentMonth = currentDate.getMonth() + 1;
    const selectYearMonth = $('<select></select>').on('change', handleMonthSelectChange);

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        const option = $('<option></option>').val(`${year}-${month}`).text(`${year}.${String(month).padStart(2, '0')}`);
        if (year === currentYear && month === currentMonth) {
          option.attr('selected', true);
        }
        selectYearMonth.append(option);
      }
    }

    // プルダウンメニューを追加する
    selectContainer.empty();
    selectContainer.append(selectYearMonth);
  }
  function handleMonthSelectChange() {
    const selectYearMonth = $('.month-select select');
    const selectedYearMonth = selectYearMonth.val().split('-');
    const selectedYear = parseInt(selectedYearMonth[0], 10);
    const selectedMonth = parseInt(selectedYearMonth[1], 10);

    currentDate.setFullYear(selectedYear);
    currentDate.setMonth(selectedMonth - 1);
    showCalendar();
  }
});

// 予定名を取得する関数（仮の例）
function getEventForDate(year, month, day) {
  // ここで指定した年月日に対応する予定名を返す処理を実装する
  // 仮の例として、特定の日には固定の予定名を返すようにしています
  const events = {
    '2023-05-01': 'ミーティング',
    '2023-05-05': '誕生日',
    '2023-05-15': '打ち合わせ',
  };
  const eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return events[eventKey] || null;
};
