const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData =  await Tag.findAll({
      model: Product,
      through: ProductTag
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err.message)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      model: Product,
      through: ProductTag
    })
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(reg.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!tagId) {
      res.status(400).json({ message: "No data found to update"})
    }
    res.status(200).json(tagId)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = await Tag.destroy( { where : 
      {
        id: req.params.id
      }})
      if (!tagId) {
        res.status(400).json({ message: "No data found to delete"})
      }
      res.status(200).json(tagId)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

module.exports = router;
