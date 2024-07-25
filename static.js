const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/shopApp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("エラー", error))

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 10,
  },
  price: {
    type: Number,
    min: [0, "priceは0より大きくないといけません"], //* 第二引数にエラーメッセージ入れられる
  },
  onSale: {
    type: Boolean,
    default: false, //* 指定されなかった時のデフォルト値を設定できる
  },
  categories: [String], //* stringの配列を宣言
  // categories: {
  //   type: [String],
  //   default: ["twitter"]
  // }
  qty: {
    online: {
      type: Number, //* ネストできる
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: Number,
    enum: ["L", "S", "S"], //* 含まれてるかどうか確認できる　含まれてなかったらエラー
  },
})

productSchema.methods.greet = function () {
  //* arrowはお勧めじゃない thisがめんどいから
  console.log("hello")
  console.log("yahoo!")
  console.log(this.name, ":呼んでくれたインスタンス名")
}

productSchema.Schema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale
  return this.save() //* promiseを返す
}

productSchema.Schema.methods.addCategory = function (newCategory) {
  this.categories.push(newCategory)
  return this.save()
}

productSchema.Schema.statics.fireSale = function () {
  //* modelに対して直接 thisがmodelに向いてる
  return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model("Product", productSchema)

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "パンチ" })
  console.log(foundProduct)
  await foundProduct.toggleOnSale() //* 非同期でpromiseだからawaitする
  console.log(foundProduct)
  await foundProduct.addCategory("カテゴリー")
  console.log(foundProduct)
}

// findProduct()

// const bike = new Product({
//   name: "パンチ",
//   price: 1110,
//   onSale: true,
//   categories: ["twitter", "threads", "misskey"],
//   size: "XS", //* これだと無理
// })

// bike
//   .save() //* インスタンスメソッド
//   .then((data) => console.log("保存に成功", data))
//   .catch((err) => console.log("errorがでた", err.errors.name.properties.message))

Product.fireSale().then((message) => console.log(message)) //* 個数とかが返ってくる
