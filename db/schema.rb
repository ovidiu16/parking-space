# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140818213127) do

  create_table "messages", force: true do |t|
    t.string   "deviceid"
    t.string   "content"
    t.integer  "proposal_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "parking_spaces", force: true do |t|
    t.decimal  "location_lat"
    t.decimal  "location_long"
    t.decimal  "recorded_from_lat"
    t.decimal  "recorded_from_long"
    t.string   "deviceid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "occupied"
  end

  create_table "proposals", force: true do |t|
    t.string   "deviceid"
    t.string   "title_message"
    t.integer  "parking_space_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "bid_amount"
    t.string   "bid_currency"
    t.boolean  "win_flag"
  end

end
