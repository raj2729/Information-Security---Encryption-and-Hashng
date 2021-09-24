const asyncHandler = require("express-async-handler");
const InstructorPayment = require("../models/InstructorPayment");
/*
LIST OF CONTROLLERS
1. paymentsToInstructors
2. perform a payment
*/

// 1. Get all  paytments to Instructors - 
const paymentsToInstructors = asyncHandler(async (req, res) => {
    const instructorPayments = await InstructorPayment.find({}).populate("instructorId", "name email")
    res.status(200).json({
        success: true,
        data: instructorPayments
    })
}); 

const performPayment = asyncHandler(async (req,res)=> {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature, instructorId, amount} = req.body 
    const payment = new InstructorPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        instructorId,
        amount
    })
    await payment.save()
    return res.status(200).json({
        success: true,
        data: payment
    })
})


module.exports = {
    paymentsToInstructors,
    performPayment
};
