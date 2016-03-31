class Genre < ActiveRecord::Base
  has_and_belongs_to_many :albums
  has_many :artists, through: :albums
end