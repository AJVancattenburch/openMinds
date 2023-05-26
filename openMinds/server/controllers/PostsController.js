import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";

export class PostsController extends BaseController{
    constructor(){
        super('/api/posts')
        this.router
        .get('', this.getAllPosts)
        .get('/:id', this.getPostById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:userId', this.getPostsByUserId)
        .post('', this.createPost)
        .put('/:id', this.editPost)
        .delete('/:id', this.deletePost)
    }
    
    async getAllPosts(req, res, next) {
        try {
            const query = req.query
            const posts = await postsService.getAllPosts(query)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async getPostById(req, res, next) {
        try {
            const postId = req.params.id
            const post = await postsService.getPostById(postId)
            res.send(post)
        } catch (error) {
            next(error)
        }
    }

    async getPostsByUserId(req, res, next) {
        try {
            const userId = req.params.userId
            const posts = await postsService.getPostsByUserId(userId)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }
    async createPost(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const postData = req.body
            const newPost = await postsService.createPost(postData)
            res.send(newPost)
        } catch (error) {
            next(error)
        }
    }

    async editPost(req, res, next){
        try {
            const postData = req.body
            const postId = req.params.id
            const userId = req.userInfo.id
            const editedPost = await postsService.editPost(postData, postId, userId)
            res.send(editedPost)
        } catch (error) {
            next(error)
        }
    }

    async deletePost(req, res, next){
        try {
            const userId = req.userInfo.id
            const postId = req.params.id
            const post = await postsService.deletePost(postId, userId)
            res.send(post)
        } catch (error) {
            next(error)
        }
    }
    
}