import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostsService {
    
    async getPostById(postId){
        const post = await dbContext.Posts.findById(postId)
        if (!post){
            throw new BadRequest("UNABLE TO FIND POST BY ID")
        }
        return post
    }
    async getPostsByUserId(userId) {
        const posts = await dbContext.Posts.find({ creatorId: userId })
        return posts
    }
    async getAllPosts(query) {
        const posts = await dbContext.Posts.find(query)
        return posts
    }
    async createPost(postData) {
        const newPost = await dbContext.Posts.create(postData)
        return newPost
    }
    async editPost(postData, postId, userId) {
        const originalPost = await this.getPostById(postId)
        if(originalPost.creatorId != userId){
            throw new Forbidden("UNAUTHORIZED EDIT")
        }
        originalPost.description = postData.description || originalPost.description
        originalPost.tags = postData.tags || originalPost.tags
        await originalPost.save()
        return originalPost
    }

    async deletePost(postId, userId) {
        const postDelete = await this.getPostById(postId)
        if(postDelete.creatorId != userId){
            throw new Forbidden("UNAUTHORIZED DELETE")
        }
        await postDelete.remove()
        return
    }
}

export const postsService = new PostsService()