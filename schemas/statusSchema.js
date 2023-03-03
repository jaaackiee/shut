const { Schema, model } = require("mongoose");

const statusSchema = Schema({
    _id: String,
    type: String,
    status: String
});

module.exports = model("status", statusSchema);