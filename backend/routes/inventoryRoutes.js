const express = require('express');
const { getInventory, addInventory, updateStock, deleteInventory } = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', getInventory);
router.post('/', addInventory);
router.patch('/:id', updateStock);
router.delete('/:id', deleteInventory);

module.exports = router;

