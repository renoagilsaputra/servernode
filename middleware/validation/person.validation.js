const { check, validationResult } = require("express-validator");

const store = [
  check("nik").not().isEmpty().withMessage("NIK is required"),
  check("nama").not().isEmpty().withMessage("Nama is required"),
  check("alamat").not().isEmpty().withMessage("Alamat is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    } else next();
  },
];

module.exports = {
  store,
};
