export class UrlBuilder {
    private readonly postBaseURL: string = 'https://habr.com/ru/post/';  
    private readonly hubBaseURL: string = 'https://habr.com/ru/hub/';

    public getHubUrl(hubName: string): string {
        return this.hubBaseURL.concat(hubName);
    }

    public getPostLink(postId): string {
        return this.postBaseURL.concat(postId);        
    }
}
