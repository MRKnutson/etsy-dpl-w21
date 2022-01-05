class Product < ApplicationRecord
  belongs_to :seller

  def self.listed
    select('products.id AS product_id, products.name AS product_name, price, description, category, s.id AS seller_id, s.name AS seller_name, s.email').joins('INNER JOIN sellers AS s ON s.id = products.seller_id').order('seller_name, category')
  end

end
