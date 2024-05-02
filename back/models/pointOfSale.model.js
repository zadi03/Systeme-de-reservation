const mongoose = require("mongoose");
const moment = require("moment");

// const uniqueValidator = require("mongoose-unique-validator");

// const uniqid = require("uniqid");
// const createStellarAccount = require("../config/stellar/createStellarAccount");
// const CryptoJS = require("crypto-js");
// const SocialMediaCover = require("./socialMediaCover.model");
// const translationsService = require("../config/translationsService");
// const {
//     listStyleResto,
//     listTypeCuisine,
//     listPaymentMethod,
//     listServices
// } = require("../data/restaurantCharacteristics");


// const helpers = require("../config/functions");

const PointOfSaleSchema = mongoose.Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: false,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: false
        },
        phone: {
            type: String,
            required: true
        },
        mobileRestaurant: {
            type: String
        },
        title: {
            type: String,
            required: true,
            // unique: true,
            index: true
        },
        latitude: {
            type: String
            // required: true,
        },
        longitude: {
            type: String
            // required: true,
        },
        category: {
            type: String,
            enum: ["restaurant", "bar", "hotel"],
            default: "restaurant"
        },
        logo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FileUpload"
        },
        backgroundImageCover: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FileUpload"
        },
        url: {
            type: String
        },
        address: {
            type: String
        },
        country: {
            type: String,
            uppercase: true,
            default: "MOROCCO"
        },
        descriptionTitle: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        descriptionWebsite: {
            type: String,
            default: ""
        },
        maxBookings: {
            type: Number,
            default: 300
        },
        capacity: {
            type: Number
        },
        averageBill: {
            type: Number
        },
        isDemo: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website"
        },
        city: {
            type: String,
            index: true,
            lowercase: true
        },

        PriceTier: {
            type: String,
            enum: ["AFFORDABLE", "MODERAYELY_EXPENSIVE", "EXPENSIVE"],
        },

        tags: [
            {
                index: true,
                type: "String"
            }
        ],

        hasOwner: {
            type: Boolean
        },

        enabled: {
            type: Boolean,
            default: true,
        },

        archived: {
            type: Boolean,
            default: false,
        },

        priceAvg: {
            type: Number,
            default: 3,
            enum: [1, 2, 3, 4, 5]
        },
        reviewAvg: {
            type: Number,
            default: 0
        },
        isFreeTrail: {
            type: Boolean,
            default: false
        },
        dateFinishTrail: {
            type: Date
        },

        supervisors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        settings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Settings"
        },
        // reservationFormSettings: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "ReservationFormSettings"
        // },
        staff: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        managers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        // units: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Unit"
        //     }
        // ],
        subscribers: [
            {
                type: String
            }
        ],

        kitchenType: [
            {
                index: true,
                type: "String"
            }
        ],

        restaurantStyle: [
            {
                index: true,
                type: "String"
            }
        ],

        services: [
            {
                index: true,
                type: "String"
            }
        ],

        outsideType: [
            {
                index: true,
                type: "String"
            }
        ],
        isAlcohol: {
            type: Boolean,
            default: false
        },

        isSmokingArea: {
            type: Boolean,
            default: false
        },

        isVegetarian: {
            type: Boolean,
            default: false
        },

        isAccessAnimals: {
            type: Boolean,
            default: false
        },

        isGlutenFree: {
            type: Boolean,
            default: false
        },
        isCar: {
            type: Boolean,
            default: false
        },
        isCarPark: {
            type: Boolean,
            default: false
        },
        isHandicappedFriendly: {
            type: Boolean,
            default: true
        },
        enableEditAdminAccount: {
            type: Boolean,
            default: false
        },

        clientNameUjuke: {
            type: String,
            default: null
        },
        MACAddress: {
            type: String,
            default: null
        },

        affiliateId: {
            type: String
        },

        // affiliatedFromUser: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Partner"
        // },
        affiliatedFromRestaurant: {
            type: String
        },
        currency: {
            type: String,
            enum: ["MAD", "USD", "EUR", "GBP"],
            default: "USD"
        },
        activePosMenu: {
            type: Boolean,
            default: false
        },

        createAt: {
            type: Date
        },

        show: {
            type: Boolean,
            default: false
        },

        isCustomer: {
            type: Boolean,
            default: false
        },

        isFirstRestaurant: {
            type: Boolean,
            default: false
        },
        // promotionRestaurant: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "PromotionRestaurant"
        // },

        location: {
            type: { type: String, default: "Point" },
            coordinates: {
                type: [Number],
                required: true,
                default: function () {
                    if (this.longitude && this.latitude) {
                        return [this.longitude, this.latitude];
                    }
                }
            }
        },


        // contacts: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "ContactRole"
        //     }
        // ],
        // company: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Company"
        // },
        dressCode: [
            {
                index: true,
                type: "String"
            }
        ],

        notes: {
            type: "String",
            default: ""
        },
        isShowInBooked: {
            type: Boolean,
            default: true
        },
        postalCode: {
            type: "String",
            default: ""
        },
        countryShortName: {
            type: "String",
            default: ""
        },
        status: {
            type: "String",
            enum: ["open", "close", "close_definitively"],
            default: "close"
        },
        paymentOptions: [
            {
                index: true,
                type: "String"
            }
        ],
        url_instagram: {
            type: String
        },
        url_tripadvisor: {
            type: String
        },
        url_fb: {
            type: String
        },
        url_youtube: {
            type: String
        },
        url_linkedin: {
            type: String
        },
        reservationLink: {
            type: String
        },
        orderLink: {
            type: String
        },
        orderMenuIdLink: {
            type: String
        },
        isOrderMenu: {
            type: Boolean,
            default: true
        },
        googlePlaceId: {
            type: String
        },
        hubRise_location_id: {
            type: String
        },
        glovoStoreId: {
            type: String
        },
        // glovoMenu: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "MenuRestaurant"
        // },

        glovoMenuTransactionId: {
            type: String
        },

        timezone: {
            type: String,
            default: "Africa/Casablanca"
        },
        rewardAffiliated: {
            type: Number,
            default: 0
        },
        nbClickAffiliationLink: {
            type: Number,
            default: 0
        },
        // activitiesPointOfSale: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "ActivitiesPointOfSale"
        //     }
        // ],
        admin_updateAt: {
            type: Date
        },
        //Company fields  TODO: must delete the fields below
        companyAddress: {
            type: String
        },
        companyCapital: {
            type: String
        },
        companyCity: {
            type: String
        },
        companyCountry: {
            type: String
        },
        companyICE: {
            type: String
        },
        companyIF: {
            type: String
        },
        companyIdentification: {
            type: String
        },
        companyLegalStatus: {
            type: String
        },
        companyName: {
            type: String
        },
        companyRC: {
            type: String
        },
        companyTVA: {
            type: String
        },
        companyZipCode: {
            type: String
        },
        //END Company fields
        maxRewardScanMenu: {
            type: Number,
            default: 50
        },
        maxRewardBookingFromForm: {
            type: Number,
            default: 50
        },
        maxRewardCommandClickAndCollect: {
            type: Number,
            default: 50
        },

        stellarAccountId: {
            type: String
        },

        verificationCode: {
            type: String
        },

        verificationCodeExpires: {
            type: Date
        },

        accountId: {
            type: String
        },

        verified: {
            type: Boolean,
            default: false
        },

        requestManualVerification: {
            type: Boolean,
            default: false
        },

        createdFrom: {
            type: String,
            enum: ["dashboard", "manager"],
            default: "dashboard"
        },
        hasCoverFacebook: {
            type: Boolean,
            default: false
        },
        coverFacebook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FileUpload"
        },
        // socialMediaCover: {
        //     type: mongoose.Schema.Types.Object,
        //     ref: "SocialMediaCover"
        // },
        // instagramMediaCover: {
        //     type: mongoose.Schema.Types.Object,
        //     ref: "SocialMediaCover"
        // },
        zip: {
            type: String
        },
        templateWebsite: {
            type: String,
            default: "template_1"
        },
        menuStyle: {
            type: String,
            default: "style_1",
            enum: ["style_1", "style_2"]
        },
        showReservationWebsite: {
            type: Boolean,
            default: true
        },
        showOrderWebsite: {
            type: Boolean,
            default: true
        },
        gallery: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FileUpload"
            }
        ],
        // translations: {
        //     type: Array,
        //     default: []
        // },

        packName: [{
            type: String,
            enum: ["custom", "visibility", "order", "booking"],
            default: []
        }],

        // modules: [{
        //     type: String,
        //     enum: helpers.MODULES,
        //     default: []
        // }],
        summerTime: {
            type: Boolean,
            default: false
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
        cancelUnpaidBookingBefore: {
            type: Number,
            default: 86400000
        },
        preposition: {
            type: String,
            default: "chez",
        },
    },
    { timestamps: true }
);

PointOfSaleSchema.index({ location: "2dsphere" });

PointOfSaleSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            this.createAt = moment();
            this.accountId = uniqid();

            // this.socialMediaCover = await new SocialMediaCover().save();
            // this.instagramMediaCover = await new SocialMediaCover().save();
        }

        if (this.isModified("latitude") || this.isModified("longitude")) {
            this.location = {
                type: "Point",
                coordinates: [this.longitude, this.latitude]
            };
        }


        if (!this.affiliateId) {
            this.affiliateId = uniqid();
        }


        if (this.isModified("description") || this.isModified("descriptionTitle") || this.isModified("kitchenType") || this.isModified("restaurantStyle") || this.isModified("paymentOptions") || this.isModified("services")) {
            try {
                const arr = [

                    ...this.restaurantStyle.map(s => listStyleResto.find(ls => ls.value === s)),
                    ...this.kitchenType.map(s => listTypeCuisine.find(ls => ls.value === s)),
                    ...this.paymentOptions.map(s => listPaymentMethod.find(ls => ls.value === s)),
                    ...this.services.map(s => listServices.find(ls => ls.value === s)),
                ]
                const s =
                    arr.reduce(
                        (obj, item) => Object.assign(obj, { [item.value]: item.label }), {});


                const objectToTranslate = {};
                if (this.description) objectToTranslate.description = this.description;
                if (this.descriptionTitle) objectToTranslate.descriptionTitle = this.descriptionTitle;

                // this.translations = await translationsService.processTranslation({ ...objectToTranslate, ...s }, [...translationsService.targets, "fr"]);
            } catch (e) {
                console.log("____", e)
            }
        }

        next();
    } catch (e) {
        return next(e);
    }
});

PointOfSaleSchema.methods.toJSON = function () {
    const pointOfSaleObject = this.toObject();

    delete pointOfSaleObject.stellarAccountId;

    return pointOfSaleObject;
};

// POSSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

const PointOfSale = mongoose.model("PointOfSale", PointOfSaleSchema);

module.exports = PointOfSale;
