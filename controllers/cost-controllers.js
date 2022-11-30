const { 
    queryCostStatement,
    queryCostByMonth,
    queryCreateCost,
    queryUpdateCost,
    queryDeleteCost
} = require('../service/cost-service');

const getCostStatement = async (req, res) => {
    const statement = await queryCostStatement();

    if (statement.errors) {
        return res.status(500).json(statement._message);
    }

    res.status(200).json(statement);
}

const getCostByMonth = (req, res) => {
    const month = req.params.month;
    const getCostByMonth = queryCostByMonth(month);

    if (getCostByMonth.errors) {
        return res.status(500).json(getCostByMonth._message);
    }

    res.json(getCostByMonth);
}

const createCost = async (req, res) => {
    const costData = req.body;
    const createCost = await queryCreateCost(costData);

    if (createCost.errors) {
        return res.status(500).json(createCost._message);
    }

    res.json(createCost);
}

const updateCost = async (req, res) => {
    const costData = req.body;
    const costId = req.params.cid;
    const updateCost = await queryUpdateCost(costData, costId);

    if (updateCost.errors) {
        return res.status(500).json(updateCost._message);
    }

    res.json(updateCost);
}

const deleteCost = (req, res) => {
    const costId = req.params.cid;
    const deleteCost = queryDeleteCost(costId);

    if (deleteCost.errors) {
        return res.status(500).json(deleteCost._message);
    }
    
    res.json({ message: 'Cost deleted.' });
}

exports.getCostStatement = getCostStatement;
exports.getCostByMonth = getCostByMonth;
exports.createCost = createCost;
exports.updateCost = updateCost;
exports.deleteCost = deleteCost;