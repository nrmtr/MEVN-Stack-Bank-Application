const Trans = require("../models/transaction");
const User = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//deposit 
const depositController = async (req,res)=>{

	const { accountNo, amount } = req.body;	

	const result = depositAmount(accountNo,amount)

	async function depositAmount (accountNo,amount)  {
		const data = await User.findOne({accountNo:accountNo})

		if(!data){
			return res.send("failed to deposit");
		}

		const update = await User.findOneAndUpdate({accountNo:accountNo}
			,{
				"$set":{
					balance: data.balance + amount
				}
			})

			if(!update){
				return null;
			}else{
				return update
			}
	}

	// create deposit new transfer document in db
	const newTransaction = new Trans({
		bankOrAccount:0000,
		accountNo:accountNo,
		transType: "DEPOSIT",
		amount: amount,
		"dateTime.date": new Date().toLocaleDateString(),
		"dateTime.time": new Date().toLocaleTimeString()	
	})

	newTransaction.save().then(transData => {
		return res.json(transData)
	}).catch((err) => {
		return res.status(500).send(err)
	});

}

// withdraw
const withdrawController = async (req,res)=>{

	const { accountNo, amount } = req.body;	

	const result = withdrawAmount(accountNo,amount)

	async function withdrawAmount (accountNo,amount)  {
		const data = await User.findOne({accountNo:accountNo})

		if(!data){
			return res.send("failed to withdraw");
		}

		const update = await User.findOneAndUpdate({accountNo:accountNo}
			,{
				"$set":{
					balance: data.balance - amount
				}
			})

			if(!update){
				return null;
			}else{
				return update
			}
	}

	// create WITHDRAW new transfer document in db	
	const newTransaction = new Trans({
		bankOrAccount:0000,
		accountNo:accountNo,
		transType: "WITHDRAW",
		amount: amount,
		"dateTime.date": new Date().toLocaleDateString(),
		"dateTime.time": new Date().toLocaleTimeString()	
	})
	
	newTransaction.save().then(data => {
		return res.json(data)
	}).catch((err) => {
		return res.status(500).send(err)
	});

}


//transfer 
const transferController = async (req,res)=>{
	const {bankOrAccount, amount, accountNo} = req.body;
	
	const result = await transferAmount(bankOrAccount, accountNo, amount)
	//function to transfer and receive 
	async function transferAmount(fromAccount,toAccount,amount){
		const fromA = await User.findOne({accountNo: fromAccount})
		const toA = await User.findOne({accountNo: toAccount})
			
			if(!fromA || !toA){
				return null
			}
			
			const fromUpdate = await User.findOneAndUpdate({accountNo:fromAccount},
			{
				"$set": {
					balance: fromA.balance - amount
				}
			})
			
			if(!fromUpdate){
			
				return null
			}
			
			const toUpdate = await User.findOneAndUpdate({accountNo:toAccount},
			{
				"$set": {
					balance: toA.balance + amount
				}
			})
		
			if(!toUpdate){
				return null
			}
			
			return "update success"
	}
	// Transfer
	const transTo = new Trans({
		bankOrAccount:bankOrAccount,
		accountNo:accountNo,
		transType: "TRANSFER",
		amount: amount,
		"dateTime.date": new Date().toLocaleDateString(),
		"dateTime.time": new Date().toLocaleTimeString()
	})
	// Receive
	const receive = new Trans({
		bankOrAccount:accountNo,
		accountNo:bankOrAccount,
		transType: "RECEIVE",
		amount: amount,
		"dateTime.date": new Date().toLocaleDateString(),
		"dateTime.time": new Date().toLocaleTimeString()
	})
	


		const trans1 = await transTo.save().then((fromA) => {
			return res.send(fromA)
		}).catch((err) => {
			throw err.message
		});
		const trans2 = await receive.save().then((toA) => {
			return res.send(toA)
		}).catch((err) => {
			throw err.message
		});

		if(trans1!=null && trans2!=null){
			return res.send("amount transfered")
		}else{
			return res.send("amount failed").status(500)
		}		


}

// return all transaction of user with accountNo
const transHistoryController = (req,res)=>{
	const accountNo = req.params.accNo
	Trans.find({accountNo:accountNo}).then((data) => {
		return res.send(data)
	}).catch((err) => {
		throw error.message
	});
}


module.exports = {
	depositController,
	withdrawController,
	transferController,
	transHistoryController
};


