class Api::BuyersController < ApplicationController

  def index
    render json: Buyer.unique
  end
end
