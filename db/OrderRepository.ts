import mongoose from 'mongoose'
import dbConnect from './dbConnect'
import Order from './models/order'
import Goods from './models/goods'

export interface IOrderDetail {
  _id: string
  buyerId: {
    _id: string
    nickname: string
    email: string
  }
  orderItems: Array<{
    productId: {
      _id: string
      name: string
      price: number
      imageUrl: string
      category: string
    }
    quantity: number
    price: number
  }>
  totalAmount: number
  status: string
  shippingAddress: string
  contact: string
  receiver: string
  createdAt: string
}

export class OrderRepository {
  static async getOrdersBySellerId(sellerId: string) {
    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
      console.log('DEBUG: Invalid or missing sellerId:', sellerId)
      return []
    }
    await dbConnect()

    // 1. 해당 판매자가 등록한 모든 상품의 ID를 가져옵니다.
    const sellerGoods = await Goods.find({ sellerId }).select('_id').lean()
    console.log(`DEBUG: Found ${sellerGoods.length} goods for sellerId: ${sellerId}`)

    if (!sellerGoods.length) {
      console.log('DEBUG: No goods found for this seller')
      return []
    }

    const goodsIds = sellerGoods.map((g) => g._id)
    console.log('DEBUG: Searching orders with goodsIds:', goodsIds)

    // 2. 주문 상품들 중에서 해당 판매자의 상품이 최소 하나라도 포함된 주문을 찾습니다.
    const orders = await Order.find({
      'orderItems.productId': { $in: goodsIds },
    })
      .populate('buyerId', 'nickname email') // 구매자 정보 포함
      .populate('orderItems.productId') // 상품 정보 포함
      .sort({ createdAt: -1 }) // 최신순
      .lean()

    console.log(`DEBUG: Found ${orders.length} total orders for this seller`)
    return orders
  }

  static async updateOrderStatus(orderId: string, status: string) {
    await dbConnect()
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true })
  }

  static async getOrderById(orderId: string): Promise<IOrderDetail | null> {
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) return null
    await dbConnect()
    return (await Order.findById(orderId)
      .populate('buyerId', 'nickname email')
      .populate('orderItems.productId')
      .lean()) as IOrderDetail | null
  }

  static async createOrder(orderData: {
    buyerId: string
    orderItems: Array<{
      productId: string
      quantity: number
      price: number
    }>
    totalAmount: number
    shippingAddress: string
    contact: string
    receiver: string
  }) {
    await dbConnect()
    return await Order.create(orderData)
  }
}
