Rails.application.routes.draw do
  root 'movies#index'

  namespace :api do 
    resources :movies
    resources :actors
  end

  resources :movies
  resources :actors
end
