const express = require("express");
const app = express();
const port = 3000;
/*
mongodb+srv://lyj:<password>@cluster0.tbsud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/
const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 형식의 데이터를 다루기 위해...
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형식의 데이터를 다루기 위해...
app.use(bodyParser.json());

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB connected!"))
  .catch((err) => console.log(err));

// 라우터 만들기
app.get("/", (req, res) => {
  res.send("Hello World!~ happy new year");
});

// 라우터 만들기 (회원가입을 위한..)
// POST 요청, endpoint는 /register
app.post("/register", (request, response) => {
  // 클라이언트에서 가져온 정보를 디비에 넣는다
  const user = new User(request.body);

  user.save((err, userInfo) => {
    if (err) return response.json({ success: false, err });

    return response.status(200).json({ success: true });
  });
});

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
