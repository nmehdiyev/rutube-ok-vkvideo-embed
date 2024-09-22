"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find_platform = exports.generate_iframe = exports.get_id = exports.parse = void 0;
const URL = __importStar(require("url"));
const enum_1 = __importDefault(require("./enum"));
const parse = ({ url }) => {
    return URL.parse(url, true);
};
exports.parse = parse;
const get_id = ({ url, platform, regex: { okRegex, rutubeRegex, vkRegex }, }) => {
    try {
        if (url.hostname && url.path) {
            switch (platform) {
                case enum_1.default.ok:
                    if (url.hostname.indexOf("ok.ru") > -1) {
                        const match = url.path.match(okRegex);
                        if (match) {
                            if (match[1] == undefined || match[1] == "") {
                                throw "Ok.ru detected, but incorrect format";
                            }
                            return { id: match[1] };
                        }
                        else {
                            throw "Ok.ru detected, but incorrect format";
                        }
                    }
                    break;
                case enum_1.default.rutube:
                    if (url.hostname.indexOf("rutube.ru") > -1) {
                        const match = url.path.match(rutubeRegex);
                        if (match) {
                            if (match[1] == undefined || match[1] == "") {
                                throw "Rutube detected, but incorrect format";
                            }
                            return { id: match[1] };
                        }
                        else {
                            throw "Rutube detected, but incorrect format";
                        }
                    }
                    break;
                case enum_1.default.vkvideo:
                    if (url.hostname.indexOf("vk.com") > -1) {
                        const match = url.path.match(vkRegex);
                        if (match) {
                            if (match[1] == undefined ||
                                match[2] == undefined ||
                                match[1] == "" ||
                                match[2] == "") {
                                throw "VK detected, but incorrect format";
                            }
                            return {
                                oid: match[1],
                                id: match[2],
                            };
                        }
                        else {
                            throw "VK detected, but incorrect format";
                        }
                    }
                    break;
                default:
                    throw "Hostname or Path is not correct";
            }
        }
        else {
            throw "Url is not valid";
        }
    }
    catch (e) {
        console.info(e);
        return { id: "" };
    }
    return { id: "" };
};
exports.get_id = get_id;
const generate_iframe = ({ ids, platform, size, allow, frameborder, allowfullscreen, only_url, }) => {
    const gIframe = (size, url, allow, frameborder, allowfullscreen) => only_url
        ? url
        : `<iframe src="${url}" width="${size.width}" height="${size.height}" allow="${allow}" frameborder="${frameborder}"${allowfullscreen ? " allowfullscreen" : ""}/>`;
    var output = "";
    switch (platform) {
        case enum_1.default.ok:
            output = gIframe(size, `https://ok.ru/videoembed/${ids.id}`, allow, frameborder, allowfullscreen);
            break;
        case enum_1.default.rutube:
            output = gIframe(size, `https://rutube.ru/play/embed/${ids.id}`, allow, frameborder, allowfullscreen);
            break;
        case enum_1.default.vkvideo:
            output = gIframe(size, `https://vk.com/video_ext.php?oid=${ids.oid}&id=${ids.id}`, allow, frameborder, allowfullscreen);
            break;
        default:
            break;
    }
    return output;
};
exports.generate_iframe = generate_iframe;
const find_platform = ({ url, }) => {
    try {
        if (url.hostname) {
            if (url.hostname.indexOf("ok.ru") > -1) {
                return enum_1.default.ok;
            }
            if (url.hostname.indexOf("rutube.ru") > -1) {
                return enum_1.default.rutube;
            }
            if (url.hostname.indexOf("vk.com") > -1) {
                return enum_1.default.vkvideo;
            }
        }
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
    return undefined;
};
exports.find_platform = find_platform;
