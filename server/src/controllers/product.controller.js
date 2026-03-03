const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.list = async (req, res, next) => {
  try {
    const { q, featured, inStock, limit = 50 } = req.query;

    const filter = {};
    if (featured === "true") filter.featured = true;
    if (inStock === "true") filter.inStock = true;

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { notes: { $elemMatch: { $regex: q, $options: "i" } } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(products);
  } catch (e) {
    next(e);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || price === undefined)
      return res.status(400).json({ message: "name and price required" });

    let imageUrl = "";
    let imagePublicId = "";

    if (req.body.imageBase64) {
      const upload = await cloudinary.uploader.upload(req.body.imageBase64, {
        folder: "candle-products",
      });
      imageUrl = upload.secure_url;
      imagePublicId = upload.public_id;
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description || "",
      notes: Array.isArray(req.body.notes) ? req.body.notes : [],
      size: req.body.size || "",
      burnTime: req.body.burnTime || "",
      featured: !!req.body.featured,
      inStock: req.body.inStock !== undefined ? !!req.body.inStock : true,
      imageUrl,
      imagePublicId,
    });

    res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });

    if (req.body.imageBase64) {
      if (p.imagePublicId) {
        await cloudinary.uploader.destroy(p.imagePublicId);
      }
      const upload = await cloudinary.uploader.upload(req.body.imageBase64, {
        folder: "candle-products",
      });
      p.imageUrl = upload.secure_url;
      p.imagePublicId = upload.public_id;
    }

    const fields = [
      "name",
      "price",
      "description",
      "notes",
      "size",
      "burnTime",
      "featured",
      "inStock",
    ];

    for (const key of fields) {
      if (req.body[key] !== undefined) {
        if (key === "notes") p.notes = Array.isArray(req.body.notes) ? req.body.notes : [];
        else p[key] = req.body[key];
      }
    }

    await p.save();
    res.json(p);
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });

    if (p.imagePublicId) {
      await cloudinary.uploader.destroy(p.imagePublicId);
    }

    await p.deleteOne();
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};