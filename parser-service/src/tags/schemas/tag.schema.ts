import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { tagsEnum } from '../enums/tags.enum';

@Schema()
export class Tag {
    @Prop({
        type: String,
        required: true,
        enum: Object.values(tagsEnum),
        unique: true,
    })
    tag: string;

    @Prop({ type: String, default: null })
    title: string;

    @Prop({ type: Number, default: null })
    postId: number;

    @Prop({ type: String, default: null })
    link: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
export type TagDocument = Tag & Document;
