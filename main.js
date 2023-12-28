const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Koneksi ke MongoDB
mongoose.connect(
  "mongodb+srv://yudaristian:manchester7@contactapp.tmmv4wk.mongodb.net/users?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Model MongoDB
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  phone: String,
  birthdate: Date,
  gender: String,
  city: String,
  bio: String,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Tampilan
app.set("view engine", "ejs");

// Route untuk menampilkan semua kontak
app.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("index", { users: contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menampilkan form tambah kontak
app.get("/add", (req, res) => {
  res.render("add");
});

// Route untuk menangani penambahan kontak ke database
app.post("/add", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menampilkan form edit kontak
app.get("/edit/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("edit", { user: contact });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menangani update kontak di database
app.post("/edit/:id", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menghapus kontak dari database
app.get("/delete/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Jalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
