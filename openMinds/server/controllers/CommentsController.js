
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentsController extends BaseController{
    constructor(){
        super('/api/comments')
        this.router 
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .get('/:id', this.getCommentById)
        .put('/:id', this.editCommentById)
        .delete('/:id', this.deleteComment)
    }
   
   

    async createComment(req,res,next) {
        try {
            const commentData = req.body
            commentData.commenterId = req.userInfo.id
            const newComment = await commentsService.createComment(commentData)
            res.send(newComment)
        } catch (error) {
            next(error)
        }
    }


    async getCommentById(req,res,next) {
       try {
        const commentId= req.params.id
        const comment= await commentsService.getCommentById(commentId)
         res.send(comment)
       } catch (error) {
        next(error)
       }
    }


    async editCommentById(req,res,next){
        try {
            const commentData= req.body
            const commentId= req.params.id
            const userId= req.userInfo.id
            const editedComment= await commentsService.editComment(commentData,commentId,userId)
            res.send(editedComment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req,res,next) {
      try {
        const commentId= req.params.id
        const userId= req.userInfo.id
        await commentsService.deleteComments(userId,commentId)
        res.send(`Comment at ${commentId} was deleted!`)
      } catch (error) {
        next(error)
      }
    }
}