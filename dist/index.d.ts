import ePlatformType from "./enum";
import ISize from "./ISize";
declare const ROVEmbed: ({ url, platform, size, allow, frameborder, allowfullscreen, only_url, }: {
    url: string;
    platform?: ePlatformType;
    size?: ISize;
    allow?: string;
    frameborder?: number;
    allowfullscreen?: boolean;
    only_url?: boolean;
}) => string | undefined;
export { ROVEmbed as default, ePlatformType };
