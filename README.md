# @moamfar/icon-pack

A collection of beautiful, weight-adjustable SVG icons.

![npm version](https://img.shields.io/npm/v/@moamfar/icon-pack.svg)
![npm downloads](https://img.shields.io/npm/dm/@moamfar/icon-pack.svg)
![license](https://img.shields.io/npm/l/@moamfar/icon-pack.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue)

## Features

- **🎨 6 Different Weights:** Fill, Broken and Outline
- **🌳 Tree-shakable:** Import only what you use
- **✨ TypeScript Ready:** Full type definitions included
- **⚡ Zero Dependencies:** Lightweight and fast
- **🎯 React 16.8+ Compatible:** Works with all modern React versions

## Installation

```bash
npm install @moamfar/icon-pack
```

or

```bash
yarn add @moamfar/icon-pack
```

## Quick Start

```tsx
import { Heart, Star, User } from "@moamfar/icon-pack";

function App() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Heart size={32} color="red" weight="broken" />
      <Star size={24} color="gold" />
      <User size={48} color="#4f46e5" weight="fill" />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Icon width and height |
| `color` | `string` | `"currentColor"` | Fill color |
| `weight` | `string` | `"outline"` | Style variant (fill, broken, outline, etc.) |
| `...props` | `SVGProps` | - | Standard SVG attributes |

## Available Icons

There are **1246** icons available:

| Icon | Name | Icon | Name |
|------|------|------|------|
| `Accessibility` | Accessibility | `Accumulator` | Accumulator |
| `AddCircle` | AddCircle | `AddFolder` | AddFolder |
| `AddSquare` | AddSquare | `AdhesivePlaster` | AdhesivePlaster |
| `AdhesivePlaster2` | AdhesivePlaster2 | `Airbuds` | Airbuds |
| `AirbudsCase` | AirbudsCase | `AirbudsCaseCharge` | AirbudsCaseCharge |
| `AirbudsCaseMinimalistic` | AirbudsCaseMinimalistic | `AirbudsCaseOpen` | AirbudsCaseOpen |
| `AirbudsCharge` | AirbudsCharge | `AirbudsCheck` | AirbudsCheck |
| `AirbudsLeft` | AirbudsLeft | `AirbudsRemove` | AirbudsRemove |
| `AirbudsRight` | AirbudsRight | `Alarm` | Alarm |
| `AlarmAdd` | AlarmAdd | `AlarmPause` | AlarmPause |

**... and 1226 more icons**


[View all 1246 icons →](https://github.com/moamfar/icon-pack)

## Weight Variants

Each icon comes in multiple styles:

- **Outline** - Thin line icons
- **Fill** - Thick filled icons  
- **Broken** - Dashed/stroke icons

## License

MIT © 2026 moamfar

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/moamfar">moamfar</a>
</div>
