const Product = require("../models/productModel");

const getAllProducts = async (req, res, next) => {
  try {
    const { company, name, featured, sort, select } = req.query;
    const queryOBjects = {};

    if (company) {
      queryOBjects.company = company;
    }

    if (featured) {
      queryOBjects.featured = featured;
    }

    // Searching Products

    if (name) {
      queryOBjects.name = { $regex: name, $options: "i" };
    }

    let apiProducts = Product.find(queryOBjects);
    if (sort) {
      let sortValue = sort.replace(",", " ");
      apiProducts = apiProducts.sort(sortValue);
    }

    if (select) {
      const selectValue = select.split(",").join(" ");
      apiProducts = apiProducts.select(selectValue);
    }

    // Pagination

    // Formula for Pagination
    //  page = 2
    //  limit = 3
    //  skip = 1 * 3 = 3

    let page = parseInt(req.query.page) || 1;

    let limit = parseInt(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    apiProducts = apiProducts.skip(skip).limit(limit);

    console.log(queryOBjects);

    const MyProducts = await apiProducts;
    res.status(200).json({
      success: true,
      data: MyProducts,
      message: "All Products",
      nhits: MyProducts.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllProductsTesting = async (req, res, next) => {
  try {
    const MyProducts = await Product.find(req.query);
    res.status(200).json({
      success: true,
      data: MyProducts,
      message: "Testing success",
      nhits: MyProducts.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
