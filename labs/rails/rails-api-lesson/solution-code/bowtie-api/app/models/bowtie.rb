class Bowtie < ActiveRecord::Base
  validates :pattern, presence: true

  def as_json(options={})
    super(except:  [:wholesale_price, :created_at, :updated_at],
          methods: [:description])
  end

  def description
    "This #{pattern} bowtie is made from top quality #{material}."
  end
end
