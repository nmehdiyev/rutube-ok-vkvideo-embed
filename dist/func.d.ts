import * as URL from "url";
import ePlatformType from "./enum";
import ISize from "./ISize";
declare const parse: ({ url }: {
    url: string;
}) => URL.UrlWithParsedQuery;
declare const get_id: ({ url, platform, regex: { okRegex, rutubeRegex, vkRegex }, }: {
    url: URL.UrlWithParsedQuery;
    platform: ePlatformType;
    regex: {
        okRegex: RegExp;
        rutubeRegex: RegExp;
        vkRegex: RegExp;
    };
}) => {
    id: string;
    oid?: string;
};
declare const generate_iframe: ({ ids, platform, size, allow, frameborder, allowfullscreen, only_url, }: {
    ids: {
        id?: string;
        oid?: string;
    };
    platform: ePlatformType;
    size: ISize;
    allow: string;
    frameborder: number;
    allowfullscreen: boolean;
    only_url: boolean;
}) => string;
declare const find_platform: ({ url, }: {
    url: URL.UrlWithParsedQuery;
}) => ePlatformType | undefined;
export { parse, get_id, generate_iframe, find_platform };
