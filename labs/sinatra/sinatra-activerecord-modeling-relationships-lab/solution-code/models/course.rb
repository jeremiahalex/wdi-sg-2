class Course < ActiveRecord::Base
  has_many :recipes
  has_many :ingredients, through: :recipes
end
