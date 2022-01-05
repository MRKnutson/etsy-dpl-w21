class Api::ProductsController < ApplicationController

  def index
    render json: Product.listed
  end

end
