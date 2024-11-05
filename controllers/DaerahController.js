import { where } from "sequelize";
import Daerah from "../models/DaerahModel.js";
import path from "path";
import fs from "fs";
export const getDaerah = async (req, res) => {
  try {
    const response = await Daerah.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getDaerahById = async (req, res) => {
  try {
    const response = await Daerah.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const saveDaerah = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "Tidak ada file yang di upload" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Gambar tidak valid" });
  if (fileSize > 5000000)
    return res
      .status(422)
      .json({ msg: "Ukuran gambar tidak boleh lebih dari 5mb" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Daerah.create({ name: name, image: fileName, url: url });
      res.status(201).json({ msg: "Daerah Berhasil di upload" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const updateDaerah = async (req, res) => {
  const daerah = await Daerah.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!daerah) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
  let fileName = "";
  if (req.files === null) {
    fileName = Daerah.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak valid" });
    if (fileSize > 5000000)
      return res
        .status(422)
        .json({ msg: "Ukuran gambar tidak boleh lebih dari 5mb" });

    const filepath = `./public/images/${daerah.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Daerah.update(
      { name: name, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Daerah Berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDaerah = async (req, res) => {
  const daerah = await Daerah.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!daerah) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
  try {
    const filepath = `./public/images/${daerah.image}`;
    fs.unlinkSync(filepath);
    await Daerah.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Daerah berhsail dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};
