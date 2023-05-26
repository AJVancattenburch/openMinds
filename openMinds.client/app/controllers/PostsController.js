import { Pop } from "../utils/Pop.js"
import { postsService } from '../services/PostsService.js'
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js"
import { setHTML, setText } from './../utils/Writer.js';


function _drawPosts(){
  setText('opUsername', "Hello")
  setText('postDescription', 'Post Controller')
}
export class PostsController {
  constructor() {
    console.log('posts controller confirm')
    this.getPosts()
    AppState.on('posts', _drawPosts)
    _drawPosts()
    // this.getPosts()
  }


  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      Pop.error(error)
    }
  }






















}