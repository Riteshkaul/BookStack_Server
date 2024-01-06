const express = require("express");
const bookModel = require("../models/bookModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newBook = new bookModel(data);
    await newBook.save().then(() => {
      res.status(200).json({ message: "Book Added Successfully" });
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getbooks", async (req, res) => {
  let allbooks;
  try {
    allbooks = await bookModel.find();
    res.status(200).json({ allbooks });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getbooks/:id", async (req, res) => {
  let id = req.params.id;
  let books;
  try {
    books = await bookModel.findById(id);
    res.status(200).json({ books });
  } catch (error) {
    console.log(error);
  }
});
router.put("/updatebooks/:id", async (req, res) => {
  const id = req.params.id;
  const { bookname, description, author, image, price } = req.body; // Changed 'images' to 'image'

  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      {
        bookname,
        description,
        author,
        image,
        price,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Updated Successfully", updatedBook });
  } catch (error) {
    console.log("Error occurred while updating book:");
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deletebooks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ message: "Book not found or could not be deleted" });
    }

    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/search", async (req, res) => {
  const { name, author } = req.query;
  const query = {};

  if (name) {
    query.bookname = { $regex: new RegExp(name, "i") };
  }

  if (author) {
    query.author = { $regex: new RegExp(author, "i") };
  }

  try {
    const books = await bookModel.find(query);

    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
