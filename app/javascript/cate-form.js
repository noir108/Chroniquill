document.addEventListener('DOMContentLoaded', () => {
  // 編集リンクをクリックした時の処理
  document.addEventListener('click', (e) => {
    if (e.target.matches('.edit-link')) {
      e.preventDefault();
      const categoryId = e.target.dataset.categoryId;
      const categoryName = e.target.closest('span').querySelector('.category-name').textContent;
      document.querySelector('.category-form').action = '/categories/' + categoryId;
      document.querySelector('.category-form input[name="category[name]"]').value = categoryName;
      document.querySelector('.submit-btn').value = '更新';
    }
  });

  // 削除リンクをクリックした時の処理
  document.addEventListener('click', (e) => {
    if (e.target.matches('.delete-link')) {
      e.preventDefault();
      if (confirm('本当に削除しますか？')) {
        const deleteUrl = e.target.href;
        fetch(deleteUrl, {
          method: 'DELETE'
        })
          .then(response => {
            if (response.ok) {
              // 削除成功時の処理
              // 削除したカテゴリーを一覧から削除する
              e.target.closest('br').remove();
            } else {
              // エラー処理
              throw new Error('削除に失敗しました。');
            }
          })
          .catch(error => {
            // エラー処理
            alert(error.message);
          });
      }
    }
  });

  // カテゴリーフォームの送信処理
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const url = form.action;
    const method = form.method;
    const data = new FormData(form);

    fetch(url, {
      method: method,
      body: data
    })
      .then(response => response.json())
      .then(response => {
        // 保存成功時の処理
        // 必要な処理を追加してください

        // カテゴリー一覧を再読み込み
        const categoryList = document.querySelector('.category-list');
        categoryList.innerHTML = ''; // 既存の要素をクリア
        categoryList.load('/categories .category-list > *');
      })
      .catch(error => {
        // エラー処理
        alert('保存に失敗しました。');
      });
  });
});
