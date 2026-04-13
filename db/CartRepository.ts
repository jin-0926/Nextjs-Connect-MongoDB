import dbConnect from './dbConnect'
import Cart from './models/cart'
import './models/goods'

export class CartRepository {
  /**
   * 장바구니에 아이템을 추가합니다.
   * 이미 있는 경우 수량을 1 증가시킵니다.
   */
  static async addCartItem(userId: string, productId: string) {
    try {
      await dbConnect()

      // 이미 장바구니에 있는지 확인
      const existingItem = await Cart.findOne({ userId, productId })

      if (existingItem) {
        existingItem.quantity += 1
        await existingItem.save()
        return { success: true, item: existingItem }
      } else {
        const newItem = new Cart({ userId, productId, quantity: 1 })
        await newItem.save()
        return { success: true, item: newItem }
      }
    } catch (error) {
      console.error('CartRepository Add Error:', error)
      throw new Error('장바구니 담기에 실패했습니다.')
    }
  }

  /**
   * 사용자의 장바구니 목록을 가져옵니다.
   */
  static async getCartItems(userId: string) {
    try {
      await dbConnect()
      // .populate('productId')를 통해 해당 상품의 상세 정보(이름, 가격 등)도 함께 가져옵니다.
      const items = await Cart.find({ userId })
        .populate('productId', '_id name price imageUrl category sellerId')
        .sort({ createdAt: -1 })
      return { success: true, items }
    } catch (error) {
      console.error('CartRepository Get Error:', error)
      throw new Error('장바구니 목록을 불러오지 못했습니다.')
    }
  }

  /**
   * 장바구니 아이템의 수량을 업데이트합니다.
   */
  static async updateCartItemQuantity(userId: string, cartId: string, quantity: number) {
    try {
      await dbConnect()
      if (quantity < 1) throw new Error('수량은 1개 이상이어야 합니다.')

      const item = await Cart.findOneAndUpdate({ _id: cartId, userId }, { quantity }, { new: true })
      return { success: true, item }
    } catch (error) {
      console.error('CartRepository Update Error:', error)
      throw new Error('수량 변경에 실패했습니다.')
    }
  }

  /**
   * 장바구니에서 특정 아이템을 삭제합니다.
   */
  static async removeCartItem(userId: string, cartId: string) {
    try {
      await dbConnect()
      await Cart.deleteOne({ _id: cartId, userId })
      return { success: true }
    } catch (error) {
      console.error('CartRepository Remove Error:', error)
      throw new Error('장바구니 아이템 삭제에 실패했습니다.')
    }
  }

  /**
   * 사용자의 장바구니 전체를 비웁니다.
   */
  static async clearCart(userId: string) {
    try {
      await dbConnect()
      await Cart.deleteMany({ userId })
      return { success: true }
    } catch (error) {
      console.error('CartRepository Clear Error:', error)
      throw new Error('장바구니 비우기에 실패했습니다.')
    }
  }
}
