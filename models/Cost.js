const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    netCost: { type: Number, required: true },
    grossCost: { type: Number, required: true }
});

const CostModel =  mongoose.model("Cost", costSchema);
module.exports = CostModel;