const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

// 글 DB
let posts = [];
//파일 읽기
const reafile = fs.readFileSync("postDB.json", "utf-8");
//오브젝트 코드로 변환
const jsonData = JSON.parse(reafile);
posts = [...jsonData];

//post 요청시 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ejs를 view 엔진으로 설정
app.set("view engine", "ejs");

// 정적파일 경로 지정
app.use(express.static("public"));

// home
app.get("/", function (요청, 응답) {
  응답.render("pages/index.ejs", { posts });
});

// about
app.get("/about", function (req, res) {
  res.render("pages/about.ejs");
});
//create
app.post("/create", function (req, res) {
  const post = req.body.post;
  //DB에 글저장
  posts.push(post); //posts 배열에 글 추가
  fs.writeFileSync("postDB.json", JSON.stringify(posts));
  console.log(posts);

  //홈 (게시판)으로 이동
  res.redirect("/");
});

const port = 3002;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
