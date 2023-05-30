class Category < ApplicationRecord

  validates :name, presence: true

  belongs_to :user
  has_many :schedules
end
