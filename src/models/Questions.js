const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
	department:{
		type:String
	},
	questionAndAnswer:{
		type:Array
	}
},{timeStamp:true});

const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;