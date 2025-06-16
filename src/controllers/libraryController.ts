import type { Context } from "hono";
import Library from "../models/libraryModel.js";
import { librarySchema } from "../validators/librarySchema.js";
import { sanitizedObject } from "../utils/sanitizeHtml.js";



// ✅ Create a new Library
export async function createLibrary(c: Context) {
  try {
    const body = await c.req.json();
    const result = librarySchema.safeParse(body);
    if (!result.success) {
      return c.json({ ok: false, message: "Invalid data sent" }, 400);
    }

    const sanitizedBody = sanitizedObject(result.data);

    const exists = await Library.findOne({ name: sanitizedBody.name });
    if (exists) {
      return c.json({ ok: false, message: "Library already exists" }, 409);
    }

    const library = new Library({
      ...sanitizedBody,
      borrowedBooks: 0,
    });

    await library.save();

    return c.json(
      { ok: true, message: "Library created successfully", data: library },
      201
    );
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}

// ✅ Get all libraries
export async function getAllLibraries(c: Context) {
  try {
    const libraries = await Library.find();
    return c.json(
      {
        ok: true,
        message: "Libraries retrieved",
        data: libraries,
      },
      200
    );
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}

// ✅ Get a single library by ID
export async function getLibraryById(c: Context) {
  try {
    const id = c.req.param("id");
    const library = await Library.findById(id);
    if (!library) {
      return c.json({ ok: false, message: "Library not found" }, 404);
    }

    return c.json({ ok: true, message: "Library found", data: library }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}

// ✅ Update a library by ID
export async function updateLibrary(c: Context) {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const result = librarySchema.partial().safeParse(body);
    if (!result.success) {
      return c.json({ ok: false, message: "Invalid update data" }, 400);
    }

    const sanitizedBody = sanitizedObject(result.data);

    const updated = await Library.findByIdAndUpdate(id, sanitizedBody, {
      new: true,
    });
    if (!updated) {
      return c.json({ ok: false, message: "Library not found" }, 404);
    }

    return c.json({ ok: true, message: "Library updated", data: updated }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}

// ✅ Delete a library by ID
export async function deleteLibrary(c: Context) {
  try {
    const id = c.req.param("id");
    const deleted = await Library.findByIdAndDelete(id);

    if (!deleted) {
      return c.json({ ok: false, message: "Library not found" }, 404);
    }

    return c.json({ ok: true, message: "Library deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ ok: false, message: "Internal server error" }, 500);
  }
}
