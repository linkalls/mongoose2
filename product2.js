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
    min: 0
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
})

const Product = mongoose.model("Product", productSchema)

const bike = new Product({
  name: "パンチ",
  price: 1110,
  onSale: true,
  categories: ["twitter", "threads", "misskey"],
})

bike
  .save()
  .then((data) => console.log("保存に成功", data))
  .catch((err) => console.log("errorがでた", err.errors.name.properties.message))

//* 更新時はvalidationが関係なくなるから自分で書く必要がある

// product.findOneAndUpdate({ name: "パンチ" }, { price: 110 }, { new: true, runValidators: true }) //* こんな感じ
// .then(data=>console.log(data))
// .catch(e=>console.log(e))
