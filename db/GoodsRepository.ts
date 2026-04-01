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
}
