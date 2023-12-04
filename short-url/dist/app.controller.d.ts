import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private shortLongMapService;
    getHello(): string;
    generateShortUrl(longUrl: any): Promise<string>;
    jump(code: any): Promise<{
        url: string;
        statusCode: number;
    }>;
}
