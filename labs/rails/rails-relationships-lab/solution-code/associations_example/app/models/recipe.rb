class Recipe < ActiveRecord::Base
  belongs_to :course
  has_and_belongs_to_many :ingredients
end
