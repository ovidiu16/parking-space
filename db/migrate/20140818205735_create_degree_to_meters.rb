class CreateDegreeToMeters < ActiveRecord::Migration
  def change
    create_table :degree_to_meters do |t|
      t.decimal :degrees
      t.decimal :latitude_in_m
      t.decimal :longitude_in_m

      t.timestamps
    end
  end
end
