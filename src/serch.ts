import { withQuery, type QueryValue } from "ufo";

// フィールドに対応するデータ型
interface SearchResult {
  contentId: string;
  title: string;
  tags?: string;//空白スペース区切り
  description?: string;
  userId?: string;
  channelId?: string;
  viewCounter?: number;
  mylistCounter?: number;
  likeCounter?: number;
  lengthSeconds?: number;
  thumbnailUrl?: string;
  startTime?: string;
  lastResBody?: string;
  commentCounter?: number;
  lastCommentTime?: string;
  categoryTags?: string[];
  genre?: string;
}

// APIのmeta部分の型
interface SearchMeta {
  status: number;
  totalCount: number;
  id: string;
}

// フィールドのリストに基づいて型を生成
type PickFields<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 戻り値全体の型
interface SearchResponse<K extends keyof SearchResult> {
  meta: SearchMeta;
  data: PickFields<SearchResult, K>[];
}

interface SerchQuery {
  q: string | string[] | (string | string[])[]; // 文字列または文字列の配列または文字列の配列の配列
  targets: ("title" | "tags" | "description")[]; // 文字列の配列
  fields?: (keyof SearchResult)[]; // フィールドリストをSearchResultに対応
  filters?: string;
  jsonFilter?: QueryValue; // Object から Record<string, any> に変更
  _sort: string;
  _limit?: number;
  _offset?: number;
  _context?: string;
  [key: string]: any; // Index signature to allow additional properties
}

export function search<K extends keyof SearchResult>(
  query: SerchQuery & { fields: K[] },
  UA: string = "niconicojs/1.0.0"
): Promise<SearchResponse<K>> {
  // 配列の場合
  if (Array.isArray(query.q)) {
    query.q = query.q
      .map((item) => {
        if (Array.isArray(item)) {
          return item.map((str) => `"${str}"`).join(" OR ");
        } else {
          return item.includes(" ") ? `"${item}"` : item;
        }
      })
      .join(" ");
  }

  return fetch(
    withQuery(
      "https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search",
      { ...query, targets: query.targets.join(","), fields: query.fields?.join(",") }
    ),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": UA,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data as SearchResponse<K>) // 動的な型にキャスト
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
export function serch_deta_version() {
    fetch("https://snapshot.search.nicovideo.jp/api/v2/snapshot/version",{

    })
}