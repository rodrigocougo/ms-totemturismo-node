const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
    IdPdv: { type: String, size: 50, name: "city.label.id_pdv" },
    IdReferenceBase: { type: String, size: 50, name: "city.label.idreferencebase" },
    Title: { type: String, size: 50, name: "city.label.title" },
    Address: { type: String, size: 50, name: "city.label.address" },
    Phone: { type: String, size: 50, name: "city.label.phone" },
    Site: { type: String, size: 50, name: "city.label.site" },
    Photo: { type: String, size: 50, name: "city.label.photo" },
    ServiceHours: { type: String, size: 50, name: "city.label.servicehours" },
    Description: { type: String, size: 50, name: "city.label.description" },
    CreateAt: { type: String, size: 50, name: "city.label.createat" },
    RegisterCreateAt: { type: String, size: 50, name: "city.label.registercreateat" },
    UpdateAt: { type: String, size: 50, name: "city.label.updateat" },
    RegisterUpdateAt: { type: String, size: 50, name: "city.label.registerupdateat" },
    Active: { type: Boolean, require: true, size: 10, name: "city.label.active" }
});

mongoose.model('GastronomyModel', schema);
