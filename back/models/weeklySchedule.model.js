const mongoose = require("mongoose");
const moment = require("moment");


const weeklyScheduleSchema = mongoose.Schema({
  
  dayName: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ]
  },
  type: {
    type: String,
    default: "normal"
  },
  specialName: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date
  },
  isClosed: {
    type: Boolean,
    default: false
  },
  oldIsClosed: {
    type: Boolean,
    default: false
  },
  repeatEveryYear: {
    type: Boolean,
    default: true
  },
  isEvent: {
    type: Boolean,
    default: false
  },
  eventDescription: {
    type: String,
    default: ''
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
      },

      timePerBooking: {
        type: Number,
        default: 1800000
      },

      shiftName: {
        type: String,
        default: ""
      },

      enabledOnline: {
        type: Boolean,
        default: true
      },

      paymentOnline: {
        type: Boolean,
        default: false
      },
      maxPeopleEach: {
        type: Number,
        default: 0
      },
      zones: [{
        type: Object,
        default: {}
      }],
      ableToExtend: {
        type: Boolean,
        default: false
      },
      activeIn: {
        type: Number,
        default: 0
      },
      closedDate: {
        type: Number,
        default: null
      },

    }
  ],
  pointOfSale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointOfSale"
  },
  createAt: {
    type: Date
  },
  enabledBooking: {
    type: mongoose.Schema.Types.Boolean,
    default: true
  }
  // updateAt: [
  //   {
  //     type: Date,
  //   },
  // ],
});

weeklyScheduleSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      this.createAt = moment();
    }
    // this.updateAt.push(moment());
    // this.oldIsClosed = this.isClosed;

    // if (
    //   this.isModified()
    // ) {

    //  this.admin_updateAt = moment();

    //  }

    next();
  } catch (e) {
    return next(e);
  }
});
const WeeklySchedule = mongoose.model("WeeklySchedule", weeklyScheduleSchema);

module.exports = WeeklySchedule;
