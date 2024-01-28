const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
	bankOrAccount:{
		type: String, //0x00 => Bank || 012345 => account no
		required: true,
	},
	transType:{
		type: String, // Deposit || Withdraw
		required: true
	},
	amount:{
		type: Number, 
		required: true
	},
	accountNo:{
    type:Number,
    required: true
  },
	dateTime:{
		
		date:{
			type:String,
			required: true
		},
		time:{
			type:String,
			required: true
		}
	}

})

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
