class Author < ActiveRecord::Base
  has_many :books
  def full_name
    [firstname, lastname].join(" ")
  end
end
