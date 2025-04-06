const express=require('express')
const { authUser } = require('../middlewares/isAuthUser')
const { postFeedback, getFeedback } = require('../controllers/feedbackController')
const router=express.Router()

router.get('/getFeedback',authUser,getFeedback)
router.post('/postFeedback',authUser,postFeedback)
module.exports=router