const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mailTemplate/welcomeEmail");

const userSchema = new mongoose.Schema({

        firstName: {
                type: String,
                required: true,
                trim: true
        },
        lastName: {
                type: String,
                required: true,
                trim: true
        },
        email: {
                type: String,
                required: true,
                trim: true
        },
        password: {
                type: String,
                required: true,
                trim: true
        },
        image: {
                type: String,
                required: true,
        },
        token: {
                type: String
        },
        resetPasswordExpires: {
                type: Date
        }
},
        {
                timestamps: true
        }
)

async function sendWelcomeEmail(email, name) {
        try {
          const mailResponse = await mailSender(
            email,
            "welcome email from social bee",
            emailTemplate(name)
          );
          console.log(`successfully send welcome email : - > ${mailResponse}`);
        } catch (err) {
          console.log("not able to send welcome email");
          console.log(err);
        }
      }
      
userSchema.pre("save", async function (next) {
    sendWelcomeEmail(this.email, `${this.firstName} ${this.lastName}`);
    next();
});

module.exports = mongoose.model("User", userSchema)