const express = require("express");
const authenControllers = require("../controllers/authenControllers");
const auth = require("../middleware/auth");
const router = express.Router();
const transactionContoller = require("../controllers/transactionControllers")


router.post("/deposit",transactionContoller.depositController);

router.post("/withdraw",transactionContoller.withdrawController);


router.post("/transfer",transactionContoller.transferController);


//table history
router.get("/history/:accNo",transactionContoller.transHistoryController)



module.exports = router;


