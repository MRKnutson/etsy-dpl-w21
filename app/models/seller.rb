class Seller < ApplicationRecord
  has_many :buyers
  has_many :products

  def self.unique_seller
    select('DISTINCT name, id, email')
  end

end
