const sectorinsights = require("../models/SectorInsights.js");

const getSectorInsights = async (req, res) => {
  try {
    const sectorInsights = await sectorinsights.find();
    res.status(200).send(sectorInsights);
    console.log(sectorInsights)
  } catch (error) {
    res.status(500).send({ message: "Could not get data!", status: false });
  }
};

module.exports =  getSectorInsights;