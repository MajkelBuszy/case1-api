const CostModel = require('../models/Cost');

const queryCostStatement = async () => {
    let statement;

    try {
        statement = await CostModel.aggregate([
            {
                $group : {
                    _id : {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    sumGross: { $sum: '$grossCost' },
                    sumNet: { $sum: '$netCost' },
                    avgGross: { $avg: '$grossCost' },
                    costCount: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': 1 } }
        ]);
    } catch(error) {
        return error;
    }
    
    return statement;
}

const queryCostByMonth = async (month) => {
    const costMonth = month;
    let cost;

    try {
        cost = await CostModel.aggregate([
            { $eq: [ {$month: '$createdAt'}, costMonth] }
        ]);
    } catch(error) {
        return error;
    }

    return cost;
}

const queryCreateCost = async (body) => {
    const { name, netCost, grossCost } = body;
    let cost;

    try {
        cost = await CostModel.create({
            name: name,
            netCost: netCost,
            grossCost: grossCost
        });
    } catch(error) {
        return error;
    }
    return cost;
}

const queryUpdateCost = async (body, id) => {
    const { name, netCost, grossCost } = body;
    const costId = id;
    let cost;

    try {
        cost = await CostModel.findById(costId);
        cost.name = name;
        cost.netCost = netCost;
        cost.grossCost = grossCost;
        cost.save();
    } catch(error) {
        return error;
    }

    return cost;
}

const queryDeleteCost = async (id) => {
    let cost;

    try {
        cost = await CostModel.findByIdAndDelete(id);
    } catch(error) {
        return error;
    }

    return cost;
}

exports.queryCostStatement = queryCostStatement;
exports.queryCostByMonth = queryCostByMonth;
exports.queryCreateCost = queryCreateCost;
exports.queryUpdateCost = queryUpdateCost;
exports.queryDeleteCost = queryDeleteCost;