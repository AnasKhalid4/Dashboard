
const router = require("express").Router();
const getSectorInsights = require("../dataFetch/GetData");
router.get("/sectorinsights", getSectorInsights);
module.exports = router;