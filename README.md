# niconico.js
A simple niconico API wrapper
## install
```bash
# deno
deno add jsr:@taisan11/niconicojs
# bun
bunx jsr add @taisan11/niconicojs
# npm
npx jsr add @taisan11/niconicojs
# pnpm
pnpm dlx jsr add @taisan11/niconicojs
```
## how to use
```ts
import { serch } from "@taisan11/niconicojs";

console.log(await serch({q:["マイクラ","-ゆっくり",["mod","バニラ"]],targets:["title","description","tags"],_sort:"-viewCounter",_limit:1,fields:["contentId","title","tags","description"]}))
```