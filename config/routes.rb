Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get 'products', to: 'products#index'
    get 'categories', to: 'products#catindex'
    get 'sellers/:seller_id/buyers/:buyer_id', to: 'products#select'
    get 'sellers', to: 'sellers#index'
    get 'sellers/:id', to: 'sellers#show'
    get 'buyers', to: 'buyers#index'
  end

end
