import { AboutController } from "./controllers/AboutController.js";
// import { HomeController } from "./controllers/HomeController.js";
import { PostsController } from "./controllers/PostsController.js";
import { AboutView } from "./views/AboutView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  // {
  //   path: '',
  //   controller: HomeController,
  //   view: /*html*/`
  //   <div class="card">
  //     <div class="card-body">
  //       <p>Home Page</p>
  //       <button class="btn btn-dark" onclick="app.HomeController.testButton()">😎</button>
  //     </div>
  //   </div>
  //   `
  // },
  {
    path: '',
    controller: [AboutController, PostsController],
    view: AboutView
  }
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */