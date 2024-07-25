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
    required: true, //* これはなきゃいけない
  },
  price: {
    type: Number,
  },
})

const Product = mongoose.model("Product", productSchema)

const bike = new Product({
  name: "パンチ", //* これはrequired
  price: 1110, //* これはなくてもいい
  // color: "red"  //* 関係ないもの入れたら無視される
})

//* shopApp> db.products.find()
// [
//   {
//     _id: ObjectId('66a259591b6da03ae0380e8f'),
//     name: 'パンチ',
//     price: 1110,
//     __v: 0
//   }
// ]
// shopApp>

bike
  .save()
  .then((data) => console.log("保存に成功", data))
  .catch((err) => console.log("errorがでた", err.errors.name.properties.message))

//* nameがないとき
// errorがでた Error: Product validation failed: name: Path `name` is required.
//     at ValidationError.inspect (C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\error\validation.js:48:26)
//     at formatValue (node:internal/util/inspect:805:19)
//     at inspect (node:internal/util/inspect:364:10)
//     at formatWithOptionsInternal (node:internal/util/inspect:2298:40)
//     at formatWithOptions (node:internal/util/inspect:2160:10)
//     at console.value (node:internal/console/constructor:342:14)
//     at console.log (node:internal/console/constructor:379:61)
//     at C:\Users\nao03\Downloads\mongoose\product.js:29:27
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
//   errors: { //* このなか err.errorsのなかにありそう
//     name: ValidatorError: Path `name` is required. //* ここにエラー内容あったからerr.errors.nameで呼べる
//         at validate (C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\schematype.js:1270:13)
//         at C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\schematype.js:1253:7
//         at Array.forEach (<anonymous>)
//         at SchemaType.doValidate (C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\schematype.js:1198:14)
//         at C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\document.js:2573:18
//         at process.processTicksAndRejections (node:internal/process/task_queues:77:11) {
//       properties: [Object],
//       kind: 'required',
//       path: 'name',
//       value: undefined,
//       reason: undefined,
//       [Symbol(mongoose:validatorError)]: true
//     }
//   },
//   _message: 'Product validation failed'
// }

//* err.errors.name内は
// errorがでた ValidatorError: Path `name` is required.
//     at validate (C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\schematype.js:1270:13)
//     at C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\schematype.js:1253:7
//     at Array.forEach (<anonymous>)
//     at SchemaType.doValidate (C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\schematype.js:1198:14)
//     at C:\Users\nao03\Downloads\mongoose\node_modules\mongoose\lib\document.js:2573:18
//     at process.processTicksAndRejections (node:internal/process/task_queues:77:11) {
//   properties: { //* ここにありそう　err.errors.name.properties
//     validator: [Function (anonymous)],
//     message: 'Path `name` is required.', //* ここにあった err.errors.name.properties.message
//     type: 'required',
//     path: 'name',
//     value: undefined
//   },
//   kind: 'required',
//   path: 'name',
//   value: undefined,
//   reason: undefined,
//   [Symbol(mongoose:validatorError)]: true
// }
// 接続ok


//* shopApp> show dbs
// admin     40.00 KiB
// config   108.00 KiB
// local     40.00 KiB
// shopApp   40.00 KiB
// test      72.00 KiB
// shopApp>