import { PostImpl } from './post.interface';

export interface NotificationMessageImpl {
    tag: string;
    posts: PostImpl[];
}
