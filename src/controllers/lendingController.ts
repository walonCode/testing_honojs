import type { Context } from "hono";
import Lending from "../models/lendingModel.js";
import Book from "../models/bookModel.js";
import Library from "../models/libraryModel.js"
import { lendingSchema } from "../validators/lendingSchema.js";
import { sanitizedObject } from "../utils/sanitizeHtml.js";



// ✅ Create a lending record
export async function createLending(c: Context) {
  try {
    const body = await c.req.json();
    const result = lendingSchema.safeParse(body);
    if (!result.success) {
      return c.json({ ok: false, message: "Invalid data sent" }, 400);
    }

    const { bookId, userId, username, timeBorrowed, timeReturned } = sanitizedObject(result.data);

    const book = await Book.findById(bookId);
    if (!book || !book.isAvailable) {
      return c.json({ ok: false, message: "Book not found or not available" }, 404);
    }

    const library = await Library.findById(book.libraryId);
    if (!library) {
      return c.json({ ok: false, message: "Library not found" }, 404);
    }

    // Patch book availability by calling existing API
    await fetch(`${process.env.SERVER_URL}/api/books/update/${bookId}`, {
      method: "PATCH"
    });

    // Create lending entry
    const lending = new Lending({
      bookName: book.name,
      libraryName: library.name,
      userId,
      username,
      timeBorrowed: new Date(timeBorrowed),
      timeReturned: new Date(timeReturned),
      isReturned: false
    });

    await lending.save();

    return c.json({ ok: true, message: "Book lent successfully", data: lending }, 201);
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}

// ✅ Get all lending records
export async function getAllLendings(c: Context) {
  try {
    const records = await Lending.find();
    return c.json({ ok: true, message: "All lendings", data: records }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}

// ✅ Mark book as returned
export async function returnBook(c: Context) {
  try {
    const id = c.req.param("id");
    const lending = await Lending.findById(id);
    if (!lending || lending.isReturned) {
      return c.json({ ok: false, message: "Lending record not found or already returned" }, 404);
    }

    // Update book as available
    const book = await Book.findOneAndUpdate({ name: lending.bookName }, { isAvailable: true });
    const library = await Library.findOneAndUpdate({ name: lending.libraryName }, {
      $inc: { availableBooks: 1, borrowedBooks: -1 }
    });

    lending.isReturned = true;
    await Promise.all([
      lending.save(),
      book?.save(),
      library?.save()
    ]);

    return c.json({ ok: true, message: "Book returned successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}
