const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    categoryData = await Category.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{
        model: [Product]
      }]
    })
    if (!categoryId) {
      res.status(404).json({ message: "No data on this location" })
      return;
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!categoryId) {
      res.status(400).json( {message: "No data found to update"})
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryId) {
      res.status(400).json({ message: "No data found to delete"})
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
});

module.exports = router;
