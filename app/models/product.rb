class Product < ApplicationRecord
  belongs_to :seller

  def self.listed
    select('products.id AS product_id, products.name AS product_name, price, description, category, s.id AS seller_id, s.name AS seller_name, s.email').joins('INNER JOIN sellers AS s ON s.id = products.seller_id').order('seller_name, category')
  end

  def self.category_listed
    select('products.id AS product_id, products.name AS product_name, price, description, category, s.id AS seller_id, s.name AS seller_name, s.email').joins('INNER JOIN sellers AS s ON s.id = products.seller_id').order('category, price DESC')
  end

  def self.products_of_interest(categories, buyer_id)
    select('products.id AS product_id, products.name AS product_name, price, description, category, s.name AS seller_name, email, b.name AS buyer_name, max_price')
    .joins("INNER JOIN sellers AS s ON s.id = products.seller_id AND category = ANY('{#{categories.join(', ')}}')
    INNER JOIN buyers AS b ON b.seller_id = products.seller_id")
    .where("products.price < b.max_price AND b.id = #{buyer_id}")
    # "#{categories}"
  end

end


    # select('price, sq_ft, city, buyers.id, buyers.first_name, cities, max_price, a.first_name as agent_first_name')
    # .joins("INNER JOIN agents AS a ON a.id = buyers.agent_id
    # INNER JOIN properties AS p ON p.agent_id = a.id AND p.price < buyers.max_price
    # INNER JOIN addresses AS ad ON ad.property_id = p.id AND city = ANY('{#{cities.join(', ')}}')")
    # .where("buyers.id = #{id} and sold <> true")
