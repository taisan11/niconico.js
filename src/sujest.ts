export function sujest(UA: string = "niconicojs/1.0.0"):Object {
  return fetch("https://wktk.nicovideo.jp/v2/wakutkool/frames.json?names=nicotop-logo-bg&names=nicotop-1line&names=nicotop-logo-image&names=nicotop-stage-bg&names=nicotop-vision-text&names=nicotop-stage-eventsettings&names=nicotop-stage-add-bottom-title&names=pc-nicotop-liveplayer&names=spweb-nicotop-specialpickup&names=pc-nicotop-event-decoration-background&names=pc-nicotop-event-decoration-banner&names=nicotop-event-decoration-button&names=nicotop-theme&names=nicotop-theme-icon&names=nicotop-event-articles-settings&names=nicotop-event-articles&names=nicotop-event-sponsor-settings&names=nicotop-event-sponsor&names=nicotop-enhanced-settings&names=nicotop-enhanced&names=nicotop-realevent&names=nicotop-ticket&names=spweb-nicotop-enjoy&names=nicotop-recommendnews&names=nicotop-fixed-footer-settings&names=nicotop-fixed-footer&tags=niconico_top&responseType=pc",{
    headers:{
        "X-Frontend-Id":"6",
        "x-frontend-version":"0",
        "User-Agent":UA,
    }
  }).then((res) => res.json())
  .catch((e) => {
    console.error(e);
    throw e;
  });
}