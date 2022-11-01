const express = require("express");
const app = express();

app.get("/", function (req: any, res: any) {
  res.render("./pages/index.ejs", { title: "index title" });
});

console.log("http://localhost:" + app.listen(3000).address().port);
