# @moamfar/icon-pack

![npm downloads](https://img.shields.io/npm/dm/@moamfar/icon-pack.svg)
![bundle size](https://img.shields.io/bundlephobia/minzip/@moamfar/icon-pack)
![license](https://img.shields.io/npm/l/@moamfar/icon-pack.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)

A collection of beautiful, weight-adjustable SVG icons.

## Features

- **🌳 Tree-shakable:** Only import the icons you use
- **🎨 Customizable:** Control size, color, and weight (Outline/Bold) easily
- **✨ TypeScript:** Built with full type safety support
- **🛠 Framework Agnostic:** Works with React, Next.js, Vite, and CRA
- **⚡ Zero Dependencies:** Lightweight footprint
- **🎯 Perfect for Design Systems:** Consistent and scalable


## Installation

```bash
npm install @moamfar/icon-pack
```

or

```bash
yarn add @moamfar/icon-pack
```

or

```bash
pnpm add @moamfar/icon-pack
```



## Usage

Import the icons you need and use them as React components:

```tsx
import { Dislike, Heart, HeartAngle } from "@moamfar/icon-pack";

function App() {
  return (
    <div>
      <Dislike size={32} color="#333" />
      <Heart size={32} color="blue" weight="bold" />
      <HeartAngle size={48} className="text-red-500" />
    </div>
  );
}
```

For TypeScript users, types are included out of the box.



## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Sets the width and height of the icon |
| `color` | `string` | `"currentColor"` | Sets the fill color |
| `weight` | `"outline" | "bold"` | `"outline"` | Switches between the icon styles |
| `...props` | `SVGAttributes` | `-` | Standard SVG props like `className`, `id`, etc. |


## Available Icons

There are currently **17** icons available:

| Preview | Name | Preview | Name |
|:---:|:---|:---:|:---|
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/Dislike.svg?sanitize=true" width="24" height="24" /> | `Dislike` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/HeartAngle.svg?sanitize=true" width="24" height="24" /> | `HeartAngle` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/HeartAngle.svg?sanitize=true" width="24" height="24" /> | `HeartAngle` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/HeartLock.svg?sanitize=true" width="24" height="24" /> | `HeartLock` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/HeartLock.svg?sanitize=true" width="24" height="24" /> | `HeartLock` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/HeartUnlock.svg?sanitize=true" width="24" height="24" /> | `HeartUnlock` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/HeartUnlock.svg?sanitize=true" width="24" height="24" /> | `HeartUnlock` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/Like.svg?sanitize=true" width="24" height="24" /> | `Like` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/Like.svg?sanitize=true" width="24" height="24" /> | `Like` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/MedalRibbonStar.svg?sanitize=true" width="24" height="24" /> | `MedalRibbonStar` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/MedalRibbonStar.svg?sanitize=true" width="24" height="24" /> | `MedalRibbonStar` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/MedalStar.svg?sanitize=true" width="24" height="24" /> | `MedalStar` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/MedalStar.svg?sanitize=true" width="24" height="24" /> | `MedalStar` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/MedalStarSquare.svg?sanitize=true" width="24" height="24" /> | `MedalStarSquare` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/MedalStarSquare.svg?sanitize=true" width="24" height="24" /> | `MedalStarSquare` | <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/StarShine.svg?sanitize=true" width="24" height="24" /> | `StarShine` |
| <img src="https://raw.githubusercontent.com/moamfar/icon-pack/main/src/raw/outline/StarShine.svg?sanitize=true" width="24" height="24" /> | `StarShine` |  |  |


## Contributing

We welcome contributions! If you'd like to add new icons or improve existing ones:

1. Fork the repository
2. Create a new branch
3. Add your SVG icons to the `src/raw/outline/` directory
4. Run the build script to generate components
5. Submit a pull request

## Development

To build the project locally:

```bash
# Clone the repository
git clone https://github.com/moamfar/icon-pack.git

# Install dependencies
npm install

# Build the project
npm run build

# Generate the README (this file)
npm run generate-readme
```

## Related Projects

- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Heroicons](https://heroicons.com/) - Handcrafted SVG icons

## License

MIT © 2026 moamfar. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/moamfar">moamfar</a>
</div>
