import mongoose from 'mongoose'

const GoodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    stock: { type: Number, default: 0 }, // 물량
    category: { type: String, default: '기타' },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    collection: 'goods', // 사용자가 언급한 Goods 컬렉션 명시
  }
)

const Goods = mongoose.models.Goods || mongoose.model('Goods', GoodsSchema)

export default Goods
