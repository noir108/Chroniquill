class Schedule < ApplicationRecord

  with_options presence: true do
    validates :title, :start_time
  end
  validate :start_time_before_end_time,:end_time_after_start_time

  def start_time_before_end_time  #start_timeがend_timeより後の日付だとバツ
    if start_time && end_time && start_time > end_time
      errors.add(:start_time, "must be before end time")
    end
  end

  def end_time_after_start_time   #end_timeがstart_timeより前の日付だとバツ
    if start_time && end_time && end_time < start_time
      errors.add(:end_time, "must be after start time")
    end
  end

  belongs_to :user
end
