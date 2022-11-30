const CostModel = require('../models/Cost');

const queryCostStatement = async () => {
    let statement;

    try {
        statement = await CostModel.aggregate([
            {
                $group : {
                    _id : {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
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
    let cost;

    try {
        cost = await CostModel.aggregate([
            {
                $project: {
                    name: '$name',
                    month: { $month: '$createdAt' },
                    netCost: '$netCost',
                    grossCost: '$grossCost'
                }
            },
            { $match: { month: Number(month) } }
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
    let cost;

    try {
        cost = await CostModel.findById(id);
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
    try {
        await CostModel.findByIdAndDelete(id);
    } catch(error) {
        return error;
    }

    return;
}

exports.queryCostStatement = queryCostStatement;
exports.queryCostByMonth = queryCostByMonth;
exports.queryCreateCost = queryCreateCost;
exports.queryUpdateCost = queryUpdateCost;
exports.queryDeleteCost = queryDeleteCost;