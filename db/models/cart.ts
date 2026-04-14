import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods', required: true },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    collection: 'cart',
  }
)

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema)

export default Cart
