```markdown
# rutube-ok-vkvideo-embed

**rutube-ok-vkvideo-embed** is a lightweight TypeScript library designed to generate embed codes for videos from VK Video, OK.ru, and Rutube by providing a URL. The library automatically detects the platform from the provided URL and generates the appropriate iframe or direct URL.

## Features

- Automatically detects the platform (VK Video, OK.ru, or Rutube) from the URL.
- Generates an iframe embed code or returns the video URL.
- Provides a `getPlatform` method to identify the platform directly from a URL.
- Configurable iframe size, frameborder, and fullscreen options.

## Installation

Install the package via npm:

```bash
npm install rutube-ok-vkvideo-embed
```

via yarn:

```bash
yarn add rutube-ok-vkvideo-embed
```

## Usage

### Embed Code Generation

First, import the `ROVEmbed` function into your project:

```typescript
import ROVEmbed from 'rutube-ok-vkvideo-embed';
```

Then, use the function by passing in the video URL and any optional parameters:

```typescript
const embedCode = ROVEmbed({
  url: 'https://vk.com/video?z=video-123456_78901234',
  size: { width: 640, height: 360 },
  allowfullscreen: true,
});

console.log(embedCode);
```

### Get Platform from URL

You can also directly determine the platform of a video URL using the `getPlatform` method:

```typescript
import ROVEmbed from 'rutube-ok-vkvideo-embed';

const platform = ROVEmbed.getPlatform('https://vk.com/video?z=video-123456_78901234');
console.log(platform);  // Outputs: 'vkvideo'
```

### Parameters

- `url` (string, required): The URL of the video.
- `platform` (ePlatformType, optional): The platform type (`vkvideo`, `rutube`, or `ok`). If not provided, the platform will be detected automatically.
- `size` (ISize, optional): An object specifying the width and height of the iframe. Defaults to `{ width: 300, height: 300 }`.
- `allow` (string, optional): The value for the `allow` attribute of the iframe. Defaults to an empty string.
- `frameborder` (number, optional): The value for the `frameborder` attribute of the iframe. Defaults to `0`.
- `allowfullscreen` (boolean, optional): A flag to allow fullscreen in the iframe. Defaults to `false`.
- `only_url` (boolean, optional): If `true`, returns only the video URL instead of an iframe. Defaults to `false`.

### Return Value

- **ROVEmbed**: Returns the embed code as a string, or `undefined` if an error occurs.
- **ROVEmbed.getPlatform**: Returns the platform as a string (`'vkvideo'`, `'rutube'`, or `'ok'`).

## Example

```typescript
import ROVEmbed from 'rutube-ok-vkvideo-embed';
import ePlatformType from './enum';

const embedCode = ROVEmbed({
  url: 'https://ok.ru/video/1234567890123',
  platform: ePlatformType.ok,
  size: { width: 640, height: 360 },
  allow: 'autoplay; encrypted-media',
  frameborder: 0,
  allowfullscreen: true,
});

console.log(embedCode);  // Outputs the iframe embed code or URL

const platform = ROVEmbed.getPlatform('https://vk.com/video?z=video-123456_78901234');
console.log(platform);  // Outputs: 'vkvideo'
```

## Enum: ePlatformType

The `ePlatformType` enum defines the three supported platforms:

- `vkvideo`
- `rutube`
- `ok`

## Interface: ISize

The `ISize` interface defines the structure for the `size` parameter:

```typescript
interface ISize {
  width: number;
  height: number;
}
```

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=nmehdiyev&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/nmehdiyev)

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.