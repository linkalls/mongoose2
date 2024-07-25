const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/shopApp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("エラー", error))

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
})

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`
}) //* ほしいプロパティ名を定義

// personSchema.virtual().set(function({})) //* こっちはdbに入れる

const Person = new mongoose.model("Person",personSchema) //* personの複数形はpeople
//* show collections

// yamada.save()

// > const yamada = new Person({first: "taro",last: "yamada"})
// undefined
// > yamada
// { _id: 66a278d970c91e42c888d4e6, first: 'taro', last: 'yamada' }
// > yamada.fullName //* dbには保存されてない
// 'taro yamada'
