import express, { Application, Request, Response } from "express";
import mysql from "mysql";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

type Todo = {
  id: string;
  title: string;
};

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "isseiprogram",
  database: "progate",
  stringifyObjects: true
});

// データ取得関数
const asyncTodosQuery = (): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM `todos`", (error, results, fields) => {
      if (error) {
        console.log(500);
        reject(error);
      }

      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
};

// データ追加関数
const asyncTodosCreate = (todo: Todo): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `insert into todos (title) values ("${todo.title}");`,
      (error, results, fields) => {
        if (error) {
          console.log(500);
          reject(error);
        }

        resolve(console.log(200));
      }
    );
  });
};

// GET
app.get("/", async (req: Request, res: Response<Todo[]>): Promise<void> => {
  const todos = await asyncTodosQuery();

  res.render("./pages/index.ejs", {
    title: "todo aria",
    todos: todos
  });
});

// CREATE
app.post("/create", async (req: Request, res: Response): Promise<void> => {
  const todo: Todo = req.body;
  await asyncTodosCreate(todo);
  res.redirect("/");
});

// DELETE
app.post("/delete/", (req: Request, res: Response): void => {
  // console.log("削除したタスク", req.body);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`dev server running at: http://localhost:${PORT}/`);
});
