class CreateScotches < ActiveRecord::Migration
  def change
    create_table :scotches do |t|
      t.string :brand
      t.boolean :blended
      t.integer :year
      t.integer :rating
      t.timestamps
    end
  end
end
