class CreateActors < ActiveRecord::Migration
  def change
    create_table :actors do |t|
      t.text :name
      t.integer :year_of_birth
      t.text :thumbnail

      t.timestamps
    end
  end
end
