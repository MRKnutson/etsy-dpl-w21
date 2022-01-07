class Buyer < ApplicationRecord
  belongs_to :seller
  serialize :desired_categories, Array

  def self.unique
    select('DISTINCT name, id')
  end

end
