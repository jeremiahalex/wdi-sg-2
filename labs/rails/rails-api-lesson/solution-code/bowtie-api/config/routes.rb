Rails.application.routes.draw do
  namespace :api do
    resources :bowties, only: [:index, :show, :create, :update, :destroy]
  end
end
