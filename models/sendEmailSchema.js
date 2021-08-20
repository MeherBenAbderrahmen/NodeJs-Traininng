const mongoose = require('mongoose');

const sendEmailSchema = new mongoose.Schema({
    from: { type: String, },
    to: { type: String, },
    subject: { type: String, },
    text: { type: String, },
    attachment: { type: String, },
    html: { type: String, },
    date: { type: Date, default: Date.now },
 }, {
        versionKey: false,
        timestamps: true
});
const Mail = mongoose.model('Mail', sendEmailSchema);
module.exports = Mail;