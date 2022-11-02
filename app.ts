import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type Todo = {
  title: string;
};

let todos = [
  { title: "titlffdf" },
  { title: "titleaaa" },
  { title: "titlfffe" }
];

// GET
app.get("/", (req: Request, res: Response<Todo[]>): void => {
  res.render("./pages/index.ejs", {
    title: "todo aria",
    todos: todos
    // ↑型ついてるのかな？？
  });
});

// CREATE
app.post("/create", (req: Request, res: Response): void => {
  console.log("追加したタスク", req.body);
  const todo = req.body;
  todos.push(todo);
  res.redirect("/");
});

// DELETE
app.post("/delete/", (req: Request, res: Response): void => {
  console.log("削除したタスク", req.body);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`dev server running at: http://localhost:${PORT}/`);
});
