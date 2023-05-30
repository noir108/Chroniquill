if (window.location.pathname === '/schedules' || window.location.pathname === '/') {

  document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.querySelector('.calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // ローディング画面の表示
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');

    // カレンダーの初期表示
    const currentDate = new Date();
    showCalendar();

    // 前月ボタンクリック時の処理
    prevBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      showCalendar();
    });

    // 次月ボタンクリック時の処理
    nextBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      showCalendar();
    });

    // カレンダーを表示する関数
    function showCalendar() {
      calendarBody.innerHTML = '';
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      // 月と年を表示
      monthYear.textContent = `${year}年 ${month + 1}月`;

      // プルダウンメニューを生成して年月の選択を可能にする
      createMonthSelect();

      // 1日の曜日を取得
      const firstDay = new Date(year, month, 1).getDay();

      // 月の最終日を取得
      const lastDate = new Date(year, month + 1, 0).getDate();

      // Ajaxでデータを取得して予定を表示
      $.ajax({
        url: '/schedules', // データを取得するURL
        type: 'GET',
        dataType: 'json',
        success: function (response) {
          // レスポンスを処理するコード
          const events = {};
          for (let i = 0; i < response.length; i++) {
            const schedule = response[i];
            const startDateTime = new Date(schedule.start_time);
            const scheduleYear = startDateTime.getFullYear();
            const scheduleMonth = startDateTime.getMonth() + 1;
            const scheduleDay = startDateTime.getDate();
            const scheduleKey = `${scheduleYear}-${String(scheduleMonth).padStart(2, '0')}-${String(scheduleDay).padStart(2, '0')}`;
            if (events[scheduleKey]) {
              events[scheduleKey].push([schedule.id, schedule.title]); // 同じ日付の予定が既に存在する場合は配列に追加
            } else {
              events[scheduleKey] = [[schedule.id, schedule.title]]; // 新しい日付の予定として配列を作成
            }
          }

          // 前月と後月の日付を表示
          for (let i = 0; i < firstDay; i++) {
            const emptyDate = document.createElement('div');
            emptyDate.classList.add('date', 'prev-month');
            const prevMonthDate = new Date(year, month, -i).getDate();
            emptyDate.textContent = prevMonthDate;
            calendarBody.appendChild(emptyDate);
          }
          // 日付を表示
          for (let i = 1; i <= lastDate; i++) {
            const date = document.createElement('div');
            date.classList.add('date');
            date.textContent = i;
            calendarBody.appendChild(date);

            //日付をキーに配列の値を取得[0]がid、[1]が予定名
            const event = events[`${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`];

            // 値がある日付に予定名をリストで表示
            if (event) {
              const eventName = document.createElement('div');
              eventName.classList.add('event-name');    // クラス名を追加
              date.appendChild(eventName);
              const eventList = document.createElement('ul');
              eventList.classList.add('event-ul');      // クラス名を追加
              for (let j = 0; j < event.length; j++) {
                const eventItem = document.createElement('li');
                eventItem.classList.add('event-list');  // クラス名を追加
                eventItem.textContent = event[j][1];
                eventList.appendChild(eventItem);

                // 予定名の要素にクリックイベントリスナーを追加
                eventItem.addEventListener('click', () => {
                  const scheduleId = event[j][0];
                  const editUrl = `/schedules/${scheduleId}/edit`;
                  window.location.href = editUrl; // ブラウザを編集画面へのURLにリダイレクト
                });
              }
              eventName.appendChild(eventList);
            }

            // 今日の日付に色を付ける
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
              date.classList.add('today');
            }
          }
        },
        error: function (xhr, status, error) {
          // エラーハンドリングのコード
          console.error(error); // エラーメッセージをコンソールに出力する例
        }
      });
    }

    function createMonthSelect() {
      const selectContainer = document.querySelector('.select-month');
      // 年と月の選択肢を生成する
      const currentYear = currentDate.getFullYear();
      const yearsToShow = 2; // 表示する過去の年数
      const startYear = currentYear - yearsToShow;
      const endYear = currentYear + 1;
      const currentMonth = currentDate.getMonth() + 1;
      const selectYearMonth = document.createElement('select');
      selectYearMonth.addEventListener('change', handleMonthSelectChange);

      for (let year = startYear; year <= endYear; year++) {
        for (let month = 1; month <= 12; month++) {
          const option = document.createElement('option');
          option.value = `${year}-${month}`;
          option.textContent = `${year}.${String(month).padStart(2, '0')}`;
          if (year === currentYear && month === currentMonth) {
            option.selected = true;
          }
          selectYearMonth.appendChild(option);
        }
      }

      // プルダウンメニューを追加する
      selectContainer.innerHTML = '';
      selectContainer.appendChild(selectYearMonth);
    }

    function handleMonthSelectChange() {
      const selectYearMonth = document.querySelector('.select-month select');
      const selectedYearMonth = selectYearMonth.value.split('-');
      const selectedYear = parseInt(selectedYearMonth[0], 10);
      const selectedMonth = parseInt(selectedYearMonth[1], 10);

      currentDate.setFullYear(selectedYear);
      currentDate.setMonth(selectedMonth - 1);
      showCalendar();
    }
  });
}