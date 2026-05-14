(()=>{var He=Object.defineProperty,ze=(r,o)=>()=>(r&&(o=r(r=0)),o),Ue=(r,o)=>{for(var a in o)He(r,a,{get:o[a],enumerable:!0})},ie={};Ue(ie,{chooseFolderToDownload:()=>ot,closest:()=>Ze,createTrustedHtml:()=>V,createTrustedScript:()=>se,deepFind:()=>et,download:()=>le,downloadData:()=>it,downloadToFolder:()=>at,downloadUrl:()=>nt,executeScript:()=>dt,fetchByPassOrigin:()=>ue,getExtStorage:()=>Je,getFBAIODashboard:()=>me,getNumberFormatter:()=>Ke,getRedirectedUrl:()=>rt,getTrustedPolicy:()=>I,getURL:()=>We,injectCssCode:()=>ct,injectCssFile:()=>ut,injectScriptSrc:()=>fe,injectScriptSrcAsync:()=>st,loadingFullScreen:()=>Xe,makeUrlValid:()=>de,notify:()=>ce,onElementRemoved:()=>Ye,onElementsAdded:()=>Qe,parseSafe:()=>tt,runInBackground:()=>_,runInContentScript:()=>qe,sanitizeName:()=>lt,sendToContentScript:()=>J,setExtStorage:()=>Ve,sleep:()=>Ge});function J(r,o,a=0){return new Promise((u,s)=>{let f=Math.random().toString(36),p="aio-contentscript-sendto-pagescript"+f,c=null,d=y=>{c&&window.clearTimeout(c),window.removeEventListener(p,h),u(y)},h=y=>d(y.detail.data);a>0&&(c=window.setTimeout(()=>d(null),a)),window.addEventListener(p,h,{once:!0}),window.dispatchEvent(new CustomEvent("aio-pagescript-sendto-contentscript",{detail:{event:r,data:o,uuid:f}}))})}function qe(r,o,a=0){return J("aio-runInContentScript",{fnPath:r,params:o},a)}function _(r,o,a=0){return J("aio-runInBackground",{fnPath:r,params:o},a)}function We(r){return _("chrome.runtime.getURL",[r])}function le(r){return _("chrome.downloads.download",[r])}async function Je(r,o,a=0){return _("utils.Storage.get",[r,o],a)}async function Ve(r,o,a=0){return _("utils.Storage.set",[r,o],a)}function ce({msg:r="",x:o=window.innerWidth/2,y:a=window.innerHeight-100,align:u="center",styleText:s="",duration:f=3e3,id:p="aio_notify_div"}={}){let c=document.getElementById(p);c&&c.remove();let d=document.createElement("div");d.id=p,d.style.cssText=`
        position: fixed;
        left: ${o}px;
        top: ${a}px;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        z-index: 2147483647;
        transition: all 1s ease-out;
        ${u==="right"?"transform: translateX(-100%);":u==="center"?"transform: translateX(-50%);":""}
        ${s||""}
      `,d.innerHTML=V(r),(document.body||document.documentElement).appendChild(d);let h=[];function y(b){h.forEach(w=>clearTimeout(w)),h=[setTimeout(()=>{d&&(d.style.opacity=0,d.style.top=`${a-50}px`)},b-1e3),setTimeout(()=>{d?.remove()},b)]}return f>0&&y(f),{closeAfter:y,remove(){return d?(d.remove(),d=null,!0):!1},setText(b,w){return d?(d.innerHTML=V(b),w&&y(w),!0):!1},setPosition(b,w){return d?(d.style.left=`${b}px`,d.style.top=`${w}px`,!0):!1}}}function Xe(r=""){return ce({msg:r,styleText:`
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0006;
    `,align:"",duration:0,id:"aio_loading_fullscreen"})}function Ge(r){return new Promise(o=>setTimeout(o,r))}function Ke(r,o){if(!o)if(document.documentElement.lang)o=document.documentElement.lang;else if(navigator.language)o=navigator.language;else try{o=new URL(Array.from(document.querySelectorAll("head > link[rel='search']"))?.find(f=>f?.getAttribute("href")?.includes("?locale="))?.getAttribute("href"))?.searchParams?.get("locale")}catch{console.log("Cannot find browser locale. Use en as default for number formatting."),o="en"}let a,u;switch(r){case"compactLong":a="compact",u="long";break;case"standard":a="standard",u="short";break;case"compactShort":default:a="compact",u="short"}let s=o+a+u;if(!R[s]){let f=Intl.NumberFormat(o,{notation:a,compactDisplay:u});R[s]=f}return R[s]}function Qe(r,o,a){let u=document.querySelectorAll(r);if(u?.length&&(o(u),a))return;let s=new MutationObserver(f=>{f.forEach(p=>{if(p.addedNodes)for(let c of p.addedNodes){if(c.nodeType!=1)continue;let d=c.matches(r)?[c]:Array.from(c.querySelectorAll(r));d?.length&&(o(d),a&&s.disconnect())}})});return s.observe(document,{childList:!0,subtree:!0,attributes:!1,characterData:!1}),()=>s.disconnect()}function Ye(r,o){if(!r.parentElement)throw new Error("element must have parent");let a=new MutationObserver(function(u){u.forEach(function(s){if(s.type==="childList"&&s.removedNodes.length>0)for(let f of s.removedNodes)f===r&&(o?.(f),a.disconnect())})});return a.observe(r.parentElement,{childList:!0}),()=>a.disconnect()}function Ze(r,o){let a=r;for(;a!==null;){if(a.matches(o))return a;let u=a.querySelector(o);if(u)return u;a=a.parentElement}return a}function et(r,o,a=!0,u=!1){if(!r||typeof r!="object")return a?null:[];let s=Array.isArray(o)?o:o.split("."),f=[],p=[{currentObj:r,currentPathIndex:0,correctPath:!1}],c=!1;for(;p.length;){let{currentObj:d,currentPathIndex:h,correctPath:y}=p.pop();if(h===s.length){let w=u?y?d:null:d;if(a)return w;f.push(w);continue}let b=s[h];typeof d=="object"&&d!==null&&(b in d&&(c=!0,p.push({currentObj:d[b],currentPathIndex:h+1,correctPath:!0})),(!u||!c)&&Object.entries(d).forEach(([w,$])=>{w!==b&&typeof $=="object"&&$!==null&&p.push({currentObj:$,currentPathIndex:h,correctPath:!1})}))}return a?null:f}function tt(r="",o={}){try{return JSON.parse(r)}catch(a){return console.log("Cannot parse JSON",a,r),o}}function nt(r,o){try{let a=document.createElement("a");a.href=r,a.download=o,a.style.display="none",a.click(),a.remove()}catch{window.open(r,"_blank")}}async function rt(r){try{for(;;){let o=await ue(r,{method:"HEAD"});if(o?.redirected)console.log("redirected:",r,"->",o.url),r=o.url;else return r}}catch(o){return console.log("ERROR:",o),r}}async function ue(r,o={}){try{let a=de(r),u=new URL(a);return location.hostname==u?.hostname&&(a=u.pathname),await fetch(a,o)}catch(a){console.log("NORMAL FETCH FAIL: ",a)}return await _("customFetch",[r,o])}function de(r){return r?.startsWith?.("//")?location.protocol+r:r}async function ot(r=""){let o=await window.showDirectoryPicker({mode:"readwrite"});return await o.requestPermission({writable:!0}),r?await o.getDirectoryHandle(r,{create:!0}):o}async function at({url:r,fileName:o,dirHandler:a,expectBlobTypes:u,subFolderName:s=""}){if(!r)return!1;try{let f=await(await fetch(r)).blob();if(u?.length&&!u.find(c=>c?.test?c.test(f.type):c===f.type))throw new Error(`Blob type ${f.type} doesn't match expected type ${u}`);let p=await(await a.getFileHandle(o,{create:!0})).createWritable();return await p.write(f),await p.close(),!0}catch(f){return console.error(f,arguments),await le({url:r,conflictAction:"overwrite",filename:(s?s+"/":"")+o}),!1}}function it(r,o,a="text/plain"){let u=new Blob([r],{type:a});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(u,o);else{let s=document.createElement("a"),f=URL.createObjectURL(u);s.href=f,s.download=o,document.body.appendChild(s),s.click(),setTimeout(function(){document.body.removeChild(s),window.URL.revokeObjectURL(f)},0)}}function lt(r,o=!0){if(typeof r!="string")throw new Error("Input must be string");let a="",u=/[\/\?<>\\:\*\|"]/g,s=/[\x00-\x1f\x80-\x9f]/g,f=/^\.+$/,p=/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,c=/[\. ]+$/;return o&&(r=r.replaceAll("<","\u2039").replaceAll(">","\u203A").replaceAll(":","\u2236").replaceAll('"',"\u2033").replaceAll("/","\u2215").replaceAll("\\","\u2216").replaceAll("|","\xA6").replaceAll("?","\xBF")),r.replace(u,a).replace(s,a).replace(f,a).replace(p,a).replace(c,a)}function ct(r){let o=document.createElement("style");return"textContent"in o?o.textContent=r:o.innerText=r,(document.head||document.documentElement).appendChild(o),o}function ut(r,o){let a=document.createElement("link");return a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css"),a.setAttribute("href",r),o&&a.setAttribute("id",o),(document.head||document.documentElement).appendChild(a),a}function dt(r){let o=document.createElement("script");o.textContent=se(r),(document.head||document.documentElement).appendChild(o),o.onload=function(){o.remove()}}function I(){let r=window.trustedTypes?.ufsTrustedTypesPolicy||null;return r||(r=window.trustedTypes.createPolicy("ufsTrustedTypesPolicy",{createHTML:(o,a)=>o,createScriptURL:o=>o,createScript:o=>o})),r}function V(r){return I().createHTML(r)}function se(r){return I().createScript(r)}function fe(r,o){let a=I().createScriptURL(r),u=document.createElement("script");return u.onload=function(){o?.(!0)},u.onerror=function(s){o?.(!1,s)},u.src=a,(document.head||document.documentElement).appendChild(u),u}function st(r){return new Promise(o=>{fe(r,a=>{o(a)})})}var R,me,ft=ze(()=>{R={},me=()=>"https://fbaio.org/"});(()=>{console.log("FB AIO: Facebook ad blocker ENABLED");let r=[],o="FB.HideReactComponents.Targets",a="FB.HideReactComponents.HiddenCount",u="FB.HideReactComponents.ShowPlaceholder",s="AutoRun.EnabledFeatures",f="fb_hideAds",p="fb-aio-hidden-react-component",c="fb-aio-hidden-react-component-placeholder",d="fb-aio-hidden-react-component-style",h="data-fb-aio-hidden-react-component",y="css:",b=12e4,w=3e3,$=50,mt=500,pt=250,gt=1e3,pe=80,ge=5e3,ht=5e3,bt=5e3,wt=1500,he=800,N=new Map,F=new Set,T=new Set,v=new Set(xe(r)),B=new Set(v),D=[],S=[],be=new Map(Te(r)),X=!0,we="",G=!1,M=!1,A=!1,ye=0,Ee=0,C=null,k=null,Ne=null,K=null,j="",H=0,Q=null,Y=null;function ve(){if(document.getElementById(d))return;let e=document.createElement("style");e.id=d,e.textContent=`
      .${p} {
        display: none !important;
      }

      .${c} {
        box-sizing: border-box;
        margin: 8px 0;
        padding: 8px 10px;
        border: none;
        border-radius: 6px;
        background: rgba(31, 41, 55, 0.58) !important;
        color: rgba(255, 255, 255, 0.72) !important;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 8px;
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 12px;
        line-height: 1.35;
      }

      .${c}__title {
        color: rgba(255, 255, 255, 0.68) !important;
        font-weight: 600;
      }

      .${c}__meta {
        margin-top: 1px;
        color: rgba(255, 255, 255, 0.52) !important;
        font-size: 11px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .${c}__button {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        font: inherit;
        font-size: 11px;
        font-weight: 600;
        line-height: 1;
        min-width: 58px;
        padding: 6px 8px;
      }

      .${c}__button:hover {
        border-color: rgba(255, 255, 255, 0.22);
        background: rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.82);
      }

      .${c}[data-fb-aio-revealed="true"] {
        background: rgba(31, 41, 55, 0.68) !important;
      }

      .${c}[data-fb-aio-revealed="true"]
        .${c}__button {
        border-color: rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.74);
      }

      @media (prefers-color-scheme: dark) {
        .${c} {
          background: rgba(31, 41, 55, 0.58) !important;
          color: rgba(255, 255, 255, 0.72) !important;
        }

        .${c}__meta {
          color: rgba(255, 255, 255, 0.52) !important;
        }

        .${c}__button {
          border-color: rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.66);
        }

        .${c}__button:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.82);
        }

        .${c}[data-fb-aio-revealed="true"] {
          background: rgba(31, 41, 55, 0.68) !important;
        }
      }
    `,(document.head||document.documentElement)?.appendChild?.(e)}function Ae(){return window.__REACT_DEVTOOLS_GLOBAL_HOOK__||null}function Z(e){let t=Array.isArray(e)?e:Array.isArray(e?.targets)?e.targets:r,n=[],i=new Set;for(let l of t){let m=typeof l=="string"?l:l?.name||l?.componentName||l?.displayName,g=String(m||"").trim();!g||i.has(g)||(i.add(g),n.push({name:g,label:typeof l=="object"&&_e(l.label)||g,enabled:typeof l=="string"?!0:l?.enabled!==!1}))}return n.length?n:r}function xe(e){return Z(e).filter(t=>t.enabled).map(t=>t.name)}function _e(e){return typeof e=="string"?e.trim():e&&typeof e=="object"?String(e.vi||e.en||"").trim():""}function Te(e){return Z(e).map(t=>[t.name,_e(t.label)||t.name])}function z(e){let t=String(e||"").trim(),n=t.match(/^\[(.+)]$/);return{name:(n?n[1]:t).trim(),isTarget:!!n}}function yt(e){let t=String(e||"").trim(),n=t.match(/^(.+?)\s*:has\(\s*(.+?)\s*\)$/);if(n){let W=z(n[1]).name,je=z(n[2]).name;return!W||!je?null:{rawName:t,operator:":has",targetName:W,relatedName:je}}let i=t.match(/^(.+?)\s*([>~])\s*(.+)$/);if(!i)return null;let l=z(i[1]),m=z(i[3]);if(!l.name||!m.name)return null;let g=[l,m].filter(W=>W.isTarget);if(!g.length&&i[2]===">")return{rawName:t,operator:i[2],targetName:l.name,targetSide:"left",relatedName:m.name};if(g.length!==1)return null;let E=l.isTarget?"left":"right",q=l.isTarget?m:l;return{rawName:t,operator:i[2],targetName:g[0].name,targetSide:E,relatedName:q.name}}function Et(e){let t=String(e||"").trim();if(!t.toLowerCase().startsWith(y))return null;let n=t.slice(y.length).trim();return n?{rawName:t,selector:n}:null}function Nt(e){v=new Set(e),D=[],S=[],B=new Set;for(let t of v){let n=Et(t);if(n){S.push(n);continue}let i=yt(t);i?D.push(i):B.add(t)}}function P(){return B.size||D.length}let vt=/[\s().,:<>[\]{}|/\\]/;function Se(e){return!e||vt.test(e)}function O(e,t){if(!e||!t)return!1;if(e===t)return!0;let n=e.indexOf(t);for(;n>=0;){let i=e[n-1],l=e[n+t.length];if(Se(i)&&Se(l))return!0;n=e.indexOf(t,n+t.length)}return!1}function Ce(e,t){if(!e)return!1;if(O(e.displayName,t)||O(e.name,t))return!0;let n=e.render;if(n&&(O(n.displayName,t)||O(n.name,t)))return!0;let i=e.type;return!!(i&&(O(i.displayName,t)||O(i.name,t)))}function L(e,t){return!!(Ce(e?.elementType,t)||Ce(e?.type,t))}function At(e,t){let n=[e?.child],i=0;for(;n.length&&i<ge;){let l=n.pop();if(l){if(i++,L(l,t))return!0;te(n,l)}}return!1}function xt(e,t){return!!Oe(e,t)}function Oe(e,t){let n=e?.return,i=0;for(;n&&i<pe;){if(L(n,t))return n;n=n.return,i++}return null}function _t(e,t){let n=e?.return?.child,i=0;for(;n&&i<ge;){if(n!==e&&L(n,t))return!0;n=n.sibling,i++}return!1}function Tt(e,t){return e.operator===":has"?L(t,e.relatedName)?Oe(t,e.targetName):null:St(t,e)?t:null}function St(e,t){return L(e,t.targetName)?t.operator===">"?t.targetSide==="left"?At(e,t.relatedName):xt(e,t.relatedName):t.operator==="~"?_t(e,t.relatedName):!1:!1}function Xt(e){return ee(e)?.targetName||""}function ee(e){if(!P())return null;for(let t of B)if(L(e,t))return{fiber:e,targetName:t};for(let t of D){let n=Tt(t,e);if(n)return{fiber:n,targetName:t.rawName}}return null}function te(e,t){t?.sibling&&e.push(t.sibling),t?.child&&e.push(t.child)}function Ct(e){let t=[],n=[e?.child],i=0;for(;n.length&&i<mt&&t.length<$;){let l=n.pop();if(l){if(i++,l.stateNode?.nodeType===Node.ELEMENT_NODE){t.push(l.stateNode),l.sibling&&n.push(l.sibling);continue}te(n,l)}}return t}function Le(e){return e?.nodeType===Node.ELEMENT_NODE&&e!==document.body&&e!==document.documentElement&&!!e.parentNode}function Ot(){return{targetNames:new Set,placeholder:null,revealed:!1}}function $e(e){return Array.from(e).map(t=>be.get(t)||t).join(", ")}function ne(e){e?.placeholder?.remove?.(),e&&(e.placeholder=null)}function Lt(e,t){if(t.placeholder)return t.placeholder;let n=document.createElement("div");n.className=c;let i=document.createElement("div");i.className=`${c}__copy`;let l=document.createElement("div");l.className=`${c}__title`;let m=document.createElement("button");return m.type="button",m.className=`${c}__button`,m.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),t.revealed=!t.revealed,re(e)}),i.appendChild(l),n.appendChild(i),n.appendChild(m),t.placeholder=n,n}function $t(e,t){let n=Lt(e,t),i=$e(t.targetNames),l=n.querySelector(`.${c}__title`),m=n.querySelector(`.${c}__button`);n.dataset.fbAioRevealed=String(t.revealed),l.textContent=(t.revealed?"FB AIO: \u0110ang b\u1ECF \u1EA9n ":"FB AIO: \u0110\xE3 \u1EA9n ")+i,m.textContent=t.revealed?"\u1EA8n l\u1EA1i":"B\u1ECF \u1EA9n",m.setAttribute("aria-label",t.revealed?"\u1EA8n l\u1EA1i m\u1EE5c n\xE0y":"B\u1ECF \u1EA9n m\u1EE5c n\xE0y"),e.parentNode&&n.nextSibling!==e&&e.parentNode.insertBefore(n,e)}function re(e){let t=N.get(e);if(t){for(let n of Array.from(t.targetNames))v.has(n)||t.targetNames.delete(n);if(!t.targetNames.size||!Le(e)){e.classList?.remove?.(p),e.removeAttribute?.(h),ne(t),N.delete(e);return}X?t.revealed?e.classList?.remove?.(p):e.classList?.add?.(p):(t.revealed=!1,e.classList?.add?.(p),ne(t)),e.setAttribute?.(h,$e(t.targetNames)),X&&$t(e,t)}}function Fe(e,t){if(!Le(e)||!t)return!1;let n=N.get(e);n||(n=Ot(),N.set(e,n));let i=!n.targetNames.has(t);return n.targetNames.add(t),re(e),i}function ke(e,t){let n=Ct(e),i=0;for(let l of n)Fe(l,t)&&i++;return i}function Ft(){if(!S.length)return 0;let e=0;for(let t of S){let n=[];try{n=Array.from(document.querySelectorAll(t.selector))}catch{continue}for(let i of n)i.classList?.contains?.(c)||i.closest?.(`.${c}`)||Fe(i,t.rawName)&&e++}return e&&oe(e),e}function oe(e=1){H+=e,!Q&&(Q=window.setTimeout(()=>{kt().catch(()=>{})},500))}async function kt(){let e=H;if(H=0,Q=null,!!e)try{let t=Number(await U(a,0)),n=Number.isFinite(t)?t:0;await Wt(a,n+e)}catch(t){throw H+=e,t}}function Pe(e,t=b,n=null){if(!e||!P())return 0;let i=[e],l=0,m=0;for(;i.length&&m<t;){let g=i.pop();if(!g)continue;m++;let E=ee(g);if(E){if(!n?.has(E.fiber)){n?.add(E.fiber);let q=ke(E.fiber,E.targetName);l+=q,q&&oe()}g.sibling&&i.push(g.sibling);continue}te(i,g)}return l}function Ie(){for(let[e,t]of Array.from(N.entries())){if(!e.isConnected){ne(t),N.delete(e);continue}re(e)}}function Pt(e){return e?.current||e}function It(){return A?!0:N.size?Date.now()-ye>=bt:!1}function Rt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return null;if(j&&e[j])return e[j];for(let t of Object.keys(e))if(t.startsWith("__reactFiber$")||t.startsWith("__reactInternalInstance$"))return j=t,e[t]||null;return null}function Bt(e){let t=e;for(;t&&t!==document.documentElement&&t.nodeType===Node.ELEMENT_NODE;){let n=Rt(t);if(n)return n;t=t.parentElement}return null}function Dt(e,t){let n=e,i=0,l=0;for(;n&&i<pe;){let m=ee(n);if(m)return t.has(m.fiber)||(t.add(m.fiber),l=ke(m.fiber,m.targetName),l&&oe()),l;n=n.return,i++}return l}function Mt(e,t){if(!e?.isConnected||!P()||e.classList?.contains?.(c)||e.closest?.(`.${c}`))return 0;let n=Bt(e);return n?Dt(n,t)||Pe(n,w,t):0}function jt(){G=!1,ve(),It()&&(A=!1,ye=Date.now(),Ie());let e=0,t=new WeakSet;M&&(M=!1,e+=Ft());let n=0;for(let l of Array.from(T))if(T.delete(l),e+=Mt(l,t),n++,n>=pt)break;let i=Array.from(F);i.length&&(C&&(window.clearTimeout(C),C=null),Ee=Date.now());for(let l of i)F.delete(l),e+=Pe(Pt(l),b,t);(T.size||F.size||A)&&x()}function x(){G||(G=!0,(window.requestIdleCallback||(e=>window.setTimeout(e,100)))(jt,{timeout:500}))}function Ht(){S.length&&(M=!0,A=!0,x())}function zt(e){e&&(!v.size&&!N.size||(F.add(e),A=!0,x()))}function Ut(e){if(!e||!v.size&&!N.size)return;F.add(e),A=!0;let t=wt-(Date.now()-Ee);if(t<=0){x();return}C||(C=window.setTimeout(()=>{C=null,x()},t))}function Re(e){if(!(!e||e.nodeType!==Node.ELEMENT_NODE)&&v.size){if(S.length&&(M=!0),!P()){x();return}if(T.add(e),T.size>gt){T.clear(),A=!0,ae();return}x()}}function qt(){K||!document.documentElement||(K=new MutationObserver(e=>{if(v.size)for(let t of e)for(let n of t.addedNodes||[])n.nodeType===Node.ELEMENT_NODE?Re(n):n.parentElement&&Re(n.parentElement)}),K.observe(document.documentElement,{childList:!0,subtree:!0}))}function ae(){if(!P())return;let e=Ae();if(!(!e?.renderers||!e?.getFiberRoots))for(let t of e.renderers.keys()){let n=null;try{n=e.getFiberRoots(t)}catch{n=null}if(n)for(let i of n)zt(i)}}function Be(){return Y=Y||Promise.resolve().then(()=>(ft(),ie)),Y}async function U(e,t){let{getExtStorage:n}=await Be();return n(e,t,he)}async function Wt(e,t){let{setExtStorage:n}=await Be();return n(e,t,he)}async function De({rescan:e=!1}={}){let[t,n,i]=await Promise.all([U(o,r),U(s,null),U(u,!0)]),l=Z(t),m=!Array.isArray(n)||n.includes(f),g=i!==!1,E=JSON.stringify({targets:l,isFeatureEnabled:m,showPlaceholder:g});E!==we&&(we=E,X=g,Nt(m?xe(l):[]),be=new Map(Te(l)),Ie(),e&&ae(),Ht())}function Jt(){Ne||(Ne=window.setInterval(()=>{De({rescan:!0}).catch(()=>{})},ht))}function Vt(e){if(!e||e.__FBAIO_HIDE_REACT_COMPONENTS_PATCHED__)return!1;let t=e.onCommitFiberRoot;return e.onCommitFiberRoot=function(){let n,i=arguments[1];try{n=t?.apply(this,arguments)}catch{n=void 0}try{Ut(i)}catch{}return n},e.__FBAIO_HIDE_REACT_COMPONENTS_PATCHED__=!0,ae(),!0}function Me(){let e=Ae();if(Vt(e)){k&&(window.clearInterval(k),k=null);return}k||(k=window.setInterval(Me,500))}ve(),De().catch(()=>{}).finally(()=>{qt(),Me(),Jt()})})()})();
