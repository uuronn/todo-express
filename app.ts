const express = require("express");
const app = express();

app.get("/", function (req: any, res: any) {
  res.render("./pages/index.ejs", {
    title: "todo aria",
    todos: [{ title: "title1" }, { title: "title2" }, { title: "title3" }]
  });
});

console.log("http://localhost:" + app.listen(3000).address().port);
