const mongoose = require("mongoose");
const moment = require("moment");
const helpers = require("../config/functions");

const settingsSchema = mongoose.Schema({
  timePerBooking: {
    type: Number,
    default: 2
  },

  timePerCommand: {
    type: Number,
    default: 0.5
  },

  NoShowTime: {
    type: Number,
    default: 20 // in minu
  },

  NbCommand: {
    type: Number,
    default: 5
  },
  weeklySchedules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WeeklySchedule"
    }
  ],

  specialDays: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpecialDay"
    }
  ],

  pointOfSale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointOfSale"
  },

  zones: [
    {
      name: {
        type: String
      },
      nameSlug: {
        type: String
      },
      enableOccasion: {
        type: Boolean,
      },
      timePerBooking: {
        type: Number,
        default: 2
      },
      index: {
        type: Number,
      },
      percentage: {
        type: Number,
        default: 0
      }
    }
  ],

  createAt: {
    type: Date
  },

  /** START Subscription **/

  subscriptions: [{
    packName: {
      type: String,
      enum: ["custom", "visibility", "order", "booking"],
    },

    modules: [{
      type: String,
      enum: helpers.MODULES,
      default: []
    }],

    paimentPeriod: {
      type: String,
      enum: ["monthly", "quarterly", "semi-annually", "annually"],
      default: "monthly"
    },

    paymentMethod: {
      type: String,
      enum: ["check", "cash", "card", "paypal", "bank_transfer"],
      default: "cash"
    },

    currency: {
      type: String,
      enum: ["MAD", "USD", "EUR", "GBP"],
      default: "USD"
    },

    monthlyPrice: {
      type: Number,
      default: () =>
        // get the pack's price
        helpers.PACKS
          .find(p => p.name == this.packName)
          ?.price.find(p => p.currency == this.currency)
          ?.price
        ||
        // get the module's price if it's "costum"
        helpers.MODULES_BY_PACK
          .find(m => m.name == this.modules[0])
          ?.price.find(p => p.currency == this.currency)
          ?.price
    },

    totalMonths: {
      type: Number,
      default: 1
    },

    startDate: {
      type: Date,
      default: moment()
    },

    suspended: {
      type: Boolean,
      default: false,
    },

    cancelRenewal: {
      type: Boolean,
      default: false,
    },

    suspensionType: {
      type: String,
      enum: ["AUTOMATIC", "MANUAL"],
      default: "MANUAL"
    },

    suspensionInterval: {
      type: Number,
      default: 15 //* in days
    },

    // subscriptions: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Subscription"
    // }]

  }],

  /** END Subscription **/


  bookingAutoSMS: {
    type: Boolean,
    default: false
  },

  autoValidateOrder: {
    type: Boolean,
    default: false
  },


  /** START HubRise Integration **/

  isHubRiseClient: {
    type: Boolean,
    default: false
  },

  hubRiseAccountId: {
    type: String
  },

  hubRiseLocationId: {
    type: String
  },

  hubRiseCustomerListId: {
    type: String
  },

  hubRiseUserId: {
    type: String
  },

  hubRiseAccountName: {
    type: String
  },

  hubRiseLocationName: {
    type: String
  },

  hubRiseCustomerListName: {
    type: String
  },

  hubRiseAccessToken: {
    type: String
  },

  /** END HubRise Integration **/

  /** START Stripe **/

  stripeAccountId: {
    type: String
  },

  stripeAccountLinkURL: {
    type: String
  },

  stripeAccountLinkExpiresAt: {
    type: Number
  },
  /** END Stripe **/

  /** START Glovo **/

  isGlovoClient: {
    type: Boolean,
    default: false
  },

  // glovoSecretToken: {
  //   type: String
  // },
  /** END Glovo **/


  isUPXPClient: {
    type: Boolean,
    default: false
  },

  UPXPClientId: {
    type: String
  },

  UPXPSecretId: {
    type: String
  },

  typeRestaurant: {
    type: String,
    enum: ["fast_food", "classic_restaurant"]
  },

  CardPaymentClickAndCollect: {
    type: Boolean,
    default: false
  },

  CODClickAndCollect: {
    type: Boolean,
    default: true
  },

  onlyPaymentOrderTable: {
    type: Boolean,
    default: false
  },

  enableOrderTable: {
    type: Boolean,
    default: false
  },

  ClickAndCollectPaymentGateway: {
    type: String
  },

  orderTablePaymentGateway: {
    type: String
  },

  bookingPaymentGateway: {
    type: String
  },

  bookingPayPerPerson: {
    type: Number,
    default: 1
  },

  expectedTimeClickAndCollect: {
    type: Number,
    default: 20
  },

  salesChannel: [
    {
      type: String
    }
  ],
  // updateAt: [
  //   {
  //     type: Date,
  //   },
  // ],


  /** START PayZone **/

  isPayZoneClient: {
    type: Boolean,
    default: false
  },

  payZoneMerchantName: {
    type: String
  },

  payZonePaywallSecretKey: {
    type: String
  },

  payZoneCallerPassword: {
    type: String
  },

  payZoneNotificationKey: {
    type: String
  },
  /** END PayZone **/
  lockedMap: {
    type: Boolean,
    default: false
  },
  zoom: {
    type: Number,
    default: 10
  },
  tableSize: {
    type: Number,
    default: 5
  },
  percentageType : {
    type : String,
    default : "table",
    enum : ["table", "person"]
  },

  /** Refund Fields */


  refundType1_time: { //in Hour
    type: Number,
    default : 6
  },

  refundType1_percentage: {
    type: Number,
    default : 100
  },


  refundType2_time: { //in Days
    type: Number,
    default : 1
  },

  refundType2_percentage: {
    type: Number,
    default : 100
  },


  refundType3_time: { //in Days
    type: Number,
    default : 5
  },

  refundType3_percentage: {
    type: Number,
    default : 100
  },
  BookingEachTime: {
    type: Number,
    default: 1800000
  },

  noShowDelayTime: {
    type: Number,
    default: 1800000
  },

  reviewDelayTime: {
    type: Number,
    default: 1800000
  },
  confirmDelay: {
    type: Number,
    default: 21600000
  },

  reminderDelay: {
    type: Number,
    default: 1800000
  },
  activatePersonalizeEmails: {
    type: Boolean,
    default: false
  },

  descriptionThanksEmail: {
    type: String,
    default: ""
  },

  linkThanksEmail: {
    type: String,
    default: ""
  },

  imageThanksEmail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FileUpload"
  },

  maxNbrPeople: {
    type: Number,
    default: 6
  },

  firstBackgroundColor: {
    type: String,
    default: "#000000"
  },

  firstTextColor: {
    type: String,
    default: "#FFFFFF"
  },

  secondBackgroundColor: {
    type: String,
    default: "#000000"
  },

  secondTextColor: {
    type: String,
    default: "#FFFFFF"
  },
  delivery : {
    type : Boolean,
    default : false
  },
  clickCollect : {
    type : Boolean,
    default : false
  },
  enableBookingWithoutTable : {
    type : Boolean,
    default : false
  },
  dailyReportingOptions : {
    type : [String],
    default : ["coming", "waiting", "cancel", "check-in", "check-out", "no-show"]
  }, 
  customerType : {
    type : String,
    default : "all"
  },
  cancelUnpaidBookingBefore: {
    type: Number,
    default: 86400000
},

});
settingsSchema.pre("save", async function (next) {
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

settingsSchema.methods.toJSON = function () {
  const settingsObject = this.toObject();

  delete settingsObject.payZonePaywallSecretKey;
  delete settingsObject.payZoneCallerPassword;
  delete settingsObject.payZoneNotificationKey;
  delete settingsObject.UPXPSecretId;

  return settingsObject;
};



const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
