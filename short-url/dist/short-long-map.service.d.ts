export declare class ShortLongMapService {
    private entityManager;
    private uniqueCodeService;
    generate(longUrl: string): Promise<string>;
    getLongUrl(code: string): Promise<string>;
}
