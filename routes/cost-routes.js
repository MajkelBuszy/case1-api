const express = require('express');
const router = express.Router();

const costControllers = require('../controllers/cost-controllers');

router.get('/statement', costControllers.getCostStatement)

router.get('/:month', costControllers.getCostByMonth)

router.post('/', costControllers.createCost)

router.patch('/:cid', costControllers.updateCost)

router.delete('/:cid', costControllers.deleteCost)

module.exports = router;