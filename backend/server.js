import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import shortid from "shortid";
import Url from "./models/Url.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.post("/api/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "Missing longUrl" });

  const existing = await Url.findOne({ longUrl });
  if (existing) return res.json(existing);

  const shortCode = shortid.generate();
  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  const url = new Url({ longUrl, shortUrl, shortCode });
  await url.save();
  res.json(url);
});

app.get("/:code", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });
  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).json({ error: "Not found" });
  }
});

app.get("/api/history", async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
