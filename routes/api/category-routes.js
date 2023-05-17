const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryByID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryByID) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoryByID);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const categoryByID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryByID) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
