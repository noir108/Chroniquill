Rails.application.routes.draw do
  devise_for :users
  resources :schedules, only: [:index]
end
