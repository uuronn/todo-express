import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [{ title: "title1" }, { title: "title2" }, { title: "title3" }];

app.get("/", (req: Request, res: Response): void => {
  res.render("./pages/index.ejs", {
    title: "todo aria",
    todos: todos
  });
});

app.post("/", (req: Request, res: Response): void => {
  console.log(req.body);
  const todo = req.body;
  todos.push(todo);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`dev server running at: http://localhost:${PORT}/`);
});
