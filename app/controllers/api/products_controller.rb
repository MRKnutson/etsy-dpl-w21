class Api::ProductsController < ApplicationController

  def index
    render json: Product.listed
  end

  def catindex
    render json: Product.category_listed
  end

  def select
    @seller = Seller.find(params[:seller_id])
    @buyer = @seller.buyers.find(params[:buyer_id])
    render json: @seller.products.products_of_interest(@buyer.desired_categories, @seller.id)
  end

end
