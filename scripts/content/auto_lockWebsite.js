(()=>{var j=Object.defineProperty,I=(n,o)=>()=>(n&&(o=n(n=0)),o),S=(n,o)=>{for(var e in o)j(n,e,{get:o[e],enumerable:!0})},E={};S(E,{md5:()=>A});function k(n,o){let e=n[0],t=n[1],r=n[2],l=n[3];e=u(e,t,r,l,o[0],7,-680876936),l=u(l,e,t,r,o[1],12,-389564586),r=u(r,l,e,t,o[2],17,606105819),t=u(t,r,l,e,o[3],22,-1044525330),e=u(e,t,r,l,o[4],7,-176418897),l=u(l,e,t,r,o[5],12,1200080426),r=u(r,l,e,t,o[6],17,-1473231341),t=u(t,r,l,e,o[7],22,-45705983),e=u(e,t,r,l,o[8],7,1770035416),l=u(l,e,t,r,o[9],12,-1958414417),r=u(r,l,e,t,o[10],17,-42063),t=u(t,r,l,e,o[11],22,-1990404162),e=u(e,t,r,l,o[12],7,1804603682),l=u(l,e,t,r,o[13],12,-40341101),r=u(r,l,e,t,o[14],17,-1502002290),t=u(t,r,l,e,o[15],22,1236535329),e=d(e,t,r,l,o[1],5,-165796510),l=d(l,e,t,r,o[6],9,-1069501632),r=d(r,l,e,t,o[11],14,643717713),t=d(t,r,l,e,o[0],20,-373897302),e=d(e,t,r,l,o[5],5,-701558691),l=d(l,e,t,r,o[10],9,38016083),r=d(r,l,e,t,o[15],14,-660478335),t=d(t,r,l,e,o[4],20,-405537848),e=d(e,t,r,l,o[9],5,568446438),l=d(l,e,t,r,o[14],9,-1019803690),r=d(r,l,e,t,o[3],14,-187363961),t=d(t,r,l,e,o[8],20,1163531501),e=d(e,t,r,l,o[13],5,-1444681467),l=d(l,e,t,r,o[2],9,-51403784),r=d(r,l,e,t,o[7],14,1735328473),t=d(t,r,l,e,o[12],20,-1926607734),e=s(e,t,r,l,o[5],4,-378558),l=s(l,e,t,r,o[8],11,-2022574463),r=s(r,l,e,t,o[11],16,1839030562),t=s(t,r,l,e,o[14],23,-35309556),e=s(e,t,r,l,o[1],4,-1530992060),l=s(l,e,t,r,o[4],11,1272893353),r=s(r,l,e,t,o[7],16,-155497632),t=s(t,r,l,e,o[10],23,-1094730640),e=s(e,t,r,l,o[13],4,681279174),l=s(l,e,t,r,o[0],11,-358537222),r=s(r,l,e,t,o[3],16,-722521979),t=s(t,r,l,e,o[6],23,76029189),e=s(e,t,r,l,o[9],4,-640364487),l=s(l,e,t,r,o[12],11,-421815835),r=s(r,l,e,t,o[15],16,530742520),t=s(t,r,l,e,o[2],23,-995338651),e=p(e,t,r,l,o[0],6,-198630844),l=p(l,e,t,r,o[7],10,1126891415),r=p(r,l,e,t,o[14],15,-1416354905),t=p(t,r,l,e,o[5],21,-57434055),e=p(e,t,r,l,o[12],6,1700485571),l=p(l,e,t,r,o[3],10,-1894986606),r=p(r,l,e,t,o[10],15,-1051523),t=p(t,r,l,e,o[1],21,-2054922799),e=p(e,t,r,l,o[8],6,1873313359),l=p(l,e,t,r,o[15],10,-30611744),r=p(r,l,e,t,o[6],15,-1560198380),t=p(t,r,l,e,o[13],21,1309151649),e=p(e,t,r,l,o[4],6,-145523070),l=p(l,e,t,r,o[11],10,-1120210379),r=p(r,l,e,t,o[2],15,718787259),t=p(t,r,l,e,o[9],21,-343485551),n[0]=m(e,n[0]),n[1]=m(t,n[1]),n[2]=m(r,n[2]),n[3]=m(l,n[3])}function h(n,o,e,t,r,l){return o=m(m(o,n),m(t,l)),m(o<<r|o>>>32-r,e)}function u(n,o,e,t,r,l,f){return h(o&e|~o&t,n,o,r,l,f)}function d(n,o,e,t,r,l,f){return h(o&t|e&~t,n,o,r,l,f)}function s(n,o,e,t,r,l,f){return h(o^e^t,n,o,r,l,f)}function p(n,o,e,t,r,l,f){return h(e^(o|~t),n,o,r,l,f)}function B(n){let o=n.length,e=[1732584193,-271733879,-1732584194,271733878],t;for(t=64;t<=n.length;t+=64)k(e,O(n.substring(t-64,t)));n=n.substring(t-64);let r=Array.from({length:16},()=>0);for(t=0;t<n.length;t++)r[t>>2]|=n.charCodeAt(t)<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(k(e,r),t=0;t<16;t++)r[t]=0;return r[14]=o*8,k(e,r),e}function O(n){let o=[];for(let e=0;e<64;e+=4)o[e>>2]=n.charCodeAt(e)+(n.charCodeAt(e+1)<<8)+(n.charCodeAt(e+2)<<16)+(n.charCodeAt(e+3)<<24);return o}function P(n){let o="";for(let e=0;e<4;e++)o+=x[n>>e*8+4&15]+x[n>>e*8&15];return o}function W(n){for(let o=0;o<n.length;o++)n[o]=P(n[o]);return n.join("")}function A(n){return W(B(String(n||"")))}var x,m,z=I(()=>{x="0123456789abcdef".split(""),m=(n,o)=>n+o&4294967295,A("hello")!=="5d41402abc4b2a76b9719d911017c592"&&(m=(n,o)=>{let e=(n&65535)+(o&65535);return(n>>16)+(o>>16)+(e>>16)<<16|e&65535})});(()=>{console.log("Social AIO: Auto lock websites ENABLED");let n="auto_lock_website_manager_password",o="auto_lock_website_lockedWebsites",e="ufs_auto_lock_website_overlay",t=`${e}-style`;if(window.__fbaioAutoLockWebsiteInjected){window.__fbaioAutoLockWebsiteRefresh?.();return}window.__fbaioAutoLockWebsiteInjected=!0;let r=typeof browser<"u"?browser:typeof chrome<"u"?chrome:null,l=null,f=null,b=null;R();async function R(){window===window.top&&(window.__fbaioAutoLockWebsiteRefresh=v,await v(),r?.storage?.onChanged?.addListener?.(T))}async function T(i,c){if(c!=="local")return;let a=C(i,n),g=C(i,o);if(!(!a&&!g)){if(a&&i[n].newValue==null){f=null,b=null,$();return}await v()}}function C(i,c){return Object.prototype.hasOwnProperty.call(i||{},c)}async function v(){let i=await _(n,null);if(!i){$();return}let c=L(await _(o,[])),a=H(location.hostname,c);a?(f=i,b=a,G()):(b=null,$())}function L(i){return(Array.isArray(i)?i:[]).map(c=>String(c||"").trim().replace(/^[a-z][a-z0-9+.-]*:\/\//i,"").split(/[/?#]/)[0].toLowerCase().replace(/^www\./,"")).filter(Boolean)}function _(i,c){return new Promise(a=>{if(!r?.storage?.local){a(c);return}let g=w=>{if(r.runtime?.lastError){a(c);return}a(Object.prototype.hasOwnProperty.call(w||{},i)?w[i]:c)};r.storage.local.get([i],g)?.then?.(g).catch?.(()=>a(c))})}function q(i,c){return new Promise(a=>{if(!r?.storage?.local){a(null);return}r.storage.local.set({[i]:c},a)?.then?.(a).catch?.(a)})}async function D(i){if(!i)return!1;let c=L(await _(o,[]));return c.includes(i)?(await q(o,c.filter(a=>a!==i)),!0):!1}function H(i,c){let a=String(i||"").toLowerCase().replace(/\.$/,"");for(let g of c){let w=String(g||"").toLowerCase();if(!w)continue;let y=w.split("*").map(K=>K.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join(".*");if((!w.includes(".")&&!w.includes("*")?new RegExp(y):new RegExp(`^(?:.*\\.)?${y}$`)).test(a))return g}return!1}function $(){let i=document.getElementById(e),c=document.getElementById(t);i&&(i.style.top="-100vh"),c&&(c.disabled=!0)}function G(){let i=document.getElementById(e);if(i){let y=document.getElementById(t);i.style.top="0",i.style.opacity="1",y&&(y.disabled=!1);return}let c=document.createElement("style");c.id=t,c.textContent=`
      * :not(#${e}, #${e} *) {
        display: none !important;
      }
    `,(document.head||document.documentElement).appendChild(c);let a=document.createElement("div");a.id=e,a.innerHTML=`
      <h1>This websites has been Locked</h1>
      <input id="password" type="password" placeholder="Enter password to unlock.." autocomplete="new-password" />
      <div id="unlock-temporarly-container" title="Enable to unlock temporarly => will lock again if website reload">
        <input id="unlock-temporarly" type="checkbox" checked />
        <label for="unlock-temporarly" >Unlock temporarly</label>
      </div>
      <style>
        #${e} {
          position: fixed;
          top: -100vh;
          left: 0;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          background-color: #112;
          z-index: 2147483647;
          opacity: 0;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        #${e} > h1 {
          color: #ddd;
          font-size: 30px;
          text-align: center;
          font-family: monospace;
        }
        #${e} #unlock-temporarly-container {
          color: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
        #${e} #unlock-temporarly {
          width: 20px;
          height: 20px;
          padding: 0;
          margin: 0px;
          border: 1px solid #999;
          background-color: #e6e6e6;
          margin-right: 10px;
        }
        #${e} #unlock-temporarly:hover {
          background-color: #ccc;
        }
        #${e} #unlock-temporarly:active {
          background-color: #04aa6d;
        }
        #${e} > input {
          letter-spacing: normal;
          margin-top: 20px;
          font-size: 20px;
          padding: 10px;
          border-radius: 5px;
          border: none;
          outline: none;
          text-align: center;
          color: #ddd;
          background-color: #282828de;
          width: min(400px, calc(100vw - 32px));
        }
        #${e} > input:focus {
          background-color: #282828;
          box-shadow: 0px 5px 5px #555;
        }
        #${e} label {
          color: #ccc !important;
          background-color: transparent !important;
        }
      </style>
    `,window.setTimeout(()=>{a.style.opacity="1",a.style.top="0px"},0),document.documentElement.appendChild(a);let g=a.querySelector("input#unlock-temporarly"),w=a.querySelector("input#password");w.addEventListener("input",async y=>{l=l||(await Promise.resolve().then(()=>(z(),E))).md5,l(y.target.value)===f&&(a.style.top="-100vh",c.disabled=!0,w.value="",g.checked||await D(b))})}})()})();
