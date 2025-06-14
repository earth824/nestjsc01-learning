// import express, { Application, Router } from 'express';

// // const app = express();

// // app.use('/todos', router)

// // app.listen(6000);

// // access modifier: public(default), private, protected
// // class App {
// // constructor(
// //   private num: number,
// //   private dob: Date
// // ) {} // property private num = 8000

// // private num: number;
// // private dob:Date
// // constructor(num: number,  dob: Date) {
// //   this.num = num;
// //   this.dob = dob
// // }

// // property
// //   protected name = 'Todo App';
// //   // private num = 8000
// //   public age = 50;

// //   // method
// //   getName() {
// //     console.log(this.name);
// //     console.log(this.num);
// //   }
// // }

// // class SubClass extends App {
// //   constructor(numSubClass: number) {
// //     super(numSubClass);
// //   }

// //   getParentName() {
// //     console.log(this.name);
// //     console.log(this.num);
// //     console.log(this.age);
// //   }
// // }

// // const app = new App(6000); // app called instance of a class
// // const sub = new SubClass(8000);
// // // const now = new Date(); // now is instance of class Date
// // // const set = new Set(); // set is instance of class Set
// // console.log(app.name); // 'Todo App'
// // console.log(app.age);
// // console.log(app.num);

// // app.use(cors())
// // app.use(express.json())
// // app.use(morgan('dev'))
// // app.use(rateLimit())
// class App {
//   private app: Application;

//   constructor(private todoRouter: TodoRouter) {
//     this.app = express();
//     this.app.use(express.json());
//     // this.app.use(cors())
//     this.app.use('/todo', this.todoRouter);
//   }

//   listen(port: number) {
//     this.app.listen(port);
//   }
// }

// const app = new App(
//   new TodoRouter(new TodoController(new TodoService(), new UserService()))
// );
// app.listen(6000);

// class TodoRouter {
//   public router: Router;
//   constructor(private todoCOntroller: TodoController) {
//     this.router = express.Router();
//     this.router.get('/get-all', this.todoController.getAll);
//   }
// }

// class TodoController {
//   constructor(
//     private todoService: TodoService,
//     private userService: UserService
//   ) {}

//   getAll(req, res, next) {
//     this.todoService.getAll();
//   }

//   create(req, res, next) {
//     this.todoService.create();
//     this.userService.findById();
//   }
// }

// class TodoService {
//   getAll() {}
//   create() {}
// }

// class UserService {
//   findById() {}
// }
