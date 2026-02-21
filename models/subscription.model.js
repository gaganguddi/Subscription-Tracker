/*import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscripation name is requires'],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    price:{
        type: Number,
        required: [true, 'Subscripation price is requires'],
        min: [0, 'Price should be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'INR', 'EUR'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','political','others'],
        required: [true, 'Subscripation name is requires'],
    },
    paymentMethod: {
        type: String,
        required: [true],
        trim: true,
    },
    status:{
        type: String,
        enum: ['active','canceled', 'expired'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in past',
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function (value){
                value < this.startDate;
            } ,
            message: 'RenewalDate must be after the start date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index : true,
    }

}, { timestamps: true });


//Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()){
         this.status = 'expired';
    }

    //next();

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;*/

import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price should be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'INR', 'EUR'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: [true, 'Subscription frequency is required'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'political', 'others'],
        required: [true, 'Subscription category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past or present',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                // Must return a boolean and logic must be: renewal AFTER start
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true,
    }
}, { timestamps: true });

// Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        // Initialize renewalDate based on startDate
        this.renewalDate = new Date(this.startDate);

        // Add the period to the date
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    // Move to the next middleware or save the document
    //next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

