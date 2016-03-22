var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/chihuo');//连接数据库
var Schema = mongoose.Schema;//创建模型

var checkinSchema= new Schema({
	username:String
});
exports.checkin = db.model('checkins',checkinSchema);//与checkin集合关联

var luckySchema= new Schema({
	// username:String
});
exports.lucky = db.model('luckys',luckySchema);//与luckys集合关联

var userSchema = new Schema({
	username:String,
	password:String
});//定义了一个新的模型，但是此模型还未和users集合有关联
exports.user = db.model('users',userSchema);//与users集合关联