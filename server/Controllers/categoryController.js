import CATEGORY from "../Models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await CATEGORY.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new CATEGORY({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await CATEGORY.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const removed = await CATEGORY.findByIdAndRemove(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

export const listCategory = async (req, res) => {
  try {
    const all = await CATEGORY.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

export const readCategory = async (req, res) => {
  try {
    const category = await CATEGORY.findById(req.params.id);
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};
