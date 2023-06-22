## アプリケーション名	
### chroniquill（クロニクイル）
  "Chronicle"（年代記）と"Quill"（羽根ペン）との要素を結びつけた名前です。

## アプリケーション概要	このアプリケーションでできることを記載。
  スケジュール管理ができるアプリです。
  主な機能は、予定登録機能、カテゴリー機能です。
  トップページにアクセスすると、一月分のカレンダーと登録した予定が表示され、予定名をクリックすると、編集画面へと遷移します。
  また、登録をする際はカテゴリーも一緒に登録し、トップ画面にてカテゴリー名と同じタブをクリックするとフィルターをかけることができます。

## URL

  https://chroniquill.onrender.com

## テスト用アカウント
  mail：test@test
  PASS：1234qwe

## 利用方法
  トップ画面の「list」をクリックすると登録した予定の一覧とカテゴリーの登録、一覧画面に遷移します。
  先にカテゴリーをいくつか登録してから予定を登録します。
  トップ画面の「write」をクリックすると予定登録画面に遷移します。
  予定名、予定日時、カテゴリー選択は必須項目なので必要な情報を記入して登録するとカレンダーに反映されます。

## アプリケーションを作成した背景
  スケジュール管理アプリは世の中に沢山あり、タグづけや色分けなどができます。
  しかし、そのタグやカテゴリー分けした予定ごとに表示したいと思い、作成するきっかけになりました。

## 洗い出した要件	要件定義をまとめたスプレッドシートのリンクを記載。
  https://docs.google.com/spreadsheets/d/17afeKPrkDeU4nwoMYUYbTyQChMNLFlxujYU6Ap9jTvc/edit#gid=1785908763

## データベース設計	ER図を添付。
![ER図](https://github.com/noir108/chroniquill/assets/130912317/5414ac51-dc09-4c7d-aed3-975236b5b29f)

## 画面遷移図	画面遷移図を添付。
![画面遷移図](https://github.com/noir108/chroniquill/assets/130912317/00274697-d7bd-4676-93fa-8bba2d9a6bf6)

## 開発環境	使用した言語・サービスを記載。
  Ruby / Ruby on Rails / JavaScript / MySQL / GitHub / Visual Studio Code

## テーブル構造
<details><summary></summary>

### Usersテーブル

| Column               | Type     | Options                 |
| -------------------- | -------- | ----------------------- |
| name                 | string   | null: false             |
| email                | string   | null: false             |
| password_digest      | string   | null: false             |

#### アソシエーション

- has_many :schedules, dependent: :destroy
- has_many :categories, dependent: :destroy


### Schedulesテーブル

| Column               | Type       | Options                        |
| -------------------- | ---------- | ------------------------------ |
| title                | string     | null: false                    |
| description          | text       | null: true                     |
| start_time           | datetime   | null: false                    |
| end_time             | datetime   | null: true                     |
| user                 | references | null: false, foreign_key: true |
| category             | references | null: true,  foreign_key: true |

#### アソシエーション

- belongs_to :user
- belongs_to :category


### Categoriesテーブル

| Column               | Type        | Options                        |
| -------------------- | ----------- | ------------------------------ |
| name                 | string      | null: false                    |
| user                 | references  | null: false, foreign_key: true |

#### アソシエーション

- belongs_to :user
- has_many :schedules
</details>