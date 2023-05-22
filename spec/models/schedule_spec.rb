require 'rails_helper'

RSpec.describe Schedule, type: :model do
  before do
    @schedule = FactoryBot.build(:schedule)
  end

  describe 'メッセージ投稿' do
    context '予定が登録できる場合' do
      it 'titleとstart_timeが存在していれば保存できる' do
        expect(@schedule).to be_valid
      end
      it 'end_timeが空でも保存できる' do
        @schedule.end_time = ''
        expect(@schedule).to be_valid
      end
      it 'descriptionが空でも保存できる' do
        @schedule.description = ''
        expect(@schedule).to be_valid
      end
    end

    context '予定が登録できない場合' do
      it 'titleが空では保存できない' do
        @schedule.title = ''
        @schedule.valid?
        expect(@schedule.errors.full_messages).to include("Title can't be blank")
      end
      it 'start_timeが空では保存できない' do
        @schedule.start_time = ''
        @schedule.valid?
        expect(@schedule.errors.full_messages).to include("Start time can't be blank")
      end
      it 'start_timeがend_timeより後の日付だと保存できない' do
        @schedule.start_time = '2023-07-12 22:01:17'
        @schedule.end_time = '2023-06-12 22:01:17'
        @schedule.valid?
        expect(@schedule.errors.full_messages).to include("Start time must be before end time")
      end
      it 'end_timeがstart_timeより前の日付だと保存できない' do
        @schedule.end_time = '2023-06-12 22:01:17'
        @schedule.start_time = '2023-07-12 22:01:17'
        @schedule.valid?
        expect(@schedule.errors.full_messages).to include("End time must be after start time")
      end
      it 'userが紐付いていないと保存できない' do
        @schedule.user = nil
        @schedule.valid?
        expect(@schedule.errors.full_messages).to include('User must exist')
      end
    end
  end
end
