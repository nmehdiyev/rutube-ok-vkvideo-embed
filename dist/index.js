"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ePlatformType = exports.default = void 0;
const enum_1 = __importDefault(require("./enum"));
exports.ePlatformType = enum_1.default;
const func_1 = require("./func");
const okRegex = /video\/(\d+)/;
const rutubeRegex = /video\/([a-zA-Z0-9]+)/;
const vkRegex = /video(?:\?z=video|)(-?\d+)_(\d+)/;
const ROVEmbed = ({ url, platform, size = { width: 300, height: 300 }, allow = "", frameborder = 0, allowfullscreen = false, only_url = false, }) => {
    try {
        if (url == undefined) {
            throw "Url required";
        }
        const parsed_url = (0, func_1.parse)({ url: url });
        platform =
            platform == undefined ? (0, func_1.find_platform)({ url: parsed_url }) : platform;
        if (platform == undefined) {
            throw "Platform is not recognized";
        }
        const ids = (0, func_1.get_id)({
            url: parsed_url,
            platform,
            regex: { okRegex, rutubeRegex, vkRegex },
        });
        const iframe = (0, func_1.generate_iframe)({
            ids: ids,
            platform: platform,
            size: size,
            allow: allow,
            frameborder: frameborder,
            allowfullscreen: allowfullscreen,
            only_url: only_url,
        });
        return iframe;
    }
    catch (e) {
        console.error(e);
        return;
    }
};
exports.default = ROVEmbed;
