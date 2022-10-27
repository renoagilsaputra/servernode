const { sequelize } = require("../../db");

const https = require("https");

const getAll = async (req, res) => {
  try {
    const url =
      "https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=maze";

    const request = https.request(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data = data + chunk.toString();
      });

      response.on("end", () => {
        const body = JSON.parse(data);
        console.log(body.total);
      });
    });

    request.on("error", (error) => {
      console.log("An error", error);
    });

    request.end();
    const data = await sequelize.query(`SELECT * FROM penduduk`);

    return res.status(200).json({
      message: "success",
      data: data[0],
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sequelize.query(
      `SELECT * FROM penduduk WHERE id = :id`,
      {
        replacements: {
          id,
        },
      }
    );

    return res.status(200).json({
      message: "success",
      data: data[0][0],
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

const store = async (req, res) => {
  try {
    const { nik, nama, alamat } = req.body;

    await sequelize.query(
      `INSERT into penduduk(nik,nama,alamat) VALUES(:nik,:nama,:alamat)`,
      {
        replacements: {
          nik,
          nama,
          alamat,
        },
      }
    );

    return res.status(200).json({
      message: "success",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nik, nama, alamat } = req.body;

    await sequelize.query(
      `UPDATE penduduk SET nik = :nik, nama = :nama, alamat = :alamat WHERE id = :id`,
      {
        replacements: {
          id,
          nik,
          nama,
          alamat,
        },
      }
    );

    return res.status(200).json({
      message: "success",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await sequelize.query(
      `SELECT * FROM penduduk WHERE id = :id`,
      {
        replacements: {
          id,
        },
      }
    );

    if (!data[0][0]) {
      return res.status(404).json({
        message: "Data not found",
        statusCode: 404,
      });
    }

    await sequelize.query(`DELETE FROM penduduk WHERE id = :id`, {
      replacements: {
        id,
      },
    });

    return res.status(200).json({
      message: "success",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

module.exports = {
  getAll,
  getByID,
  store,
  update,
  destroy,
};
