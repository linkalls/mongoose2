const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("接続ok")
  })
  .catch((error) => console.log("エラー", error))


const movieSchema = new mongoose.Schema({
  //* schemaっていうのは型指定 mongodbにはこの概念ない
  title: String,
  year: Number,
  score: Number,
})

const Movie = mongoose.model("Movie", movieSchema) //* Movieっていうのが重要で一文字目大文字で単数形
//* class名はいとも一文字目大文字

// const twitter = new Movie({ title: "twitter", year: 2024, score: 100 }) //* _idが勝手に作られる dbにはまだ入らない

twitter.save() //* これでセーブできる railsと一緒

// twitter.score = 1
// twitter.update()

// Movie.insertMany(
//   [
//     //* これ時間かかる promise返ってくる　やる時点で実行される
//     { title: "数分間のエールを", year: 2024, score: 9.9 },
//     { title: "おはなばたけ", year: 2024, score: 1 },
//     { title: "ちいかわ", year: 2024, score: 4 },
//   ] //* これオブジェクトを配列で囲む
// )
//   .then((data) => {
//     console.log("成功")
//     console.log(data)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

//* mongoshで呼ぶときは複数形で
//* db.movie.find()じゃなくて  db.movies.find()

//* Movie.find({year: {$gte: 2024}}).then((data)=>{console.log(data)})
//* Movie.findById("66a215af1f51c20cf4660347").then(m=>console.log(m))

// > Movie.updateOne({title: "twitter"},{score: 1}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 1264,
//   [Symbol(trigger_async_id_symbol)]: 1262
// }
// > { n: 1, nModified: 1, ok: 1 }

// Movie.updateMany({title: {$in: ["twitter","ちいかわ"]}},{score: 1}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 1478,
//   [Symbol(trigger_async_id_symbol)]: 1476
// }
// > { n: 11, nModified: 3, ok: 1 }

// > Movie.findOneAndUpdate({title: "ちいかわ"},{title: "ちんかわ"}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 1988,
//   [Symbol(trigger_async_id_symbol)]: 1986
// }
// > (node:17460) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false
//  are deprecated. See: https://mongoosejs.com/docs/5.x/docs/deprecations.html#findandmodify
// (Use `node --trace-deprecation ...` to show where the warning was created)
// {
//   _id: 66a2169856e9ca24e8679d3f,
//   title: 'ちいかわ',
//   year: 2024,
//   score: 11,
//   __v: 0
// }
// > Movie.findOneAndUpdate({title: "ちんかわ"},{title: "ちいかわ"},{new: true}).then(m=>console.log(m)) //* option new:trueで新しくしたものをやる
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 2148,
//   [Symbol(trigger_async_id_symbol)]: 2146
// }
// > {
//   _id: 66a2169856e9ca24e8679d3f,
//   title: 'ちいかわ',
//   year: 2024,
//   score: 11,
//   __v: 0
// }


// > Movie.deleteOne({title: "ちいかわ"}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 414,
//   [Symbol(trigger_async_id_symbol)]: 412
// }
// > { n: 1, ok: 1, deletedCount: 1 }

// > Movie.deleteMany({title: "ちいかわ"}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 503,
//   [Symbol(trigger_async_id_symbol)]: 501
// }
// > { n: 2, ok: 1, deletedCount: 2 }

// > Movie.deleteMany({title: "数分間のエールを"}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 568,
//   [Symbol(trigger_async_id_symbol)]: 566
// }
// > { n: 8, ok: 1, deletedCount: 8 }


// > Movie.findOneAndDelete({title: "twitter"}).then(m=>console.log(m))
// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 754,
//   [Symbol(trigger_async_id_symbol)]: 752
// }
// > {
//   _id: 66a215af1f51c20cf4660347,
//   title: 'twitter',
//   year: 2024,
//   score: 11,
//   __v: 0
// }
