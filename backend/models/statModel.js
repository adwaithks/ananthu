const mongoose = require('mongoose');
const { Schema } = mongoose;

const statSchema = Schema({
    temperature: Number, 
    humidity: Number,
    sag: Number
});

module.exports = new mongoose.model('Stats', statSchema);