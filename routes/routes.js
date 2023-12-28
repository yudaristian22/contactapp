const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        bio: req.body.bio,
        birthdate: req.body.birthdate,
      },
      { new: true } // Untuk mengembalikan dokumen yang telah diperbarui
    );

    req.session.message = {
      type: "success",
      message: "User Updated Successfully",
    };

    res.locals.message = req.session.message;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.session.message = {
      type: "danger",
      message: err.message,
    };

    res.locals.message = req.session.message;
    res.redirect("/");
  }
});

// Get all users route
router.get("/", async (req, res) => {
  try {
    const users = await User.find().exec();

    res.render("index", {
      title: "Home Page",
      users: users,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});

// Edit an user route
router.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.redirect("/");
    }

    res.render("edit_user", {
      title: "Edit User",
      user: user,
    });
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.redirect("/");
  }
});

// Update user route
router.post("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        bio: req.body.bio,
        birthdate: req.body.birthdate,
      },
      { new: true } // Untuk mengembalikan dokumen yang telah diperbarui
    );

    if (!updatedUser) {
      return res.json({ message: "User not found", type: "danger" });
    }

    req.session.message = {
      type: "success",
      message: "User Updated Successfully",
    };

    res.locals.message = req.session.message;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.locals.message = req.session.message;
    res.json({ message: err.message, type: "danger" });
  }
});

// Delete user router
router.get("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;

    const result = await User.findByIdAndDelete(id);
    req.session.message = {
      type: "success",
      message: "User Deleted Successfully",
    };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.session.message = {
      type: "danger",
      message: err.message,
    };

    res.redirect("/");
  }
});

module.exports = router;
