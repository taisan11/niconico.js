import {withQuery,type QueryValue} from "ufo"

interface SerchQuery {
  q: string | string[] | (string | string[])[];  // 文字列または文字列の配列または文字列の配列の配列
  targets: ("title" | "tags" | "description")[];  // 文字列の配列
  fields?: ("contentId" | "title" | "tags" | "description")[];  // 省略可能な文字列の配列
  filters?: string;
  jsonFilter?: QueryValue;  // Object から Record<string, any> に変更
  _sort: string;
  _limit?: number;
  _offset?: number;
  _context?: string;
  [key: string]: any;  // Index signature to allow additional properties
}


export function serch(query: SerchQuery, UA: string = "niconicojs/1.0.0"): Promise<any> {
  // 配列の場合
    if (Array.isArray(query.q)) {
        query.q = query.q.map(item => {
            if (Array.isArray(item)) {
                return item.map(str => `"${str}"`).join(" OR ");
            } else {
                return item.includes(" ") ? `"${item}"` : item;
            }
        }).join(" ");
    }
  return fetch(withQuery("https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search", { ...query, targets: query.targets.join(","), fields: query.fields?.join(",") }), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": UA,
    },
  })
  .then((res) => res.json())
  .catch((e) => {
    console.error(e);
    throw e;
  });
}
export function serch_deta_version() {
    fetch("https://snapshot.search.nicovideo.jp/api/v2/snapshot/version",{

    })
}