import ePlatformType from "./enum";
import ISize from "./ISize";
import { find_platform, generate_iframe, get_id, parse } from "./func";
const okRegex = /video\/(\d+)/;
const rutubeRegex = /video\/([a-zA-Z0-9]+)/;
const vkRegex = /video(?:\?z=video|)(-?\d+)_(\d+)/;

const ROVEmbed = ({
  url,
  platform,
  size = { width: 300, height: 300 },
  allow = "",
  frameborder = 0,
  allowfullscreen = false,
  only_url = false,
}: {
  url: string;
  platform?: ePlatformType;
  size?: ISize;
  allow?: string;
  frameborder?: number;
  allowfullscreen?: boolean;
  only_url?: boolean;
}): string | undefined => {
  try {
    if (url == undefined) {
      throw "Url required";
    }
    const parsed_url = parse({ url: url });
    platform =
      platform == undefined ? find_platform({ url: parsed_url }) : platform;
    if (platform == undefined) {
      throw "Platform is not recognized";
    }
    const ids = get_id({
      url: parsed_url,
      platform,
      regex: { okRegex, rutubeRegex, vkRegex },
    });
    const iframe = generate_iframe({
      ids: ids,
      platform: platform,
      size: size,
      allow: allow,
      frameborder: frameborder,
      allowfullscreen: allowfullscreen,
      only_url: only_url,
    });
    return iframe;
  } catch (e) {
    return;
  }
};

export { ROVEmbed as default, ePlatformType };
