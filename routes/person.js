const { Router } = require("express");
const PendudukController = require("../controller/penduduk/PendudukController");
const PendudukValidation = require("../middleware/validation/person.validation");

const personRoute = Router();

personRoute.get("/", PendudukController.getAll);
personRoute.get("/:id", PendudukController.getByID);
personRoute.post("/", PendudukValidation.store, PendudukController.store);
personRoute.put("/:id", PendudukController.update);
personRoute.delete("/:id", PendudukController.destroy);
module.exports = personRoute;
