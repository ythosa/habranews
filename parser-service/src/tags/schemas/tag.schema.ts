import * as mongoose from 'mongoose';
import { tagsEnum } from '../enums/tags.enum';

export const TagSchema = new mongoose.Schema({
    tag: { type: String, required: true, enum: Object.values(tagsEnum) },
    postId: { type: String, default: null },
    link: { type: String, default: null },
})

TagSchema.index({ tag: 1 }, { unique: true });
