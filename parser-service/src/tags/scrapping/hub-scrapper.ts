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

    public async getNewPosts(hub: string, lastId: string): Promise<PostImpl[]> {
        try{
        const hubUrl: string = this.urlBuilder.getHubUrl(hub);
        this.logger.log(hubUrl);

        const { data: rowHtml } = await Axios.get(hubUrl);

        const domParser = new JSDOM(rowHtml);
        const body = domParser.window.document.body;

        const postsList = body.querySelector('div.posts_list > ul').childNodes;
        // this.logger.log(posts);

        let posts: PostImpl[] = [];
        
        // get list of posts : document.body.querySelector('.content-list.shortcuts_items');
        // list.childNodes[1].childNodes[1].childNodes[3].textContent.trim()  // to get title of first post
        postsList.forEach((v) => this.logger.log(v.childNodes[0].childNodes[1].childNodes[0].nodeName))
        // this.logger.log(postsList.values);

        // posts.entries.

        return
        }
        catch (e) {
            this.logger.error(e);
        }
    }
}
