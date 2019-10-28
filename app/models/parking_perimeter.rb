class ParkingPerimeter < ActiveRecord::Base
  enum perimeter_type: %i[assigned_space employee_space public_parking_space]

  belongs_to :sensor
  belongs_to :parking_space
  belongs_to :section
  belongs_to :user

end
