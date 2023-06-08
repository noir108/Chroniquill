FactoryBot.define do
  factory :schedule do
    title { "予定名" }
    start_time { Faker::Time.between(from: 1.year.ago, to: Date.today) }
    end_time { Faker::Time.between_dates(from: Date.today, to: 1.year.from_now) }
    description { "備考欄" }
    association :user
    association :category
  end
end
