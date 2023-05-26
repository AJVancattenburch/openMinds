import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

export const CommentSchema = new Schema ({

    description: {type: String, required: true, minLength: 3, maxLength: 50},
    commenterId: { type: Schema.Types.ObjectId, required:true, ref: "Account"},
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post'}

}, 
{timestamps: true, toJSON:{virtuals: true } }

)

CommentSchema.virtual('commenter', {
    localField: 'commenterId',
    foreignField: '_id',
    justOne: true, 
    ref: 'Account'
})

CommentSchema.virtual('post', {
    localField:'postId',
    foreignField: '_id',
    justOne: true,
    ref: 'Post'
})