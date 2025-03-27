const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

async function getAll(req, res, next) {
    try {
        let { category, brand } = req.query;

        let filter = {};

        if (category) {
            filter.category = decodeURIComponent(category);
        } else if (brand) {
            filter.brand = decodeURIComponent(brand);
        }

        const products = await productModel.find(filter).populate("authorId");

        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getOne(req, res, next) {
    try {
        const { productId } = req.params;

        const product = await productModel.findById(productId).populate("authorId", "_id");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {

    const {
        title, imgURL, category, price, brand, description, flavour,
        weight,
        servings,
        ingredients,
        directions,
        warnings
    } = req.body;

    try {
        const newProduct = await productModel.create({
            title, imgURL, category, price, brand, description, flavour,
            weight,
            servings,
            ingredients,
            directions,
            warnings,
            authorId: req.user._id
        });

        await newProduct.save();

        const updatedUser = await userModel.findById(req.user._id);

        if (updatedUser) {
            updatedUser.products.push(newProduct._id);
            await updatedUser.save();

            res.status(201).json(newProduct);
        } else {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }

    } catch (err) {
        console.error('Error creating product:', err);
        next(err);
    }
}

async function update(req, res) {
    const { productId } = req.params;
    const productData = req.body;

    if (!productData.title || !productData.price) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            productData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

async function getMostRated(category) {
    if (!category) {
        throw new Error("Category is required");
    }

    try {
        const products = await productModel
            .find({ category })
            .limit(5);

        if (products.length === 0) {
            throw new Error("No products found for this category");
        }

        return products;
    } catch (error) {
        console.error('Error fetching most rated products:', error);
        throw new Error(`Failed to fetch most rated products: ${error.message}`);
    }
};

const getMyProducts = async (req, res) => {
    const { userId } = req.params;
    try {
        const products = await productModel.find({ authorId: userId });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

const remove = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await productModel.findByIdAndDelete(productId);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


module.exports = {
    getAll,
    getOne,
    getMostRated,
    create,
    update,
    remove,
    getMyProducts
}