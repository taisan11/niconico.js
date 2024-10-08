import { search } from "./serch.ts";

const aaa = await search({q:["マイクラ","-ゆっくり",["mod","バニラ"]],targets:["title","description","tags"],_sort:"-viewCounter",_limit:1,fields:["contentId","title","tags","description","thumbnailUrl"]});
console.log(aaa);