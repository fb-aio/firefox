(()=>{var he=Object.defineProperty,K=(t,o)=>()=>(t&&(o=t(t=0)),o),J=(t,o)=>{for(var r in o)he(t,r,{get:o[r],enumerable:!0})},X={};J(X,{hookFetch:()=>ge,hookWS:()=>ve,hookXHR:()=>we});function U(t=[]){let o=[];for(let{fn:r,arr:i}of t){if(typeof r!="function"||!Array.isArray(i))continue;let n=pe();i.push({fn:r,id:n}),o.push(()=>{let l=i.findIndex(d=>d.id===n);l!==-1&&i.splice(l,1)})}return()=>{o.forEach(r=>r?.())}}function pe(){return Math.random().toString(36).slice(2)}function fe(){let t=window.fetch;window.fetch=async function(o,r){let i=o;if(o instanceof Request){i=o?.url,r=r||{};for(let d in o){let a=typeof o[d];(a==="string"||a==="number"||a==="boolean")&&(r[d]=o[d])}}let n={url:i,options:r};for(let{fn:d}of B){let a=await d?.(n.url,n.options)?.catch(console.error);if(a&&(n=a),a===null)return null}if(o instanceof Request)try{o.url!==n.url&&(o=new Request(n.url,o))}catch{debugger}let l=await t(o,r);for(let{fn:d}of M){let a=await d?.(n.url,n.options,l)?.catch(console.error);if(a&&(l=a),a===null)return null}return l}}function ge({onBefore:t,onAfter:o}={}){return P||(fe(),P=!0),U([{fn:t,arr:B},{fn:o,arr:M}])}function me(){let t=window.XMLHttpRequest;window.XMLHttpRequest=new Proxy(t,{construct(o,r){let i=new o(...r),n,l=i.open;i.open=async function(a,s,f,w,y,...m){n={method:a,url:s,async:f,user:w,password:y};for(let{fn:g}of N){let u=await g?.(n);if(u&&(n=u),u===null)return}return l.apply(this,[n.method,n.url,n.async,n.user,n.password,...m])};let d=i.send;return i.send=async function(a){for(let{fn:s}of j){let f=await s?.(n,a);if(f&&(a=f),f===null)return}return i.addEventListener("load",function(){for(let{fn:s}of O)s?.(n,a,i.response)}),d.apply(this,[a])},i}})}function we({onBeforeOpen:t,onBeforeSend:o,onAfterSend:r}={}){return R||(me(),R=!0),U([{fn:t,arr:N},{fn:o,arr:j},{fn:r,arr:O}])}function be(){let t=WebSocket;WebSocket=function(o,r){let i;for(let{fn:l}of H){let d=l?.(o);if(d&&(o=d),d===null)return null}this.url=o,this.protocols=r,this.protocols?i=new t(o,r):i=new t(o);let n=i.send;return i.send=function(){let l=arguments[0];for(let{fn:d}of V){let a=d?.(l,i.url,i);if(a&&(l=a),a===null)return}arguments[0]=l,n.apply(this,arguments)},i._addEventListener=i.addEventListener,i.addEventListener=function(){let l=this;return arguments[0]==="message"&&(arguments[1]=function(d){return async function(){let a=arguments[0];for(let{fn:s}of E){let f=await s?.(new z(a),i.url,i);if(f&&(a=f),f===null)return}arguments[0]=a,d.apply(l,arguments)}}(arguments[1])),i._addEventListener.apply(this,arguments)},Object.defineProperty(i,"onmessage",{set:function(){let l=this,d=arguments[0],a=async function(){let s=arguments[0];for(let{fn:f}of E){let w=await f?.(new z(s),i.url,i);if(w&&(s=w),w===null)return}arguments[0]=s,d.apply(l,arguments)};i._addEventListener.apply(this,["message",a,!1])}}),i}}function ve({onBefore:t,onAfter:o,modifyUrl:r}={}){return $||(be(),$=!0),U([{fn:r,arr:H},{fn:t,arr:V},{fn:o,arr:E}])}function z(t){this.bubbles=t.bubbles||!1,this.cancelBubble=t.cancelBubble||!1,this.cancelable=t.cancelable||!1,this.currentTarget=t.currentTarget||null,this.data=t.data||null,this.defaultPrevented=t.defaultPrevented||!1,this.eventPhase=t.eventPhase||0,this.lastEventId=t.lastEventId||"",this.origin=t.origin||"",this.path=t.path||new Array(0),this.ports=t.parts||new Array(0),this.returnValue=t.returnValue||!0,this.source=t.source||null,this.srcElement=t.srcElement||null,this.target=t.target||null,this.timeStamp=t.timeStamp||null,this.type=t.type||"message",this.__proto__=t.__proto__||MessageEvent.__proto__}var B,M,P,N,j,O,R,H,V,E,$,ye=K(()=>{B=[],M=[],P=!1,N=[],j=[],O=[],R=!1,H=[],V=[],E=[],$=!1}),G={};J(G,{chooseFolderToDownload:()=>Me,closest:()=>Fe,createTrustedHtml:()=>q,createTrustedScript:()=>te,deepFind:()=>Le,download:()=>Y,downloadData:()=>Ne,downloadToFolder:()=>Pe,downloadUrl:()=>Ue,executeScript:()=>He,fetchByPassOrigin:()=>Z,getExtStorage:()=>ke,getFBAIODashboard:()=>re,getNumberFormatter:()=>Se,getRedirectedUrl:()=>Be,getTrustedPolicy:()=>F,getURL:()=>xe,injectCssCode:()=>Oe,injectCssFile:()=>Re,injectScriptSrc:()=>oe,injectScriptSrcAsync:()=>Ve,loadingFullScreen:()=>Te,makeUrlValid:()=>ee,notify:()=>Q,onElementRemoved:()=>Ee,onElementsAdded:()=>De,parseSafe:()=>Ce,runInBackground:()=>I,runInContentScript:()=>_e,sanitizeName:()=>je,sendToContentScript:()=>W,setExtStorage:()=>Ae,sleep:()=>Ie});function W(t,o,r=0){return new Promise((i,n)=>{let l=Math.random().toString(36),d="aio-contentscript-sendto-pagescript"+l,a=null,s=w=>{a&&window.clearTimeout(a),window.removeEventListener(d,f),i(w)},f=w=>s(w.detail.data);r>0&&(a=window.setTimeout(()=>s(null),r)),window.addEventListener(d,f,{once:!0}),window.dispatchEvent(new CustomEvent("aio-pagescript-sendto-contentscript",{detail:{event:t,data:o,uuid:l}}))})}function _e(t,o,r=0){return W("aio-runInContentScript",{fnPath:t,params:o},r)}function I(t,o,r=0){return W("aio-runInBackground",{fnPath:t,params:o},r)}function xe(t){return I("chrome.runtime.getURL",[t])}function Y(t){return I("chrome.downloads.download",[t])}async function ke(t,o,r=0){return I("utils.Storage.get",[t,o],r)}async function Ae(t,o,r=0){return I("utils.Storage.set",[t,o],r)}function Q({msg:t="",x:o=window.innerWidth/2,y:r=window.innerHeight-100,align:i="center",styleText:n="",duration:l=3e3,id:d="aio_notify_div"}={}){let a=document.getElementById(d);a&&a.remove();let s=document.createElement("div");s.id=d,s.style.cssText=`
        position: fixed;
        left: ${o}px;
        top: ${r}px;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        z-index: 2147483647;
        transition: all 1s ease-out;
        ${i==="right"?"transform: translateX(-100%);":i==="center"?"transform: translateX(-50%);":""}
        ${n||""}
      `,s.innerHTML=q(t),(document.body||document.documentElement).appendChild(s);let f=[];function w(y){f.forEach(m=>clearTimeout(m)),f=[setTimeout(()=>{s&&(s.style.opacity=0,s.style.top=`${r-50}px`)},y-1e3),setTimeout(()=>{s?.remove()},y)]}return l>0&&w(l),{closeAfter:w,remove(){return s?(s.remove(),s=null,!0):!1},setText(y,m){return s?(s.innerHTML=q(y),m&&w(m),!0):!1},setPosition(y,m){return s?(s.style.left=`${y}px`,s.style.top=`${m}px`,!0):!1}}}function Te(t=""){return Q({msg:t,styleText:`
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0006;
    `,align:"",duration:0,id:"aio_loading_fullscreen"})}function Ie(t){return new Promise(o=>setTimeout(o,t))}function Se(t,o){if(!o)if(document.documentElement.lang)o=document.documentElement.lang;else if(navigator.language)o=navigator.language;else try{o=new URL(Array.from(document.querySelectorAll("head > link[rel='search']"))?.find(l=>l?.getAttribute("href")?.includes("?locale="))?.getAttribute("href"))?.searchParams?.get("locale")}catch{console.log("Cannot find browser locale. Use en as default for number formatting."),o="en"}let r,i;switch(t){case"compactLong":r="compact",i="long";break;case"standard":r="standard",i="short";break;case"compactShort":default:r="compact",i="short"}let n=o+r+i;if(!L[n]){let l=Intl.NumberFormat(o,{notation:r,compactDisplay:i});L[n]=l}return L[n]}function De(t,o,r){let i=document.querySelectorAll(t);if(i?.length&&(o(i),r))return;let n=new MutationObserver(l=>{l.forEach(d=>{if(d.addedNodes)for(let a of d.addedNodes){if(a.nodeType!=1)continue;let s=a.matches(t)?[a]:Array.from(a.querySelectorAll(t));s?.length&&(o(s),r&&n.disconnect())}})});return n.observe(document,{childList:!0,subtree:!0,attributes:!1,characterData:!1}),()=>n.disconnect()}function Ee(t,o){if(!t.parentElement)throw new Error("element must have parent");let r=new MutationObserver(function(i){i.forEach(function(n){if(n.type==="childList"&&n.removedNodes.length>0)for(let l of n.removedNodes)l===t&&(o?.(l),r.disconnect())})});return r.observe(t.parentElement,{childList:!0}),()=>r.disconnect()}function Fe(t,o){let r=t;for(;r!==null;){if(r.matches(o))return r;let i=r.querySelector(o);if(i)return i;r=r.parentElement}return r}function Le(t,o,r=!0,i=!1){if(!t||typeof t!="object")return r?null:[];let n=Array.isArray(o)?o:o.split("."),l=[],d=[{currentObj:t,currentPathIndex:0,correctPath:!1}],a=!1;for(;d.length;){let{currentObj:s,currentPathIndex:f,correctPath:w}=d.pop();if(f===n.length){let m=i?w?s:null:s;if(r)return m;l.push(m);continue}let y=n[f];typeof s=="object"&&s!==null&&(y in s&&(a=!0,d.push({currentObj:s[y],currentPathIndex:f+1,correctPath:!0})),(!i||!a)&&Object.entries(s).forEach(([m,g])=>{m!==y&&typeof g=="object"&&g!==null&&d.push({currentObj:g,currentPathIndex:f,correctPath:!1})}))}return r?null:l}function Ce(t="",o={}){try{return JSON.parse(t)}catch(r){return console.log("Cannot parse JSON",r,t),o}}function Ue(t,o){try{let r=document.createElement("a");r.href=t,r.download=o,r.style.display="none",r.click(),r.remove()}catch{window.open(t,"_blank")}}async function Be(t){try{for(;;){let o=await Z(t,{method:"HEAD"});if(o?.redirected)console.log("redirected:",t,"->",o.url),t=o.url;else return t}}catch(o){return console.log("ERROR:",o),t}}async function Z(t,o={}){try{let r=ee(t),i=new URL(r);return location.hostname==i?.hostname&&(r=i.pathname),await fetch(r,o)}catch(r){console.log("NORMAL FETCH FAIL: ",r)}return await I("customFetch",[t,o])}function ee(t){return t?.startsWith?.("//")?location.protocol+t:t}async function Me(t=""){let o=await window.showDirectoryPicker({mode:"readwrite"});return await o.requestPermission({writable:!0}),t?await o.getDirectoryHandle(t,{create:!0}):o}async function Pe({url:t,fileName:o,dirHandler:r,expectBlobTypes:i,subFolderName:n=""}){if(!t)return!1;try{let l=await(await fetch(t)).blob();if(i?.length&&!i.find(a=>a?.test?a.test(l.type):a===l.type))throw new Error(`Blob type ${l.type} doesn't match expected type ${i}`);let d=await(await r.getFileHandle(o,{create:!0})).createWritable();return await d.write(l),await d.close(),!0}catch(l){return console.error(l,arguments),await Y({url:t,conflictAction:"overwrite",filename:(n?n+"/":"")+o}),!1}}function Ne(t,o,r="text/plain"){let i=new Blob([t],{type:r});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(i,o);else{let n=document.createElement("a"),l=URL.createObjectURL(i);n.href=l,n.download=o,document.body.appendChild(n),n.click(),setTimeout(function(){document.body.removeChild(n),window.URL.revokeObjectURL(l)},0)}}function je(t,o=!0){if(typeof t!="string")throw new Error("Input must be string");let r="",i=/[\/\?<>\\:\*\|"]/g,n=/[\x00-\x1f\x80-\x9f]/g,l=/^\.+$/,d=/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,a=/[\. ]+$/;return o&&(t=t.replaceAll("<","\u2039").replaceAll(">","\u203A").replaceAll(":","\u2236").replaceAll('"',"\u2033").replaceAll("/","\u2215").replaceAll("\\","\u2216").replaceAll("|","\xA6").replaceAll("?","\xBF")),t.replace(i,r).replace(n,r).replace(l,r).replace(d,r).replace(a,r)}function Oe(t){let o=document.createElement("style");return"textContent"in o?o.textContent=t:o.innerText=t,(document.head||document.documentElement).appendChild(o),o}function Re(t,o){let r=document.createElement("link");return r.setAttribute("rel","stylesheet"),r.setAttribute("type","text/css"),r.setAttribute("href",t),o&&r.setAttribute("id",o),(document.head||document.documentElement).appendChild(r),r}function He(t){let o=document.createElement("script");o.textContent=te(t),(document.head||document.documentElement).appendChild(o),o.onload=function(){o.remove()}}function F(){let t=window.trustedTypes?.ufsTrustedTypesPolicy||null;return t||(t=window.trustedTypes.createPolicy("ufsTrustedTypesPolicy",{createHTML:(o,r)=>o,createScriptURL:o=>o,createScript:o=>o})),t}function q(t){return F().createHTML(t)}function te(t){return F().createScript(t)}function oe(t,o){let r=F().createScriptURL(t),i=document.createElement("script");return i.onload=function(){o?.(!0)},i.onerror=function(n){o?.(!1,n)},i.src=r,(document.head||document.documentElement).appendChild(i),i}function Ve(t){return new Promise(o=>{oe(t,r=>{o(r)})})}var L,re,$e=K(()=>{L={},re=()=>"https://fbaio.org/"});(async()=>{let t=location.hostname.includes("douyin.com")?"douyin":"tiktok";console.log(`FB AIO: ${t} batch download ENABLED`);let{hookFetch:o,hookXHR:r}=await Promise.resolve().then(()=>(ye(),X)),{chooseFolderToDownload:i,downloadData:n,downloadToFolder:l,getNumberFormatter:d,getRedirectedUrl:a,getURL:s,injectCssCode:f,injectScriptSrcAsync:w,notify:y,sanitizeName:m}=await Promise.resolve().then(()=>($e(),G)),g={list:[],hasNew:!0,videoById:new Map},u={tiktok:{title:"Tiktok",videoFolderPrefix:"tiktok_videos_",audioFolderPrefix:"tiktok_musics_",jsonFilenameSuffix:"_videos_tiktok.json",metricLabel:"View",metricSortKey:"view",windowKey:"fbaio_tiktok_batchDownload",imageWidth:"150px",expectBlobTypes:["video/mp4","image/jpeg"],getItemId:e=>e.id,getVideoUrl:e=>e.video.playAddr,getCoverUrl:e=>e.video.dynamicCover||e.video.originCover||e.video.cover,getDesc:e=>e.desc,getAuthorAvatar:e=>e.author.avatarThumb,getAuthorNickname:e=>e.author.nickname,getAuthorHandle:e=>e.author.uniqueId,getAuthorId:e=>e.author.id,getAuthorOpenId:e=>e.author.uniqueId,getAuthorUrl:e=>"https://www.tiktok.com/@"+e,getAuthorAvatarLarge:e=>e.author.avatarLarger,getMetric:e=>e.stats.playCount,getDuration:e=>e.video.duration,getMusicId:e=>e.music.id,getMusicTitle:e=>e.music.title,getMusicUrl:e=>e.music.playUrl,getVideoDownloadItems(e,c){let p=[],h=e.imagePost?.images;h?.length&&p.push(...h.map((b,v)=>({url:b.imageURL?.urlList?.[1]||b.imageURL?.urlList?.[0],filename:c+1+"_"+(v+1)+"_"+m(e.id,!1)+".jpg"})));let x=e.video?.bitrateInfo?.find?.(b=>b.Bitrate===e.video.bitrate)?.PlayAddr?.UrlList||[],T=x[x.length-1];return p.push({url:T||e.video.playAddr,filename:c+1+"_"+m(e.id,!1)+".mp4"}),p},getAudioDownloadItem(e,c){return{url:e.music.playUrl,filename:c+1+"_"+m(e.music.title.substr(0,50)||"audio",!1)+".mp3"}},onFoundItem(e){(e.video.playAddr||e.imagePost?.images?.length)&&(g.videoById.set(e.video.id,e),g.hasNew=!0),e.imagePost?.images?.length&&console.log(e)},setupHook(){o({onAfter:async(e,c,p)=>{if(e.includes("item_list/")){let h=await p.clone().json();console.log(h),h?.itemList&&h.itemList.forEach(this.onFoundItem)}if(e.includes("api/search")){let h=await p.clone().json();console.log(h),h.data?.length&&h.data.forEach(x=>{x.type===1&&(g.videoById.set(x.item.video.id,x.item),g.hasNew=!0)})}}})}},douyin:{title:"Douyin",videoFolderPrefix:"douyin_videos_",audioFolderPrefix:"douyin_musics_",jsonFilenameSuffix:"_videos_douyin.json",metricLabel:"Like",metricSortKey:"like",windowKey:"fbaio_douyin_batchDownload",imageWidth:"200px",expectBlobTypes:["video/mp4"],getItemId:e=>e.aweme_id,getVideoUrl:e=>e.video.play_addr.url_list.at(-1),getCoverUrl:e=>e.video.cover.url_list[0],getDesc:e=>e.desc,getAuthorAvatar:e=>e.author.avatar_thumb.url_list.at(-1),getAuthorNickname:e=>e.author.nickname,getAuthorHandle:e=>e.author.sec_uid,getAuthorId:e=>e.author.uid,getAuthorOpenId:e=>e.author.sec_uid,getAuthorUrl:e=>"https://www.douyin.com/user/"+e,getAuthorAvatarLarge:e=>e.author.avatar_thumb.url_list.at(-1),getMetric:e=>e.statistics.digg_count,getDuration:e=>new Date(e.video.duration).toISOString().substr(11,8).split(":").filter(c=>c!=="00").join(":"),getMusicId:e=>e.music?.id,getMusicTitle:e=>e.music?.title,getMusicUrl:e=>e.music?.playUrl||e.music?.play_url?.url_list?.at(-1),getVideoDownloadItems(e,c){return[{url:e.video.play_addr.url_list.at(-1),filename:c+1+"_"+m(e.aweme_id,!1)+".mp4"}]},getAudioDownloadItem(e,c){return{url:e.music?.playUrl||e.music?.play_url?.url_list?.at(-1),filename:c+1+"_"+m(e.music.title.substr(0,50)||"audio",!1)+".mp3"}},onFoundItem(e){g.videoById.has(e.aweme_id)||(g.videoById.set(e.aweme_id,e),g.hasNew=!0)},setupHook(){r({onAfterSend:async({method:e,url:c,async:p,user:h,password:x},T,b)=>{try{let v=typeof b=="string"?JSON.parse(b):b;v?.aweme_list?.length&&(console.log(v),g.list.push(...v.aweme_list),v.aweme_list.forEach(this.onFoundItem)),v?.cards?.length&&v.cards.map(A=>JSON.parse(A.aweme)).forEach(this.onFoundItem)}catch(v){console.log("ERROR:",v)}}})}}}[t];window[u.windowKey]=g,u.setupHook(),f(`
#fbaio_tiktok_batchDownload {
  position: fixed;
  z-index: 16777269;
}

#fbaio_tiktok_batchDownload a:hover {
  text-decoration: underline;
}

#fbaio_tiktok_batchDownload .fbaio_floating_btn {
  border-radius: 25px;
  background: #444;
  color: white;
  padding: 15px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  border: 1px solid #777;
  cursor: pointer;
}

#fbaio_tiktok_batchDownload .fbaio_floating_btn:hover {
  background: #666;
}

#fbaio_tiktok_batchDownload .fbaio_container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.fbaio_popup {
  position: relative;
  background: #444;
  color: #eee;
  padding: 20px;
  border-radius: 10px;
  max-width: 90vw;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.fbaio_popup .fbaio_popup_header {
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.fbaio_popup .table_wrap {
  overflow: auto;
}

.fbaio_popup table {
  width: 100%;
}

.fbaio_popup table,
.fbaio_popup th,
.fbaio_popup td {
  border: 1px solid #aaa;
  border-collapse: collapse;
  vertical-align: middle;
}

.fbaio_popup table td {
  padding: 10px;
}

.fbaio_popup table thead {
  position: sticky;
  top: -2px;
  background: #333;
}

.fbaio_popup input {
  padding: 5px;
}

.fbaio_popup button {
  padding: 5px 10px;
  background: #333;
  color: #eee;
  border: 1px solid #777;
  cursor: pointer;
}

.fbaio_popup button:hover {
  background: #666;
}

.fbaio_popup .fbaio_avatar {
  width: 50px;
  height: 50px;
  cursor: pointer
}

.fbaio_popup .clickable {
  cursor: pointer;
  background: #333;
  user-select: none;
}

.fbaio_popup .clickable:hover {
  background: #666;
}

.fbaio_popup .fbaio_scroll_top {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #444;
  color: white;
  padding: 10px;
}

/* check boxes */
.fbaio_is_private {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  background: black;
  padding: 8px;
  font-weight: bold;
}

.fbaio_tiktok_checkbox {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  transition: all 0.1s ease;
}

.fbaio_tiktok_checkbox:hover {
  transform: scale(1.3);
}

.fbaio_video_checkbox {
  width: 30px;
  height: 30px;
}

.fbaio_dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fbaio_dropdown .fbaio_dropdown_content {
  visibility: hidden;
  overflow: hidden;
  position: absolute;
  width: max-content;
  top: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.fbaio_dropdown .fbaio_dropdown_trigger:hover~.fbaio_dropdown_content,
.fbaio_dropdown .fbaio_dropdown_content:hover {
  visibility: visible;
}`),window.Vue||await w(await s("/scripts/content/helper/vue.js"));let ie=document.createElement("div");document.documentElement.appendChild(ie);let We=d("compactShort");function ne(){let e=new Date;return[e.getFullYear(),e.getMonth()+1,e.getDate()].join("-")+"_"+[e.getHours(),e.getMinutes(),e.getSeconds()].join("-")}let Ke=new window.Vue({template:`
<div id="fbaio_tiktok_batchDownload">
  <div class="fbaio_floating_btn" @click="showModal = true">\u{1F4E5} {{totalCount}}</div>
  <div class="fbaio_container" v-if="showModal" @click.self="showModal = false">
    <div class="fbaio_popup">
      <h1 style="text-align:center">{{platformTitle}} - <a target="_blank" href="https://fbaio.org">FB AIO</a></h1>
      <h2 style="text-align:center">Found {{totalCount}} videos</h2>

      <div class="fbaio_popup_header">
        <button @click="scrollToVeryEnd">\u23EC Auto scroll</button>
        <div class="fbaio_dropdown">
          <button @click="clear" class="fbaio_dropdown_trigger">\u{1F5D1}\uFE0F Clear</button>
          <div class="fbaio_dropdown_content" v-if="selectedCount > 0">
            <button @click="clearSelected">\u{1F5D1}\uFE0F Remove {{selectedCount}} selected</button>
          </div>
        </div>
        <div class="fbaio_dropdown">
          <button @click="downloadVideo" class="fbaio_dropdown_trigger">\u{1F3AC}  {{videoTitle}}</button>
          <div class="fbaio_dropdown_content">
            <button @click="downloadAudio">\u{1F3A7} {{audioTitle}}</button>
            <button @click="downloadJson">\u{1F4C4} Download json</button>
          </div>
        </div>
        <input type="text" placeholder="\u{1F50E} Search..." :value="search" @input="e => search = e.target.value" >
      </div>

      <div class="table_wrap">
        <table>
          <thead>
            <tr>
              <th @click="setSortBy('index')" class="clickable">#</th>
              <th>\u{1F3AC} Video</th>
              <th @click="setSortBy('title')" class="clickable">Title</th>
              <th @click="setSortBy('author')" class="clickable">\u{1F464} User</th>
              <th @click="setSortBy(metricSortKey)" class="clickable">{{metricLabel}}</th>
              <th @click="setSortBy('duration')" class="clickable">Length</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
<tr v-if="videosToShow.length === 0">
  <td colspan="7"><h2 style="text-align:center">No video</h2></td>
</tr>
<tr v-for="v in videosToShow" :key="getItemId(v)">
  <td style="text-align:center">{{v.index}}<br/>
    <input type="checkbox" v-model="selected[getItemId(v)]" class="fbaio_video_checkbox" />
  </td>
  <td>
    <a target="_blank" :href="getVideoUrl(v)">
      <img :src="getCoverUrl(v)" :style="{ width: imageWidth }" />
    </a>
  </td>
  <td><p style="max-width:200px">{{getDesc(v)}}</p></td>
  <td>
    <img :src="getAuthorAvatar(v)" class="fbaio_avatar" @click="openUser(getAuthorOpenId(v))"/>
    {{getAuthorNickname(v)}}<br/>
    <input type="text" :value="getAuthorHandle(v)" style="width: 150px" /><br/>
    {{getAuthorId(v)}}
  </td>
  <td>{{format(getMetric(v))}}</td>
  <td>{{getDuration(v)}}s</td>
  <td>
    <p style="max-width:200px">
      <a :href="getVideoUrl(v)" v-if="getVideoUrl(v)" target="_blank">\u{1F3AC} Video</a><br/>
      <a :href="getCoverUrl(v)" target="_blank">\u{1F5BC}\uFE0F Cover</a><br/>
      <a :href="getAuthorAvatarLarge(v)" target="_blank">
      \u{1F464} Avatar
      </a><br/>
      <a v-if="getMusicUrl(v)" :href="getMusicUrl(v)" target="_blank">
      \u{1F3A7} Music: {{getMusicTitle(v)}}
      </a>
    </p>
  </td>
</tr>
          </tbody>
        </table>

        <button v-if="videosToShow.length > 2" @click="scrollToTop" class="fbaio_scroll_top">\u2B06</button>
      </div>
    </div>
  </div>
</div>`,created(){setInterval(()=>{g.hasNew&&(this.videos=Array.from(g.videoById.values()).map((e,c)=>({...e,index:c+1})),g.hasNew=!1)},1e3)},data(){return{showModal:!1,videos:[],search:"",sortBy:"index",sortDir:"asc",downloading:{video:null,audio:null},selected:{},platformTitle:u.title,metricLabel:u.metricLabel,metricSortKey:u.metricSortKey,imageWidth:u.imageWidth}},computed:{selectedIds(){return Object.entries(this.selected).filter(e=>e[1]).map(e=>e[0])},selectedCount(){return Object.values(this.selected).filter(e=>e).length},hasSelected(){return this.selectedCount>0},videoToDownload(){return this.hasSelected?this.videosToShow.filter(e=>this.selected[this.getItemId(e)]):this.videosToShow},audioToDownload(){let e=this.hasSelected?this.videosToShow.filter(p=>this.selected[this.getItemId(p)]):this.videosToShow,c=new Map;for(let p of e){let h=this.getMusicId(p);h&&!c.has(h)&&c.set(h,p)}return Array.from(c.values())},videoTitle(){return Number.isInteger(this.downloading.video)?"Downloading "+this.downloading.video+"/"+this.videoToDownload.length+" video":"Download "+this.videoToDownload.length+(this.hasSelected?" selected":"")+" video"},audioTitle(){return Number.isInteger(this.downloading.audio)?"Downloading "+this.downloading.audio+"/"+this.audioToDownload.length+" audio":"Download "+this.audioToDownload.length+(this.hasSelected?" selected":"")+" audio"},totalCount(){return this.videos.length},videosToShow(){return this.videos.filter(e=>[this.getDesc(e),this.getAuthorId(e),this.getAuthorNickname(e),this.getAuthorHandle(e)].some(c=>c?.toLowerCase?.().includes(this.search.toLowerCase()))).sort((e,c)=>{switch(this.sortBy){case"index":return this.sortDir==="asc"?e.index-c.index:c.index-e.index;case"title":return this.sortDir==="asc"?this.getDesc(e).localeCompare(this.getDesc(c)):this.getDesc(c).localeCompare(this.getDesc(e));case"author":return this.sortDir==="asc"?this.getAuthorNickname(e).localeCompare(this.getAuthorNickname(c)):this.getAuthorNickname(c).localeCompare(this.getAuthorNickname(e));case u.metricSortKey:return this.sortDir==="asc"?this.getMetric(e)-this.getMetric(c):this.getMetric(c)-this.getMetric(e);case"duration":return this.sortDir==="asc"?e.video.duration-c.video.duration:c.video.duration-e.video.duration}})}},methods:{async downloadVideo(){let e=this.videoToDownload.length;if(!e)return;let c=0;await ae({folderName:u.videoFolderPrefix+ne(),expectBlobTypes:u.expectBlobTypes,data:this.videoToDownload.map((p,h)=>u.getVideoDownloadItems(p,h)).flat().filter(p=>p.url),onProgressItem:(p,h)=>{this.downloading.video=p},onFinishItem:(p,h)=>{c++}}),this.downloading.video=!1,alert("Downloaded "+c+"/"+e+" videos!")},async downloadAudio(){let e=this.audioToDownload.length;if(!e)return;let c=0;await ae({folderName:u.audioFolderPrefix+ne(),data:this.audioToDownload.map((p,h)=>u.getAudioDownloadItem(p,h)),onProgressItem:(p,h)=>{this.downloading.audio=p},onFinishItem:(p,h)=>{c++}}),this.downloading.audio=!1,alert("Downloaded "+c+"/"+e+" videos!")},downloadJson(){n(JSON.stringify(this.videosToShow,null,4),this.videosToShow.length+u.jsonFilenameSuffix)},scrollToVeryEnd(){setTimeout(()=>qe(!1),100)},scrollToTop(e){e.target.parentElement.scrollTo({top:0,behavior:"smooth"})},clearSelected(){this.selectedIds.forEach(e=>{g.videoById.delete(e)}),g.hasNew=!0,this.selected={}},clear(){confirm("Are you sure want to clear all?")&&(g.videoById.clear(),this.videos=[])},setSortBy(e){this.sortBy=e,e===this.sortBy&&(this.sortDir=this.sortDir==="asc"?"desc":"asc")},openUser(e){window.open(u.getAuthorUrl(e),"_blank")},format(e){return We.format(e)},getItemId:u.getItemId,getVideoUrl:u.getVideoUrl,getCoverUrl:u.getCoverUrl,getDesc:u.getDesc,getAuthorAvatar:u.getAuthorAvatar,getAuthorNickname:u.getAuthorNickname,getAuthorHandle:u.getAuthorHandle,getAuthorId:u.getAuthorId,getAuthorOpenId:u.getAuthorOpenId,getAuthorAvatarLarge:u.getAuthorAvatarLarge,getMetric:u.getMetric,getDuration:u.getDuration,getMusicId:u.getMusicId,getMusicTitle:u.getMusicTitle,getMusicUrl:u.getMusicUrl}}).$mount(ie);async function ae({folderName:e=t,expectBlobTypes:c,data:p,onProgressItem:h,onFinishItem:x}){let T=await i(e);h?.(0,p.length);for(let b=0;b<p.length;++b)try{h?.(b+1,p.length);let{url:v,filename:A}=p[b],D=await a(v);await l({url:D,fileName:A,dirHandler:T,expectBlobTypes:c}),x?.(b+1,p.length)}catch(v){console.error(v)}}function qe(e=!0){return new Promise(async(c,p)=>{let h=y({msg:"Useful-script: Scrolling to very end...",duration:99999});function x(){let _=[],S=Array.from(document.querySelectorAll("*")).concat(document.documentElement);for(let k of S)window.getComputedStyle(k).overflowY!=="hidden"&&(k.scrollHeight>k.clientHeight||k.scrollWidth>k.clientWidth)&&_.push(k);if(_.length===1)return _[0];let C=null,de=0;for(let k of _){let ce=k.getBoundingClientRect(),ue=ce.width*ce.height;ue>de&&(de=ue,C=k)}return C}let T=_=>(_||document.body).scrollHeight,b=(_=document)=>_.scrollTo({left:0,top:T(_),behavior:e?"smooth":"instant"}),v=_=>new Promise(S=>setTimeout(S,_)),A={time:Date.now(),top:0},D=!0,le=()=>{D=!1,document.removeEventListener("click",le),h.setText("Useful-script: D\u1EEANG scroll do b\u1EA1n click"),h.closeAfter(3e3)};document.addEventListener("click",le);let se=x();for(;D;){b(se);let _=T(se),S=Date.now()-A.time,C=Math.round((5e3-S)/1e3);h.setText(`Useful-script: \u0111ang scroll xu\u1ED1ng cu\u1ED1i ... (${C}s)`),_!=A.top?(A.top=_,A.time=Date.now()):S>5e3&&(D=!1,h.setText("Useful-script: scroll XONG"),h.closeAfter(2e3)),await v(100)}c()})}})()})();
