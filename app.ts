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
  database: "progate"
});

// データ取得関数
const asyncTodosQuery = (): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `todos` order by title asc",
      (error, results, fields) => {
        try {
          resolve(JSON.parse(JSON.stringify(results)));
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// データ追加関数
const asyncTodosCreate = (todo: Todo): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: `insert into todos (title) values (?)`,
        values: [todo.title]
      },
      (error, results, fields) => {
        try {
          resolve(results);
        } catch (error) {
          reject(error);
        }
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

  try {
    await asyncTodosCreate(todo);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// DELETE
app.post("/delete/", (req: Request, res: Response): void => {
  // console.log("削除したタスク", req.body);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`dev server running at: http://localhost:${PORT}/`);
});
