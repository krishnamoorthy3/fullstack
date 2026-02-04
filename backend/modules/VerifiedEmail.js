const mongoose= require("mongoose")

const verifiedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  verifiedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("VerifiedEmail", verifiedEmailSchema);
