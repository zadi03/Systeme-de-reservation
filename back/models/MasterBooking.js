const mongoose = require('mongoose')
const moment = require('moment')
const Customer = require('../customer.model')
const PointOfSale = require('./pointOfSale.model')
const axios = require('axios')
const refundCharge = require('../../config/payzone/refundCharge')
const PartnerCompany = require('./partnerCompany.model')

const MasterBookingSchema = new mongoose.Schema(
  {
    pointOfSale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PointOfSale',
    },
    // units: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Unit',
    //   },
    // ],
    // orders: [{ // command will be injected here to keep tracking every user
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Command"
    // }],
    status: {
      type: String,
      default: 'coming',
      enum: ['coming', 'check-in', 'check-out', 'cancel', 'no-show', 'waiting'],
    },
    type: {
      type: String,
      default: 'walk',
      enum: ['walk', 'online', 'phone'],
    },
    // date: {// no need for date cause, we extend the timing to book period ,
    //     type: Date
    // },
    STime: {
      //starting time
      type: Number, //storing timestamps
    },
    duration: {
      //behaves as the duration and end time at the same time
      type: Number, //timestamps
    },
    information: {
      type: Object,
      default: {},
      // ref: "BookingInformation"
    },
    review: {
      type: Object,
      default: {},
    },
    // information: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "BookingInformation"
    // },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
    },
    note: {
      type: String,
    },
    internalNote: {
      type: String,
    },
    nbrPeople: {
      type: Number,
      default: 1,
    },

    requirePayment: {
      type: Boolean,
      default: false,
    },

    paymentAmount: {
      type: Number,
      default: 0,
    },

    isPayed: {
      type: Boolean,
      default: false,
    },

    hasBeenUpdated: [
      {
        type: String,
        default: '',
      },
    ],
    hasSent24EmailBefore: {
      type: Boolean,
      default: false,
    },

    hasSent24EmailAfter: {
      type: Boolean,
      default: false,
    },
    hasSentReminder: {
      type: Boolean,
      default: false,
    },

    statusHistory: [
      {
        type: Object,
        default: {},
      },
    ],

    isRefunded: {
      type: Boolean,
      default: false,
    },

    refundedAmount: {
      type: Number,
      default: 0,
    },


    hasSentConfirmationEmail: {
      type: Boolean,
      default: false,
    },

    ConfirmedEmail: {
      type: Boolean,
      default: false,
    },

    payZonePayment: {
      type: Object,
      default: {},
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    groupeId: {
      type: String,
      default: 'individual'
    },
    source: {
      type: String,
      default: 'manager',
      enum: ['manager', 'keoadmin', 'mobile', 'website', 'excel']
    },
    // partner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "customer"
    // },
    // companyPartner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "BookingPartnerCompany"
    // },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    shifts: {
      type: Object,
      default: {}
    },
    restaurantNotes: {
      type: Object,
      default: {},
    },
    isForced: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: String,
      default: "online",
      enum: ['online', 'card', 'check', 'virement', 'cash']
    },
    cancelReason : {
      type : String,
      default : "CLIENT_CANCELED"
    }
  },
  { timestamps: true },
)

MasterBookingSchema.post('save', async function (doc, next) {
  try {
    const costumer = await Customer.findById(doc.customer)


    const time = new Date(moment(doc.STime).zone('+0100')).getTime() //FIXME: I think it need to convert to the restaurant timezone

    costumer.lastBooking = time

    await costumer.save()

    if (doc.companyPartner?._id) {
      const partner = await PartnerCompany.findById(doc.companyPartner?._id)
      const bookings = await MasterBooking.find({
        companyPartner: mongoose.Types.ObjectId(doc.companyPartner?._id),
      })
  
  
      if (partner) {
        partner.numberBookings = bookings.length
        await partner.save()
      }
  
    }
  
    next()
  } catch (error) {
    next(error)
  }
})

MasterBookingSchema.pre('save', async function (next) {
  try {
    if (this.isModified('status')) {
      if (this.status === 'cancel' && this.requirePayment && this.isPayed) {
        if (this.isPayed && this.requirePayment) {
          const pointOfSale = await PointOfSale.findById(this.pointOfSale)
            .populate('settings')
            .select('title settings timezone currency country')

          const ntpServerUrl = `https://worldtimeapi.org/api/timezone/${pointOfSale.timezone}` // Replace with an NTP server of your choice

          const {
            data: { unixtime },
          } = await axios.get(ntpServerUrl)

          const timeDifference = this.STime - unixtime * 1000

          const diffSeconds = timeDifference / 1000
          const P1 = pointOfSale.settings.refundType1_time * 60 * 60
          const P2 = pointOfSale.settings.refundType2_time * 24 * 60 * 60
          const P3 = pointOfSale.settings.refundType3_time * 24 * 60 * 60

          let percentageRefund = 100

          if (diffSeconds <= P1) {
            percentageRefund = pointOfSale.settings.refundType1_percentage
          } else if (diffSeconds > P1 && diffSeconds <= P2) {
            percentageRefund = pointOfSale.settings.refundType2_percentage
          } else if (diffSeconds > P2 && diffSeconds <= P3) {
            percentageRefund = pointOfSale.settings.refundType3_percentage
          }

          const amount = (percentageRefund * this.paymentAmount) / 100
          //TODO: process the refund with payzone


          const d = await refundCharge(this.payZonePayment?.id, amount, pointOfSale.settings.payZoneMerchantName, pointOfSale.settings.payZoneCallerPassword)

          console.log("**********************************", d)

          this.isRefunded = true
          this.refundedAmount = amount
        }
      }
    }
    next()
  } catch (e) {
    return next(e)
  }
})

const MasterBooking = mongoose.model('MasterBooking', MasterBookingSchema)
MasterBookingSchema.pre('find', function (next) {
  //  this.where({ deleted: false });
  console.log({ this: this })
  next()
})
module.exports = MasterBooking
