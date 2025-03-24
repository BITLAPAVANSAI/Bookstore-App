import { book } from "../model/bookModel.js";
import express from "express";
const router = express.Router();

// router.get("/", (req, res) => {
//     res
//       .status(200)
//       .send("<h1 style='color:red; font-family:cursive'>This is homepage</h1>");
//   });

////////////// get all books  from dataBase/////////

router.get("/", async (req, res) => {
  try {
    const books = await book.find({});

    if (books.length == 0) {
      return res.status(201).send({ message: "Books are not availables" });
    }
    // console.log(books.length);
    res.status(201).json({
      Available: books.length,
      Books: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

///////////Route for get  ONEBOOK  from database///////////////

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await book.findById(id);

    console.log(books);
    return res.status(200).json({
      Books: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//////// Route for save a new book//////////////

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all requuired fields:title,auther,publishyear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const createdBook = await book.create(newBook);

    return res.status(201).send(createdBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

/////// Rout for updating a Book////////////

router.put("/:id", async (req, res) => {
  const { title, auther, publishYear } = req.body;

  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all requuired fields:title,auther,publishyear",
      });
    }

    const { id } = req.params;
    const result = await book.findByIdAndUpdate(
      id,
      { title, auther, publishYear },
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    } else {
      res.status(200).send({ message: "Book updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

/////////////Route for deleting a book//////////

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    } else {
      res.status(200).send({ message: "Book deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
