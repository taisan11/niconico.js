import { serch } from "./serch.ts";

console.log(await serch({q:["マイクラ","-ゆっくり",["mod","バニラ"]],targets:["title","description","tags"],_sort:"-viewCounter",_limit:1,fields:["contentId","title","tags","description"]}))