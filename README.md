# glyphara-icons

A collection of beautiful, weight-adjustable SVG icons.

![npm version](https://img.shields.io/npm/v/glyphara-icons.svg)
![npm downloads](https://img.shields.io/npm/dm/glyphara-icons.svg)
![license](https://img.shields.io/npm/l/glyphara-icons.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue)

---

## ✨ Features

- **🎨 4 Style Weights:** Outline, Fill, Broken, Duotone
- **🌳 Tree-shakable:** Import only what you use
- **🧠 Fully Typed:** TypeScript definitions included
- **⚡ Zero Dependencies:** Lightweight and fast
- **🎯 React 16.8+ Compatible**

---

## 📦 Installation

```bash
npm install glyphara-icons
```

or

```bash
yarn add glyphara-icons
```

---

## 🚀 Quick Start

```tsx
import { Heart, Star, User } from "glyphara-icons";

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

| Prop       | Type                                           | Default          | Description                |
| ---------- | ---------------------------------------------- | ---------------- | -------------------------- |
| `size`     | `number`                                       | `24`             | Width & height of the icon |
| `color`    | `string`                                       | `"currentColor"` | Stroke / fill color        |
| `weight`   | `"fill" \| "broken" \| "outline" \| "duotone"` | `"outline"`      | Icon style variant         |
| `...props` | `SVGProps<SVGSVGElement>`                      | —                | Standard SVG props         |

---

## 🎨 Weight Variants

Each icon includes:

- **Outline** — Clean line style
- **Fill** — Solid filled style
- **Broken** — Stylized stroke design
- **Duotone** — Two-layer tone styling

---

## 🗂 Available Icons

[Icons Preview](https://moamfar.github.io/glyphara-icons/icon-explorer.html)

---

## 📄 License

MIT © 2026 moamfar

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/moamfar">moamfar</a>
</div>
