import mongoose from "mongoose";

const SiteSettingSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    emailSending: {type: Boolean, default: true},
});


export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);