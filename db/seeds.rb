# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

u1 = User.create(email:"test@test.com", password: 123456)

10.times do
  User.create(
    email:Faker::Internet.unique.email, 
    password: Faker::Internet.password(min_length: 6),
  )
end

categories = [
  'Jewelry',
  'Home Goods',
  'Health & Beauty',
  'Tools',
]

10.times do
  s = Seller.create(
    name: Faker::FunnyName.name,
    email: Faker::Internet.email,
  )

  5.times do
    num_categories = rand(0..categories.length - 1);
    Buyer.create(
      name: Faker::FunnyName.name,
      max_price: rand(50..1500),
      desired_categories: categories.sample(num_categories),
      seller_id: s.id
    )
  end
  
  5.times do
    price = rand(10..1500)
    p = Product.create(
      name: Faker::Commerce.product_name,
      price: price,
      description: Faker::Hacker.say_something_smart,
      category: categories.sample(),
      seller_id: s.id
  )
  end
end