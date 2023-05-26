import mongoose from "mongoose";
const Schema = mongoose.Schema

export const PostSchema = new Schema({
    imgURL: {type: String, required: true, maxLength: 500},
    description: {type: String, required: true, MaxLength: 1000},
    tags: {type: String, enum: ['Gaming', 'Graphics', 'Coding', 'Machine Learning', 'Hardware']},
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account'}
},
    {timestamps: true, toJSON: {virtuals: true}})

PostSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
