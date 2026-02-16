# @moamfar/icon-pack

A collection of beautiful, weight-adjustable SVG icons.

![npm version](https://img.shields.io/npm/v/@moamfar/icon-pack.svg)
![npm downloads](https://img.shields.io/npm/dm/@moamfar/icon-pack.svg)
![license](https://img.shields.io/npm/l/@moamfar/icon-pack.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue)

---

## ✨ Features

- **🎨 5 Style Weights:** Outline, Fill, Broken, Duotone, Line-Duotone
- **🌳 Tree-shakable:** Import only what you use
- **🧠 Fully Typed:** TypeScript definitions included
- **⚡ Zero Dependencies:** Lightweight and fast
- **🎯 React 16.8+ Compatible**

---

## 📦 Installation

```bash
npm install @moamfar/icon-pack
```

or

```bash
yarn add @moamfar/icon-pack
```

---

## 🚀 Quick Start

```tsx
import { Heart, Star, User } from "@moamfar/icon-pack";

function App() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Heart size={32} color="red" weight="broken" />
      <Star size={24} />
      <User size={48} color="#4f46e5" weight="fill" />
    </div>
  );
}
```

---

## 🧩 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Width & height of the icon |
| `color` | `string` | `"currentColor"` | Stroke / fill color |
| `weight` | `"fill" | "broken" | "outline" | "duotone" | "line-duotone"` | `"outline"` | Icon style variant |
| `...props` | `SVGProps<SVGSVGElement>` | — | Standard SVG props |

---

## 🎨 Weight Variants

Each icon includes:

- **Outline** — Clean line style
- **Fill** — Solid filled style
- **Broken** — Stylized stroke design
- **Duotone** — Two-layer tone styling
- **Line-Duotone** — Stroke-based duotone style

---

## 🗂 Available Icons

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

---

## 📄 License

MIT © 2026 moamfar

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/moamfar">moamfar</a>
</div>
