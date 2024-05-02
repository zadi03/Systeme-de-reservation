const PointOfSale = require("../models/pointOfSale.model");
const Settings = require("../models/settings.model");
const WeeklySchedule = require("../models/weeklySchedule.model");


let indexControllers = {};

indexControllers.restau = async (req, res, next) => {
  try {
    // const id = "627a726cbddda3fe7f6897a8";


    // const { id } = req.body;

  // const { id } = { "id": "63ee1925ab9328bb0eac6414" };


    
// thiiiiis 

const id = req.body.id; 
// const id = "627a726cbddda3fe7f68979f";

//adress restau:
// const id = "651f1fb331c64115100747df";

    const pointOfSale = await PointOfSale.findById(id).populate([{path : 'settings', populate: "weeklySchedules"}]);


    res.send({
      success: true,
      result: {
        pointOfSale: pointOfSale,
      },
    });
    
    // const id = req.params.id; // Access the ID from the URL


  
  } catch (error) {
    console.log("error", error);
    // throw new Error(error);
  }
};



module.exports = indexControllers;
