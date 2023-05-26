import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService{
   
    
   
    async createComment(commentData) {
        const newComment = await dbContext.Comments.create(commentData)
        return newComment
    }
    async getCommentsByPost(postId) {
        const comments= await dbContext.Comments.find({ postId: postId })
        return comments
    }
    async getCommentById(commentId) {
        const comment= await dbContext.Comments.findById(commentId)
        return comment
    }

    async editComment(commentData, commentId, userId) {
        const originalComment = await this.getCommentById(commentId)
       // @ts-ignore
       if(originalComment.commenterId != userId){
        throw new Forbidden('UNAUTHORIZED TO EDIT COMMENT')
       }
       // @ts-ignore
       originalComment.description = commentData.description || originalComment.description
       // @ts-ignore
       await originalComment.save()
       return originalComment
    }
    // @ts-ignore
    async deleteComments(userId, commentId) {
        const comment = await this.getCommentById(commentId)
        // @ts-ignore
        if(comment.commenterId != userId){
            throw new Forbidden("UNAUTHORIZED TO DELETE THIS COMMENT")
        }
        // @ts-ignore
        await comment.remove()
        return
    }
}

export const commentsService = new CommentsService()

