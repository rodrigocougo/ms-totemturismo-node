const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
    IdPdv: { type: String, size: 50, name: "atractive.label.id_pdv" },
    IdReferenceBase: { type: String, size: 50, name: "city.label.idreferencebase" },
    Title: { type: String, size: 50, name: "atractive.label.title" },
    Address: { type: String, size: 50, name: "atractive.label.address" },
    Phone: { type: String, size: 50, name: "atractive.label.phone" },
    Site: { type: String, size: 50, name: "atractive.label.site" },
    Photo: { type: String, size: 50, name: "atractive.label.photo" },
    ServiceHours: { type: String, size: 50, name: "atractive.label.servicehours" },
    Description: { type: String, size: 50, name: "atractive.label.description" },
    CreateAt: { type: String, size: 50, name: "atractive.label.createat" },
    RegisterCreateAt: { type: String, size: 50, name: "atractive.label.registercreateat" },
    UpdateAt: { type: String, size: 50, name: "atractive.label.updateat" },
    RegisterUpdateAt: { type: String, size: 50, name: "atractive.label.registerupdateat" },
    Active: { type: Boolean, require: true, size: 10, name: "atractive.label.active" }
});

mongoose.model('AtractiveModel', schema);
