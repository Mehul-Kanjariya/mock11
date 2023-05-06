const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
	books : [{ type: ObjectId, ref: 'Book' }],
	totalAmount: Number
},{
    versionKey:false
})

const OrderModel = mongoose.model("order",orderSchema);

module.exports = {
    UserModel
}