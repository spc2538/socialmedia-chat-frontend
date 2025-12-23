# socialmedia chat frontend

```bash
npm create vite@latest socialmedia-chat-frontend -- --template react-ts
npm install -D tailwindcss @tailwindcss/vite
npm install react-router-dom
npm install socket.io-client
```

- `vite.config.js`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

- `src/index.css`

```css
@import "tailwindcss";
```