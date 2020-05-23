const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
	IdReferenceBase: { type: String, size: 50, name: "city.label.idreferencebase" },
	Title: { type: String, size: 50, name: "city.label.title" },
	SubTitle: { type: String, size: 50, name: "city.label.subtitle" },
	Content: { type: String, size: 50, name: "city.label.content" },
	PhotosUrl: { type: String, size: 50, name: "city.label.photo" },
	CreateAt: { type: String, size: 50, name: "city.label.createat" },
	RegisterCreateAt: { type: String, size: 50, name: "city.label.registercreateat" },
	UpdateAt: { type: String, size: 50, name: "city.label.updateat" },
	RegisterUpdateAt: { type: String, size: 50, name: "city.label.registerupdateat" },
	Active: { type: Boolean, require: true, size: 10, name: "city.label.active" },
	Auth: { type: Boolean, default: false, size: 10, name: "city.label.auth" }
});


mongoose.model('PdvModel', schema);
