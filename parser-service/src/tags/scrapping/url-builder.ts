export class UrlBuilder {
    private readonly baseUrl: string = 'https://habr.com/ru/hub/';

    getHubUrl(hubName: string): string {
        return this.baseUrl + hubName;
    }
}
