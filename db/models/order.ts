import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // 구매 시점의 가격 저장
})

const OrderSchema = new mongoose.Schema(
  {
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['결제완료', '배송준비', '배송중', '배송완료', '취소됨'],
      default: '결제완료',
    },
    shippingAddress: { type: String, required: true },
    contact: { type: String, required: true },
    receiver: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
)

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default Order
