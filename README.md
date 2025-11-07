# @rei/cedar-style-dictionary-config

REI Cedar Style Dictionary configuration package providing reusable transforms, formats, filters, and actions for design token generation. This package streamlines the process of generating design tokens for multiple platforms from a single source.

## Features

- 🎨 Pre-configured platform outputs (Web, iOS, Android, Figma, Documentation)
- 🔧 Custom transforms for size, color, and typography tokens
- 📦 Multiple output formats (CSS, SCSS, Less, JavaScript, JSON, Swift, Kotlin)
- 🔄 Automatic deprecation handling
- 📐 Built-in support for responsive clamp values
- 🎯 Tokens Studio integration
- 🛠️ Utility file injection for SCSS/Less

## Requirements

- Node.js >= 20.0.0
- npm >= 10.0.0
- style-dictionary >= 4.0.0 (peer dependency)

## Installation

```bash
npm install @rei/cedar-style-dictionary-config style-dictionary
```

## Quick Start

```typescript
import StyleDictionary from 'style-dictionary';
import { registerAllExtensions, createConfig } from '@rei/cedar-style-dictionary-config';

// Register all Cedar transforms, formats, filters, and actions
registerAllExtensions(StyleDictionary);

// Create a configuration for your platform
const config = createConfig({
  platform: 'web',
  source: ['tokens/**/*.json5'],
  buildPath: 'dist/',
  platforms: ['scss', 'css', 'js']
});

// Build tokens
const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
```

## API Reference

### `registerAllExtensions(sd, utilityPaths?)`

Registers all Cedar-specific transforms, formats, filters, and actions with Style Dictionary.

**Parameters:**
- `sd`: `StyleDictionary` - Style Dictionary instance
- `utilityPaths?`: `object` - Optional paths to utility files for injection

**Example:**
```typescript
registerAllExtensions(StyleDictionary, {
  scss: {
    'display': './utilities/display.scss',
    'media-queries': './utilities/media-queries.scss',
    'container-queries': './utilities/container-queries.scss',
    'deprecate': './utilities/deprecate.scss'
  },
  less: {
    'display': './utilities/display.less',
    'media-queries': './utilities/media-queries.less',
    'container-queries': './utilities/container-queries.less'
  }
});
```

### `createConfig(options)`

Creates a Style Dictionary configuration object with sensible defaults for Cedar tokens.

**Options:**

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `platform` | `string` | ✅ | - | Target platform (see platforms below) |
| `source` | `string[]` | ✅ | - | Glob patterns for source token files |
| `buildPath` | `string` | ✅ | - | Output directory path |
| `include` | `string[]` | ❌ | `[]` | Additional token files to include |
| `platforms` | `string[]` | ❌ | `['scss', 'less', 'css', 'js']` | Output formats (web platform only) |
| `prefix` | `string` | ❌ | `'cdr'` | Token name prefix |
| `showFileHeader` | `boolean` | ❌ | `false` | Include file generation header |
| `utilities` | `object` | ❌ | - | Utility file paths for SCSS/Less |

**Supported Platforms:**

| Platform | Output Formats | Description |
|----------|----------------|-------------|
| `'web'` | CSS, SCSS, Less, JS | Web tokens with multiple format support |
| `'android'` | XML | Android resource files (colors, dimens, font_dimens) |
| `'ios'` | Swift (.h/.m) | iOS tokens (UIColor, float sizes) |
| `'figma'` | JSON | Figma-compatible token format |
| `'site/global'` | JSON | Global documentation format |
| `'site/web'` | JSON | Web-specific documentation |
| `'site/android'` | JSON | Android-specific documentation |
| `'site/ios'` | JSON | iOS-specific documentation |

**Example (Web with all formats):**
```typescript
const config = createConfig({
  platform: 'web',
  source: ['tokens/**/*.json'],
  buildPath: 'dist/web/',
  platforms: ['scss', 'less', 'css', 'js'],
  prefix: 'cdr',
  showFileHeader: true,
  utilities: {
    scss: {
      'display': './src/utilities/display.scss',
      'media-queries': './src/utilities/media-queries.scss',
      'container-queries': './src/utilities/container-queries.scss',
      'deprecate': './src/utilities/deprecate.scss'
    }
  }
});
```

**Example (iOS):**
```typescript
const config = createConfig({
  platform: 'ios',
  source: ['tokens/**/*.json'],
  buildPath: 'dist/ios/',
  prefix: 'Cdr'
});
// Outputs: CdrColor.h, CdrColor.m, CdrSize.h, CdrSize.m
```

**Example (Android):**
```typescript
const config = createConfig({
  platform: 'android',
  source: ['tokens/**/*.json'],
  buildPath: 'dist/android/res/values/'
});
// Outputs: colors.xml, dimens.xml, font_dimens.xml
```

## Advanced Usage

### Using Individual Config Creators

For more control, you can use individual config creators:

```typescript
import { 
  createScssConfig, 
  createCssConfig,
  registerAllExtensions 
} from '@rei/cedar-style-dictionary-config';

registerAllExtensions(StyleDictionary);

const config = {
  source: ['tokens/**/*.json'],
  platforms: {
    ...createScssConfig('dist/scss/', 'cdr', true),
    ...createCssConfig('dist/css/', 'cdr', true)
  }
};
```

### Using Individual Extensions

You can register only specific transforms, formats, filters, or actions:

```typescript
import { transforms, formats, filters } from '@rei/cedar-style-dictionary-config';

// Register individual extensions
transforms.pxToRemTransitive(StyleDictionary);
transforms.cssClamp(StyleDictionary);
formats.scssMixin(StyleDictionary);
filters.removeSourceTokens(StyleDictionary);
```

## Custom Transforms

This package includes the following custom transforms:

### Size Transforms
- `size/px-to-rem-transitive` - Converts px to rem values
- `size/space` - Applies spacing modifiers to dimension tokens
- `size/space-js` - Spacing modifiers for JavaScript output
- `size/dp-transitive` - Converts to Android dp units
- `size/float` - Converts to iOS float format
- `size/strip-px` - Removes px units (excludes breakpoints and letter-spacing)
- `size/strip-all-px` - Removes all px units
- `size/strip-all-px-js` - Removes px units for JavaScript (excludes Prominence tokens)

### Value Transforms
- `value/clamp` - Generates CSS clamp() functions from clamp tokens

### Attribute Transforms
- `attribute/deprecated` - Marks deprecated tokens with metadata

## Custom Formats

- `scss/mixin` - SCSS mixins and placeholders
- `scss/map` - SCSS maps for utility tokens
- `less/mixin` - Less mixins
- `site` - Documentation JSON format
- `figma` - Figma-compatible token format

## Custom Filters

- `remove-source-tokens` - Filters out source tokens (options, theme)

## Custom Actions

- `concat-files` - Concatenates generated files (excludes `.no_concat` files)
- `include-display-scss` - Injects display utility file
- `include-media-queries-scss` - Injects media queries utility file
- `include-container-queries-scss` - Injects container queries utility file
- `include-deprecate-scss` - Injects deprecation utility file
- `include-display-less` - Injects display utility file (Less)
- `include-media-queries-less` - Injects media queries utility file (Less)
- `include-container-queries-less` - Injects container queries utility file (Less)

## Output Files

### Web Platform
- **SCSS**: `cdr-tokens.scss` (concatenated), `cdr-variable.scss`, `cdr-mixins.scss`, `utility-map.scss`
- **CSS**: `cdr-tokens.css`
- **Less**: `cdr-tokens.less` (concatenated), `cdr-variable.less`, `cdr-mixins.less`
- **JS**: `cdr-tokens.cjs`, `cdr-tokens.mjs`, `cdr-tokens.d.mts`

### iOS Platform
- `CdrColor.h` / `CdrColor.m` - Color tokens
- `CdrSize.h` / `CdrSize.m` - Size tokens

### Android Platform
- `colors.xml` - Color resources
- `dimens.xml` - Dimension resources
- `font_dimens.xml` - Font size resources

### Figma Platform
- `figma.json` - Figma plugin compatible format

### Site Platforms
- `global.json` / `web.json` / `android.json` / `ios.json` - Documentation format

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { 
  CreateConfigOptions, 
  CedarToken, 
  TransformConfig,
  UtilityFilesConfig,
  PlatformConfig 
} from '@rei/cedar-style-dictionary-config';
```

## Utilities

### `BASE_FONT_SIZE`
Default base font size constant (10) used for rem calculations.

### `filterSourceTokensAndType(token, type)`
Helper function to filter tokens by type while excluding source tokens.

## Token Requirements

This package expects tokens to follow the DTCG format with Tokens Studio extensions:

```json
{
  "colors": {
    "primary": {
      "$value": "#ff0000",
      "$type": "color"
    }
  },
  "spacing": {
    "base": {
      "$value": "16px",
      "$type": "dimension"
    }
  }
}
```

## Contributing

Contributions are welcome! Please ensure all changes maintain backward compatibility and include appropriate tests.

## License

ISC

## Support

For issues and questions, please file an issue on the GitHub repository.
