const mongoose = require('mongoose')

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


UserSchema.index({
  email: 'text',
  phone: 'text',
})

const User = mongoose.model('User', UserSchema)

module.exports = User
