Rails.application.routes.draw do
  devise_for :users
  root to: 'schedules#index'
  resources :schedules, only: [:index, :new, :create, :edit, :update, :destroy]
end
