const mongoose = require("mongoose");
const moment = require("moment");

const specialDaySchema = mongoose.Schema({
  date: {
    type: Date
  },

  isClosed: {
    type: Boolean,
    default: false
  },

  pointOfSale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointOfSale"
  },
  shift: [
    {
      startTime: {
        type: Number, //18.5 ==> 18h 30 min
        default: 9
      },

      endTime: {
        type: Number, //18.5 ==> 18h 30 min
        default: 22
      }
    }
  ],
  createAt: {
    type: Date
  }
  // updateAt: [
  //   {
  //     type: Date,
  //   },
  // ],
});
specialDaySchema.pre("save", async function(next) {
  try {
    if (this.isNew) {
      this.createAt = moment();
    }
    // this.updateAt.push(moment());

    next();
  } catch (e) {
    return next(e);
  }
});
const SpecialDay = mongoose.model("SpecialDay", specialDaySchema);

module.exports = SpecialDay;
