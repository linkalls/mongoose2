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

personSchema.pre("save", async function () {
  //* saveが呼ばれる直前に実行するから上書きもできる
  this.first = "hoge"
  this.last = "moge"
  console.log("いまから保存するで")
})

personSchema.post("save", async function () {
  //* postは終わった後
  console.log("保存したよ")
})

const Person = new mongoose.model("Person", personSchema) //* personの複数形はpeople
//* show collections
