import dbConnect from './dbConnect'
import Goods from './models/goods'

interface CreateGoodsData {
  name: string
  price: number
  description: string
  imageUrl: string
  stock: number
  category: string
  sellerId: string
}

export class GoodsRepository {
  /**
   * 새 상품(Goods)을 등록합니다.
   */
  static async createGoods(goodsData: CreateGoodsData) {
    try {
      await dbConnect()

      const newGoods = new Goods({
        name: goodsData.name,
        price: goodsData.price,
        description: goodsData.description,
        imageUrl: goodsData.imageUrl,
        stock: goodsData.stock,
        category: goodsData.category,
        sellerId: goodsData.sellerId,
      })

      await newGoods.save()
      return { success: true, goods: newGoods }
    } catch (error) {
      console.error('GoodsRepository Create Error:', error)
      throw new Error('상품 등록 중 오류가 발생했습니다.')
    }
  }

  /**
   * 모든 상품(Goods) 목록을 가져옵니다.
   */
  static async getAllGoods() {
    try {
      await dbConnect()
      const goodsList = await Goods.find({}).sort({ createdAt: -1 })
      return { success: true, goodsList }
    } catch (error) {
      console.error('GoodsRepository Fetch Error:', error)
      throw new Error('상품 정보를 불러오는 중 오류가 발생했습니다.')
    }
  }

  /**
   * 특정 판매자의 상품 목록을 가져옵니다.
   */
  static async getGoodsBySellerId(sellerId: string) {
    try {
      await dbConnect()
      const goodsList = await Goods.find({ sellerId }).sort({ createdAt: -1 })
      return { success: true, goodsList }
    } catch (error) {
      console.error('GoodsRepository Fetch by Seller Error:', error)
      throw new Error('판매자 상품 정보를 불러오는데 실패했습니다.')
    }
  }

  /**
   * 특정 상품(Goods) 정보를 ID로 가져옵니다.
   */
  static async getGoodsById(id: string) {
    try {
      await dbConnect()
      const goods = await Goods.findById(id)
      return { success: true, goods }
    } catch (error) {
      console.error('GoodsRepository Fetch by ID Error:', error)
      throw new Error('상품 정보를 불러오는데 실패했습니다.')
    }
  }

  /**
   * 상품의 재고를 감소시킵니다.
   */
  static async decreaseStock(id: string, amount: number) {
    try {
      await dbConnect()
      const goods = await Goods.findById(id)
      if (!goods) throw new Error('상품을 찾을 수 없습니다.')
      if (goods.stock < amount) throw new Error('재고가 부족합니다.')

      goods.stock -= amount
      await goods.save()
      return { success: true, goods }
    } catch (error) {
      console.error('GoodsRepository Decrease Stock Error:', error)
      throw new Error('재고 수정 중 오류가 발생했습니다.')
    }
  }
}
