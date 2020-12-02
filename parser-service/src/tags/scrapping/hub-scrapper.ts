import { Logger } from "@nestjs/common";
import Axios from "axios";
import { PostImpl } from "../interfaces/post.interface";
import { UrlBuilder } from "./url-builder";
import { JSDOM } from 'jsdom';

export class HubScrapper {
    private readonly logger = new Logger(HubScrapper.name);
    private readonly urlBuilder: UrlBuilder;

    constructor() {
        this.urlBuilder = new UrlBuilder();
    }

    private getTitleOfPost(post): string {
        return post.childNodes[1].childNodes[3].childNodes[1].textContent
    }

    private getPostId(post): number {
        return post.id.split('_')[1];
    }

    private isPost(post): boolean {
        return post.id.match(/post_\d+/)
    }

    public async getAllPosts(hubURL: string): Promise<PostImpl[]> {
        const { data: rowHtml } = await Axios.get(hubUrl);
        const domParser = new JSDOM(rowHtml);
        const body = domParser.window.document.body;

        const posts = body.querySelectorAll('.content-list__item.content-list__item_post.shortcuts_item')
        const parsedPosts: PostImpl[] = [];
        posts.forEach((p) => { 
            if (this.isPost(p)) {
                const postId = this.getPostId(p)
                parsedPosts.push({
                    title: this.getTitleOfPost(p),
                    postId: postId,
                    link: this.urlBuilder.getPostLink(postId),
                })
                console.log(parsedPosts[parsedPosts.length - 1])
            } 
        })

        return parsedPosts
    }

    public async getNewPosts(hub: string, lastId: string): Promise<PostImpl[]> {
        const hubUrl: string = this.urlBuilder.getHubUrl(hub);
        const allPosts: PostImpl[] = await this.getAllPosts(hubUrl)

        // const lastPost = 

        // allPosts.filter(())

        return
    }
}
