class Api::ProductsController < ApplicationController

  def index
    render json: Product.listed
  end

  def catindex
    render json: Product.category_listed
  end

end
