const mongoose = require("mongoose");
const PartnerCompany = require("./managerBooking/partnerCompany.model");
const PointOfSale = require("./pointOfSale.model");

const customerSchema = mongoose.Schema(
  {
    courtesyTitles : {
      type : String, 
      default : "Mr",
      enum : ["Mr", "Mme", "Mlle"]
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      lowercase: true,
      // required: [true, "can't be blank"],
      default : "",
      // match: [/\S+@\S+\.\S+/, "is invalid"]
    },
    phone: {
      type: String, 
      required : [true, "Phone number is required"],
      index : {
        unique : true, 
        sparse : false, //Not allowing null value
      }
    },
    pointOfSale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PointOfSale"
    },
    // command: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Command"
    //   }
    // ],
    // booking: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking"
    //   }
    // ],
    numberBookings : {
      type : Number, 
      default : 0
    },
    numberCommands : {
      type : Number, 
      default : 0
    },
    totalCommandsAmount : {
      type : Number, 
      default : 0
    },
    lastBooking: {
      type: Date
    },
    lastCommand: {
      type: Date
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    typeCustomer: {
      type: String,
      default: "standard",
      enum: ["VIP", "VVIP", "standard", "concierge", "blacklist"]
    },
    dealType: {
      type: String,
      enum: ["percent", "exact"]
    },
    deal: {
      type: Number
    },
    messages: [{
        type: String,
    }],
    // company : {
    //   type : mongoose.Schema.Types.ObjectId,
    //   ref : "BookingPartnerCompany"
    // },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FileUpload"
  },
  // partner: {
  //     type: Boolean,
  //     default : false
  // },
  status : {
    type : String,
    default : 'client',
    enum : ["client", "partner", "deliveryPerson"]
  },
  commission : {
    type : Number,
    default : 0,
  },
  commissionBy : {
    type : String,
    default : "fix",
    enum : ["fix", "percentage"]
  }
  },
  { timestamps: true }
);

// customerSchema.post(['save', 'update'], async function (doc, next) {
//   try {
//     // const companies = await PartnerCompany.find({pointOfSaleId : mongoose.Types.ObjectId(doc?.pointOfSale)})

//     // if(!companies) return;

//     // for (const company of companies) {
//     //   const customers = await Customer.find({company : mongoose.Types.ObjectId(company._id)})


//     //   company.numberOfPartner = customers?.length

//     //   await company.save()
//     // }
//     next()
//   } catch (error) {
//     next(error)
//   }
// })
const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
