Rails.application.routes.draw do
  devise_for :users
  root to: 'schedules#index'
  resources :schedules, only: [:index, :new, :create, :edit, :update, :destroy]
  get '/schedules/index2', to: 'schedules#index2', as: 'index2_schedules'
  resources :categorys, only: [:index, :new, :create, :edit, :update, :destory]
end
