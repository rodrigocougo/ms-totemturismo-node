const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
	Name: { type: String, size: 50, name: "User.label.name" },
	Sobrename: { type: String, size: 50, name: "User.label.sobrename" },
	Address: { type: String, size: 50, name: "User.label.address" },
	User: { type: String, size: 50, name: "User.label.user" },
	Password: { type: String, size: 50, name: "User.label.password" },
	CreateAt: { type: String, size: 50, name: "User.label.createat" },
	RegisterCreateAt: { type: String, size: 50, name: "User.label.registercreateat" },
	UpdateAt: { type: String, size: 50, name: "User.label.updateat" },
	RegisterUpdateAt: { type: String, size: 50, name: "User.label.registerupdateat" },
	Active: { type: Boolean, require: true, size: 10, name: "User.label.active" }
});


mongoose.model('UserModel', schema);
