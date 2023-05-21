class Schedule < ApplicationRecord

  with_options presence: true do
    validates :title, :start_time
  end

  belongs_to :user
end
