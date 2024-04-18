const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  hash = require('../config/hash')
const uniqid = require('uniqid')

const CryptoJS = require('crypto-js')
const ErrorHandler = require('../config/ErrorHandler')
const createStellarAccount = require('../config/stellar/createStellarAccount')
const moment = require('moment')
const client = require('../config/socketClient')

const UserSchema = mongoose.Schema(
  {
    affiliatedId: {
      type: 'string',
    },
    affiliatedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner',
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },

    secondEmail: {
      type: String,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },

    password: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    city: {
      type: String,
    },

    country: {
      type: String,
    },

    state: {
      type: String,
    },

    address: {
      type: String,
    },

    phone: {
      type: String,
      index: true,
    },

    oldPhones: [
      {
        type: String,
      },
    ],

    oldEmails: [
      {
        type: String,
      },
    ],

    role: {
      type: String,
      enum: [
        'ROLE_USER',
        'ROLE_SUPER_ADMIN',
        'ROLE_COMMERCIAL',
        'ROLE_FINANCE',
        'ROLE_SUPPORT',
        'ROLE_SUPERVISOR',
        'ROLE_STAFF',
        'ROLE_ADMIN',
        'ROLE_MANAGER',
        'ROLE_DIRECTOR',
        'ROLE_BOOKING',
        'ROLE_WAITER',
        'ROLE_DELIVERY',
      ],
      default: 'ROLE_USER',
    },

    typeAccount: {
      type: String,
      enum: ['restaurant', 'hotel', 'spa'],
      default: 'restaurant',
    },

    enableRoomService: {
      type: Boolean,
      default: false,
    },

    isUserApple: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },

    activationCodePhone: {
      type: Number,
    },

    activationCodePhoneExpires: {
      type: Date,
    },

    activationCodeEmail: {
      type: String,
    },

    activationCodeEmailExpires: {
      type: Date,
    },

    isPhoneActivated: {
      type: Boolean,
      default: false,
    },

    isEmailActivated: {
      type: Boolean,
      default: false,
    },

    enabled: {
      type: Boolean,
      default: false,
    },

    birthday: {
      type: Date,
    },

    supervisorPointOfSales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PointOfSale',
      },
    ],

    ownedPointOfSales: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PointOfSale',
    },

    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FileUpload',
    },
    // accessibleMenu: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'MenuRestaurant',
    //   },
    // ],
    facebookId: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      default: '',
    },
    appleId: {
      type: String,
      default: '',
    },
    stellarPubAddress: {
      type: String,
      default: '',
    },
    stellarPubAddressBalanceXLM: {
      type: Number,
      default: 0,
    },
    balanceStellarPubAddress: {
      type: Number,
    },
    CodeChangePassword: {
      type: String,
      default: null,
    },
    createAt: {
      type: Date,
      default: new Date(),
    },

    affiliateId: {
      type: String,
    },
    affiliatedFromUser: {
      type: String,
    },
    affiliatedFromRestaurant: {
      type: String,
    },
    nbClickAffiliationLink: {
      type: Number,
      default: 0,
    },

    rewardAffiliated: {
      type: Number,
      default: 0,
    },
    loginAt: [
      {
        type: Date,
      },
    ],
    idTour: {
      type: Boolean,
      default: true,
    },
    shareMyDataWithAffiliated: {
      type: Boolean,
      default: false,
    },
    lang: {
      type: String,
      enum: ['fr', 'en', 'dt'],
      default: 'fr',
    },

    accountId: {
      type: String,
    },

    stellarAccountId: {
      type: String,
    },

    createdFrom: {
      type: String,
      enum: [
        'upxp_mobile',
        'wallet',
        'dashboard',
        'manager',
        'openflow',
        'deliveryApp',
      ],
      default: 'dashboard',
    },

    facebookLink: {
      type: String,
    },

    instagramLink: {
      type: String,
    },

    youtubeLink: {
      type: String,
    },

    twitterLink: {
      type: String,
    },

    discordLink: {
      type: String,
    },
    telegramLink: {
      type: String,
    },

    walletLang: {
      type: String,
      default: 'en',
    },

    dashboardLang: {
      type: String,
      default: 'en',
    },

    createdFromAddressIP: {
      type: String,
    },

    createdFromLocation: {
      type: Object,
    },

    // createdFromLocationAddressIPValidator: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'AddressIPValidator',
    // },

    createdFromCountry: {
      type: String,
    },

    place_idFirstRestaurant: {
      type: String,
    },

    currentStep: {
      type: String,
      default: '',
    },

    walletBuyUPXPNotified: {
      type: Boolean,
      default: false,
    },

    walletUpxpAttention: {
      createdAt: {
        type: Date,
      },
      purchaseAttention: {
        type: Number,
      },
    },

    two_factor_temp_secret: {
      type: String,
    },
    two_factor_enabled: {
      type: Boolean,
      default: false,
    },
    two_factor_secret: {
      type: String,
    },
    unverifiedPhoneNumber: {
      type: Boolean,
    },
    oldRewards: {
      type: Number,
      default: 0,
    },
    show_tutorial: {
      default: false,
      type: Boolean,
    },
    requestBecomeInfluencer: {
      default: false,
      type: Boolean,
    },
    requestBecomeAmbassador: {
      default: false,
      type: Boolean,
    },
    isInfluencer: {
      default: false,
      type: Boolean,
    },
    isAmbassador: {
      default: false,
      type: Boolean,
    },

    allowTask: {
      default: false,
      type: Boolean,
    },

    onboardingDashbord: {
      default: true,
      type: Boolean,
    },
    address: {
      type: String,
    },
    tokenResetPassword: {
      type: Object,
      default: {
        token: '',
        expired: '',
      },
    },
    pin: {
      type: String,
      default: '',
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    accessibleZone: [
      {
        // just for the waiter
        type: String,
        default: [],
      },
    ],
    courtesyTitles: {
      type: String,
      default: 'Mr',
      enum: ['Mr', 'Mme', 'Mlle'],
    },
    // productionType: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'ProductionType',
    //   // default : ''
    // },
    // deliveryAddresses : [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "AddressDelivery",
    // }],

    latitude: {
      type: String,
      // required: true,
    },
    longitude: {
      type: String,
      // required: true,
    },

    location: {
      type: { type: String, default: 'Point' },
      coordinates: {
        type: [Number],
        default: function () {
          if (this.longitude && this.latitude) {
            return [this.longitude, this.latitude]
          } else {
            return [0.0, 0.0]
          }
        },
      },
    },
  },

  {
    timestamps: true,
  },
)

UserSchema.pre('save', async function (next) {
  try {
    this.wasNew = this.isNew
    if (this.isNew) {
      this.createAt = moment()
      this.accountId = uniqid()

      // try {
      //   const accountData = await createStellarAccount(this.accountId)
      //   if (accountData) this.stellarAccountId = accountData.account._id
      // } catch (e) {
      //   console.log(`e`, e)
      // }

      // if (!this.isEmailActivated) {
      //   this.activationCodeEmail = uniqid();
      //   this.activationCodeExpires = moment().add(1, "hours"); // now + hour
      // }
    }

    if (!this.affiliateId) {
      this.affiliateId = uniqid()
    }

    if (this.isModified('password')) {
      this.password = await hash(this.password)
      this.CodeChangePassword = null
    }

    if (this.isModified('rewardAffiliated')) {
      client.emit('getUserAirDropToken', this._id, this.rewardAffiliated)
    }

    next()
  } catch (e) {
    return next(e)
  }
})

UserSchema.methods.isPasswordMatch = function (password, hashed, callback) {
  bcrypt.compare(password, hashed, (err, success) => {
    if (err) {
      return callback(err)
    }
    callback(null, success)
  })
}

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()

  delete userObject.password
  delete userObject.resetPasswordExpires
  delete userObject.resetPasswordToken
  delete userObject.activationCodePhone
  delete userObject.activationCodePhoneExpires
  delete userObject.activationCodeEmail
  delete userObject.activationCodeEmailExpires
  delete userObject.stellarAccountId
  delete userObject.two_factor_secret
  delete userObject.two_factor_temp_secret

  return userObject
}

UserSchema.index({ location: '2dsphere' })

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('latitude') || this.isModified('longitude')) {
      if (this.longitude && this.latitude) {
        this.location = {
          type: 'Point',
          coordinates: [this.longitude, this.latitude],
        }
      } else {
        this.location = {
          type: 'Point',
          coordinates: [0, 0],
        }
      }
    }

    next()
  } catch (e) {
    return next(e)
  }
})

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    const item = error.message.split(':')[2].split(' ')[1].split('_')[0]
    let message = 'duplicate email'
    let code = undefined

    switch (item) {
      case 'email':
        code = 'USER_AUTH_DUPLICATE_EMAIL'
        break

      default:
        break
    }
    let err = new ErrorHandler(400, message)
    if (code) {
      err = new ErrorHandler(400, message, code)

      // Error(JSON.stringify({ message, code_error: code }));
    }
    next(err)
  } else {
    next(error)
  }
})

UserSchema.index({
  email: 'text',
  phone: 'text',
})

const User = mongoose.model('User', UserSchema)

module.exports = User
