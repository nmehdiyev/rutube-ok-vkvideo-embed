import * as URL from "url";
import ePlatformType from "./enum";
import ISize from "./ISize";

const parse = ({ url }: { url: string }): URL.UrlWithParsedQuery => {
  return URL.parse(url, true);
};

const get_id = ({
  url,
  platform,
  regex: { okRegex, rutubeRegex, vkRegex },
}: {
  url: URL.UrlWithParsedQuery;
  platform: ePlatformType;
  regex: { okRegex: RegExp; rutubeRegex: RegExp; vkRegex: RegExp };
}): { id: string; oid?: string } => {
  try {
    if (url.hostname && url.path) {
      switch (platform) {
        case ePlatformType.ok:
          if (url.hostname.indexOf("ok.ru") > -1) {
            const match = url.path.match(okRegex);
            if (match) {
              return { id: match[1] };
            } else {
              throw "Incorrect format";
            }
          }
          break;
        case ePlatformType.rutube:
          if (url.hostname.indexOf("rutube.ru") > -1) {
            const match = url.path.match(rutubeRegex);
            if (match) {
              return { id: match[1] };
            } else {
              throw "Incorrect format";
            }
          }
          break;
        case ePlatformType.vkvideo:
          if (url.hostname.indexOf("vk.com") > -1) {
            const match = url.path.match(vkRegex);
            if (match) {
              return {
                oid: match[1],
                id: match[2],
              };
            } else {
              throw "Incorrect format ";
            }
          }
          break;
        default:
          throw "Hostname or Path is not correct";
      }
    } else {
      throw "Url is not valid";
    }
  } catch (e) {
    console.error(e);
    return { id: "" };
  }
  return { id: "" };
};

const generate_iframe = ({
  ids,
  platform,
  size,
  allow,
  frameborder,
  allowfullscreen,
  only_url,
}: {
  ids: { id?: string; oid?: string };
  platform: ePlatformType;
  size: ISize;
  allow: string;
  frameborder: number;
  allowfullscreen: boolean;
  only_url: boolean;
}): string => {
  const gIframe = (
    size: ISize,
    url: string,
    allow: string,
    frameborder: number,
    allowfullscreen: boolean
  ) =>
    only_url
      ? url
      : `<iframe src="${url}" width="${size.width}" height="${
          size.height
        }" allow="${allow}" frameborder="${frameborder}"${
          allowfullscreen ? " allowfullscreen" : ""
        }/>`;
  var output = "";
  switch (platform) {
    case ePlatformType.ok:
      output = gIframe(
        size,
        `https://ok.ru/videoembed/${ids.id}`,
        allow,
        frameborder,
        allowfullscreen
      );
      break;
    case ePlatformType.rutube:
      output = gIframe(
        size,
        `https://rutube.ru/play/embed/${ids.id}`,
        allow,
        frameborder,
        allowfullscreen
      );
      break;
    case ePlatformType.vkvideo:
      output = gIframe(
        size,
        `https://vk.com/video_ext.php?oid=${ids.oid}&id=${ids.id}`,
        allow,
        frameborder,
        allowfullscreen
      );
      break;
    default:
      break;
  }
  return output;
};

const find_platform = ({
  url,
}: {
  url: URL.UrlWithParsedQuery;
}): ePlatformType | undefined => {
  try {
    if (url.hostname) {
      if (url.hostname.indexOf("ok.ru") > -1) {
        return ePlatformType.ok;
      }
      if (url.hostname.indexOf("rutube.ru") > -1) {
        return ePlatformType.rutube;
      }
      if (url.hostname.indexOf("vk.com") > -1) {
        return ePlatformType.vkvideo;
      }
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
  return undefined;
};
export { parse, get_id, generate_iframe, find_platform };
