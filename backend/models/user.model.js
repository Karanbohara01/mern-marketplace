import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/magesDB");

const mageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  power_type: {
    type: String,
    require: true,
  },
  mana_power: Number,
  health: Number,
  gold: Number,
});

const Mage = new mongoose.model("Mage", mageSchema);
