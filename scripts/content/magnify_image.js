(()=>{var he=Object.defineProperty,ee=(s,u)=>()=>(s&&(u=s(s=0)),u),te=(s,u)=>{for(var h in u)he(s,h,{get:u[h],enumerable:!0})},ie={};te(ie,{default:()=>ae});var ae,fe=ee(()=>{ae=[{name:"soundcloud",src:/sndcdn\.com/,r:/-t\d+x\d+\./,s:["-t500x500.","-t240x240."]},{name:"reddit",src:/redditmedia/,r:/\?.*/,s:""},{name:"britannica",src:/britannica\.com/,r:/\?.*/,s:""},{name:"steam static",src:/steamstatic\.com\/steam\/apps/,r:/(_|\.)\d{2,}x\d{2,}\./,s:"."},{name:"pexels",src:[/pexels\.com\/users\/avatars/,/images\.pexels\.com\/photos/],r:/\?.*/,s:""},{name:"maze.guru",src:/maze(\.|-)guru(.*?)\/image\//,r:/\?x-image-process.*/,s:""},{name:"pixai",src:/pixai\.art\/images\//,r:/\/stillThumb\//,s:"/orig/"},{name:"googleusercontent",src:/\.googleusercontent\./i,r:/\=s\d+.*/i,s:"=s0"},{name:"gitlab",src:/gitlab\.(.*?)\/uploads\//i,r:/\?width=\d+/i,s:""},{name:"font gstatic",src:/^https?:\/\/fonts\.gstatic\.com\/(.*)\/notoemoji/i,r:/(https?:\/\/.*)\/\d+.(png|jpg)(.*?)(=s\d+)?/,s:"$1/512.$2"},{name:"artstation",url:/artstation\.com/,r:[/\/(avatars\/+\/)?medium\//i,/\/(\d{14}\/)?smaller_square\//i,/\/(\d{14}\/)?thumbnail\//i],s:"/large/"},{name:"123rf",url:/123rf\.com/,r:/us\.123rf\.com\/\d+wm\//i,s:"previews.123rf.com/images/"},{name:"wikipedia",url:/^https?:\/\/.+\.(wikipedia|wikimedia)\.org\//i,src:/^https?:\/\/.+\.wikimedia\.org\//i,r:/(https?:\/\/.*)\/thumb(\/.*)\/\d+px-.*/i,s:"$1$2"},{name:"trakt.tv",url:/^http:\/\/trakt\.tv\//i,example:"http://trakt.tv/shows",r:/(.*\/images\/posters\/\d+)-(?:300|138)\.jpg\?(\d+)$/i,s:"$1.jpg?$2"},{name:"Steampowered",url:/\.steampowered\.com/,r:/\.\d+x\d+\.jpg/i,s:".jpg"},{name:"Steamcommunity",url:/steamcommunity\.com/,r:/output\-quality=\d+&fit=inside\|\d+\:\d+/i,s:"output-quality=100&fit=inside|0:0"},{name:"500px",url:/500px\./,r:[/\/w%3D\d+_h%3D\d+\/v2.*/i,/^((?:(?:pp?cdn|s\\d\\.amazonaws\\.com\/photos|gp\\d+\\.wac\\.edgecastcdn\\.net\/806614\/photos\/photos)\\.500px|djlhggipcyllo\\.cloudfront)\\.(?:net|org)\/\\d+\/[\\da-f]{40}\/)\\d+\\./],s:["/m%3D2048_k%3D1_of%3D1/v2","$12048.jpg"]},{name:"Nyaa",url:/nyaa\.se/,r:/upload\/small\//i,s:"upload/big/"},{name:"itunes",url:/itunes\.apple\.com/,r:/\d+x\d+bb\./i,s:"1400x1400bb."},{name:"dribbble",url:/dribbble\.com/,r:[/_teaser(.[^\.]+)$/i,/_1x\./i,/\?compress=.*/],s:["$1",".",""]},{name:"Tumblr",url:/tumblr\.com/,exclude:/\/avatar_/i,r:[/[^\/]*(media\.tumblr\.com.*_)\d+(\.[^\.]+)$/i,/(media\.tumblr\.com.*_)[^_]+(\.[^\.]+)$/i],s:["$1raw$2","$1512$2"]},{name:"Pixiv",url:/pixiv\.net|pximg\.net/,src:/pximg\.net\/c\/\d+x\d+/i,r:/pximg\.net\/c\/\d+x\d+.*\/img\/(.*)_.*$/i,s:["pximg.net/img-original/img/$1.jpg","pximg.net/img-original/img/$1.png"]},{name:"moegirl",url:/(moegirl|mengniang)\.org/,r:/(common)\/thumb(.*)\/[^\/]+/i,s:"$1$2"},{name:"fanfou",url:/fanfou\.com/,r:/@.+/i,s:""},{name:"meitudata",url:/meipai\.com/,r:/!thumb.+/i,s:""},{name:"mafengwo",url:/mafengwo\.cn/,r:/\?imageMogr.*/i,s:""},{name:"discordapp",url:/(discordapp\.|discord\.)(com|net)/,r:/\?width=\d+&height=\d+$/i,s:""},{name:"Fandom",url:/fandom\.com/,r:[/scale\-to\-width\-down\/\d+/i,/smart\/width\/\d+\/height\/\d+/i],s:["",""]},{name:"Zhisheji",url:/zhisheji\.com/,r:/thumbnail\/.*/i,s:""},{name:"imgbox",src:/imgbox\.com/,r:/thumbs(\d\.imgbox.*)_t\./i,s:"images$1_o."},{name:"Reddit",url:/reddit\.com|redd\.it/,r:/https?:\/\/preview\.redd.it\/([^\?]+)?.*/i,s:"https://i.redd.it/$1"},{name:"Rule34hentai",url:/rule34hentai\.net/,r:"/_thumbs/",s:"/_images/"},{name:"Rule34",url:/rule34\.xxx/,src:/\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_/i,r:/\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_(.*)\..*/i,s:["/images/$2/$4.jpeg","/images/$2/$4.png","/images/$2/$4.jpg"]},{name:"Photosight",url:/photosight\.ru/,r:/(cdny\.de.*\/)t\//i,s:"$1x/"},{name:"588ku",url:/588ku\.com/,r:/!\/fw.*/,s:""},{name:"gelbooru",url:/gelbooru\.com/,src:/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_/i,r:/.*\/(thumbnails|samples)\/(.*)\/(thumbnail|sample)_(.*)\..*/i,s:["https://img3.gelbooru.com/images/$2/$4.png","https://img3.gelbooru.com/images/$2/$4.jpg","https://img3.gelbooru.com/images/$2/$4.gif"]},{name:"donmai",url:/donmai\.us/,src:/(thumbnails|sample)\/(.*)\/(thumbnail|sample)_|\/\d+x\d+\//i,r:[/\/(thumbnails|sample)\/(.*)\/(thumbnail|sample)_(.*)/i,/\/\d+x\d+\//i,/\/\d+x\d+\/(.*)\.(.*)/i],s:["/original/$2/$4","/original/",["/original/$1.jpg","/original/$1.png","/original/$1.gif"]]},{name:"erosberry",url:/erosberry\.com/,r:/(\/\d+\/)tn_(\d+\.[^\/]+)$/i,s:"$1$2"},{name:"javdb",url:/javdb/,r:"/thumbs/",s:"/covers/"},{name:"javbus",url:/javbus\.|busjav\./,r:/\/thumbs?(\/\w+)\.jpg$/i,s:"/cover$1_b.jpg"},{name:"avmoo",url:/avmoo\./,r:"ps.jpg",s:"pl.jpg"},{name:"asiansister",url:/asiansister\.com/,r:"_t.",s:"."},{name:"jianshu",url:/jianshu\.com/,r:/(upload-images\.jianshu\.io\/.*)\?.*/i,s:"$1"},{name:"wikiart",url:/wikiart\.org/,r:/!.*/i,s:""},{name:"weibo",url:/sinaimg/,r:[/(\.sinaimg\.(cn|com)\/)(?:bmiddle|orj360|mw\d+)/i,/(\.sinaimg\.(cn|com)\/)(?:square|thumbnail)/i,/(\.sinaimg\.(cn|com)\/\d+)\/50\//i,/k\.sinaimg\.cn\/n\/(.*)\/(w\d+)?h\d+[^\/]+$/,/thumb\d+/],s:["$1large","$1mw1024","$1/180/","n.sinaimg.cn/$1","mw690"]},{name:"gravatar",src:/gravatar\.com\/avatar\/|\/gravatar\//i,r:/(avatar\/.*[\?&]s=)\d+(.*)/,s:"$19999$2"},{name:"ucServerAvatar",src:/uc_server\/avatar\.php/i,r:/(uc_server\/avatar\.php\?uid=\d+&size=).*/,s:"$1big"},{name:"md",src:/\.md\./i,r:/\.md(\.[^\.]+)$/i,s:"$1"},{name:"ytimg",src:/i\.ytimg\.com/i,exclude:/mqdefault_6s/i,r:/(.*?)(\w+)(\.\w+)(\?.+)?$/i,s:["$1maxresdefault$3","$1hqdefault$3"]},{name:"meituan",url:/\.meituan\.net/i,r:/\/avatar\/\w{2}/i,s:"/avatar/o0"},{name:"hdslb",src:/hdslb\.com\//i,r:/@.*/i,s:""},{name:"coolapk",url:/\.coolapk\.com\//i,r:/\.s\.\w+$/i,s:""},{name:"aicdn",src:/\.aicdn\.com\//i,r:/_fw\d+$/i,s:""},{name:"duitang",url:/duitang\.com\//i,r:/.thumb.(\d+_)?\d*(_c)?\./i,s:"."},{name:"imgur",src:/imgur\.com\//i,r:[/h(\.[^\/]+)$/i,/maxwidth=\d+/i,/s=\d+/],s:["$1","maxwidth=99999",""]},{name:"dmm",src:/pics\.dmm\.co\.jp/i,r:"ps.jpg",s:"pl.jpg"},{name:"whd",src:/\/w\/\d+\/h\/\d+($|\/|\?)/i,r:/\/w\/\d+\/h\/\d+/i,s:""},{name:"\u767E\u5EA6\u56FE\u7247\u3001\u8D34\u5427\u7B49",src:/(hiphotos|imgsrc)\.baidu\.com/i,r:/(hiphotos|imgsrc)\.baidu\.com\/(.+?)\/.+?([0-9a-f]{40})/i,s:"$1.baidu.com/$2/pic/item/$3"},{name:"pixiv",src:/pixiv\.net/i,r:/(pixiv.net\/img\d+\/img\/.+\/\d+)_[ms]\.(\w{2,5})$/i,s:"$1.$2"},{name:"taobaocdn",src:/(taobaocdn|alicdn)\.com/i,r:[/.*((?:img\d\d\.taobaocdn|img(?:[^.]*\.?){1,2}?\.alicdn)\.com\/)(?:img\/|tps\/http:\/\/img\d\d+\.taobaocdn\.com\/)?((?:imgextra|bao\/uploaded)\/.+\.(?:jpe?g|png|gif|bmp))_.+\.jpg$/i,/(.*\.alicdn\.com\/.*?)((.jpg|.png)(\.|_)\d+x\d+.*)\.jpg(_\.webp)?$/i,/(.*\.alicdn\.com\/.*?)((\.|_)\d+x\d+.*|\.search|\.summ)\.jpg(_\.webp)?$/i],s:["http://$1$2","$1$3","$1.jpg"]},{name:"yihaodianimg",url:/yhd\.com/i,src:/yihaodianimg\.com/i,r:/(.*\.yihaodianimg\.com\/.*)_\d+x\d+\.jpg$/i,s:"$1.jpg"},{name:"jd",url:/jd\.com/i,src:/360buyimg\.com/i,r:[/(.*360buyimg\.com\/)n\d\/.+?\_(.*)/i,/(.*360buyimg\.com\/)n\d\/(.*)/i,/(.*360buyimg\.com\/.*)s\d+x\d+_(.*)/i],s:["$1imgzone/$2","$1n0/$2","$1$2"]},{name:"dangdang",url:/dangdang\.com/i,src:/ddimg\.cn/i,r:/(.*ddimg.cn\/.*?)_[bw]_(\d+\.jpg$)/i,s:"$1_e_$2"},{name:"duokan",url:/duokan\.com/i,r:/(cover.read.duokan.com.*?\.jpg)!\w+$/i,s:"$1"},{name:"yyets",url:/yyets\.com/i,r:/^(res\.yyets\.com.*?\/ftp\/(?:attachment\/)?\d+\/\d+)\/[ms]_(.*)/i,s:"http://$1/$2"},{name:"mozilla",url:/addons\.mozilla\.org/i,r:"addons.cdn.mozilla.net/user-media/previews/thumbs/",s:"/thumbs/full/"},{name:"firefox",url:/firefox\.net\.cn/i,r:"www.firefox.net.cn/attachment/thumb/",s:"www.firefox.net.cn/attachment/"},{name:"crsky",url:/\.crsky\.com/i,r:/pic\.crsky\.com.*_s\.gif$/i,s:"/_s././",example:"http://www.crsky.com/soft/5357.html"},{name:"zol",url:/\.zol\.com/i,r:/(\w+\.zol-img\.com\.cn\/product\/\d+)_\d+x\d+\/(.*\.jpg)/i,s:"$1/$2",example:"http://detail.zol.com.cn/240/239857/pic.shtml"},{name:"yesky",url:/\.yesky\.com/i,r:/_\d+x\d+\.([a-z]+)$/i,s:".$1",example:"http://game.yesky.com/tupian/165/37968665.shtml"},{name:"\u5DF4\u54C8\u59C6\u7279",url:/^https:\/\/\w+\.gamer\.com\.tw/,src:/bahamut\.com\.tw/,r:"/S/",s:"/B/"},{name:"sgamer",url:/\.sgamer\.com/i,r:/\/s([^\.\/]+\.[a-z]+$)/i,s:"/$1",example:"http://dota2.sgamer.com/albums/201407/8263_330866.html"},{name:"nhentai",url:/nhentai\.net/i,r:/\/\/\w+(\..*\/)(\d+)t(\.[a-z]+)$/i,s:"//i$1$2$3",example:"http://nhentai.net/g/113475/"},{name:"GithubAvatars",url:/github\.com/i,r:/(avatars\d*\.githubusercontent\.com.*)\?.*$/i,s:"$1",example:"https://avatars2.githubusercontent.com/u/3233275/"},{name:"ggpht",src:/ggpht\.com/i,r:/=s\d+.*/i,s:"=s0"},{name:"kodansha",url:/kodansha\.co\.jp/i,src:/kodansha\.co\.jp/i,r:"t_og_image_center",s:"c_limit"},{name:"fanseven",url:/fanseven\.com/i,src:/fanseven\.com/i,r:/w=\d+&h=\d+/i,s:"w=9999&h=9999"},{name:"hentai-cosplays",url:/^https:\/\/(.*\.)?(hentai\-cosplays|porn\-images\-xxx)\.com/,r:/\/p=[\dx]+(\/\d+\.\w+)$/i,s:"$1"},{name:"imdb",url:/^https?:\/\/www\.imdb\.com/,src:/media\-amazon/,r:/@.*(\.\w)/i,s:"@$1"},{name:"\u96EA\u7403",url:/^https?:\/\/xueqiu\.com\//,src:/^https?:\/\/xqimg\.imedao\.com\//i,r:/!\d+(x\d+[a-z]?)?\.\w+$/,s:""},{name:"\u5C0F\u4F17\u8BBA\u575B",url:/^https?:\/\/meta\.appinn\.net/,src:/meta\-cdn/,r:/\/optimized\/(.*)_\d+_\d+x\d+(\.\w+)$/,s:"/original/$1$2"},{name:"\u8BF1\u60D1\u798F\u5229\u56FE",url:/www\.yhflt\.com/,src:/imgs\.yhflt\.com/,r:/imgs(\..*\/)q/,s:"pic$1"},{name:"blogger",src:/blogger\.googleusercontent\.com\/img/,r:/\/[sw]\d+\/.*/,s:"/s0"},{name:"\u714E\u86CB",url:/^https:\/\/jandan\.net\//,r:[/\/(thumb\d+|mw\d+)\//,/!square/],s:["/large/",""]},{name:"\u8F89\u591C\u767D\u5154",url:/47\.101\.137\.235/,r:"thumb",s:"regular"},{name:"Civitai",url:/^https:\/\/civitai\.com\//,r:/\/width=\d+\//,s:"/"}]}),re={};te(re,{getLargestImageSrc:()=>be});async function be(s,u=location.href){if(/^data:/i.test(s))return null;s=xe(s);let h=await ve(s);h&&(s=h);function _(){let m=new URL(s);switch(m.hostname){case"atlassiansuite.mservice.com.vn":case"atlassiantool.mservice.com.vn":return m.href.includes("avatar")&&(m.searchParams.get("size")?m.searchParams.set("size","256"):m.searchParams.append("size","256")),m.href.includes("/thumbnail/")?m.href.replace("/thumbnail/","/attachments/"):m.href.includes("/thumbnails/")?m.href.replace("/thumbnails/","/attachments/"):m.toString()}return null}async function y(){if(!W.largeImgSiteRules){let m=await Promise.resolve().then(()=>(fe(),ie));W.largeImgSiteRules=m.default}for(let m of W.largeImgSiteRules)if(!(m.url&&!G(u,m.url))&&!(m.src&&!G(s,m.src))&&!(m.exclude&&G(s,m.exclude))&&m.r){let r=ke(s,m.r,m.s);if(r?.length)return r}return null}function E(){return new Promise(m=>{let r=null;if(r=s.match(/^(https?:\/\/lh\d+\.googleusercontent\.com\/.+\/)([^\/]+)(\/[^\/]+(\.(jpg|jpeg|gif|png|bmp|webp))?)(?:\?.+)?$/i))r[2]!="s0"&&m(r[1]+"s0"+r[3]);else if(r=s.match(/^(https?:\/\/lh\d+\.googleusercontent\.com\/.+=)(.+)(?:\?.+)?$/i))r[2]!="s0"&&m(r[1]+"s0");else if(r=s.match(/^(https?:\/\/\w+\.ggpht\.com\/.+\/)([^\/]+)(\/[^\/]+(\.(jpg|jpeg|gif|png|bmp|webp))?)(?:\?.+)?$/i))r[2]!="s0"&&m(r[1]+"s0"+r[3]);else if(r=s.match(/^(https?:\/\/\w+\.bp\.blogspot\.com\/.+\/)([^\/]+)(\/[^\/]+(\.(jpg|jpeg|gif|png|bmp|webp))?)(?:\?.+)?$/i))r[2]!="s0"&&m(r[1]+"s0"+r[3]);else if(r=s.match(/^(https?:\/\/\d+\.media\.tumblr\.com\/.*tumblr_\w+_)(\d+)(\.(jpg|jpeg|gif|png|bmp|webp))(?:\?.+)?$/i)){if(r[2]<1280){let $=new XMLHttpRequest;$.onreadystatechange=function(){$.status==200&&m(r[1]+"1280"+r[3])},$.open("HEAD",r[1]+"1280"+r[3],!0),$.send()}}else if(r=s.match(/^(https?:\/\/\w+\.twimg\.com\/media\/[^\/:]+)\.(jpg|jpeg|gif|png|bmp|webp)(:\w+)?$/i)){let $=r[2];r[2]=="jpeg"&&($="jpg"),m(r[1]+"?format="+$+"&name=orig")}else if(r=s.match(/^(https?:\/\/\w+\.twimg\.com\/.+)(\?.+)$/i)){let $=new URL(u).searchParams;if(!$.format||!$.name||$.name=="orig")return;m(r[1]+"?format="+$.format+"&name=orig")}else(r=s.match(/^(https?:\/\/(images\.akamai\.steamusercontent\.com|steamuserimages-a\.akamaihd\.net)\/[^\?]+)\?.+$/i))?m(r[1]):(r=s.match(/^(https?:\/\/(?:(?:ww|wx|ws|tvax|tva)\d+|wxt|wt)\.sinaimg\.(?:cn|com)\/)([\w\.]+)(\/.+)(?:\?.+)?$/i))?r[2]!="large"&&m(r[1]+"large"+r[3]):(r=s.match(/^(https?:\/\/.+\.zhimg\.com\/)(?:\d+\/)?([\w\-]+_)(\w+)(\.(jpg|jpeg|gif|png|bmp|webp))(?:\?.+)?$/i))?r[3]!="r"&&m(r[1]+r[2]+"r"+r[4]):(r=s.match(/^(https?:\/\/i\.pinimg\.com\/)(\w+)(\/.+)$/i))||(r=s.match(/^(https?:\/\/s-media[\w-]+\.pinimg\.com\/)(\w+)(\/.+)$/i))?r[2]!="originals"&&m(r[1]+"originals"+r[3]):(r=s.match(/^(https?:\/\/\w+\.hdslb\.com\/.+\.(jpg|jpeg|gif|png|bmp|webp))(@|_).+$/i))||(r=s.match(/^(https?:\/\/(?:.+?)\.alicdn\.com\/.+\.(jpg|jpeg|gif|png|bmp|webp))_.+$/i))?m(r[1]):(r=s.match(/^(https?:\/\/(?:img\d+)\.360buyimg\.com\/)((?:.+?)\/(?:.+?))(\/(?:.+?))(\!.+)?$/i))?r[2]!="sku/jfs"&&m(r[1]+"sku/jfs"+r[3]):(r=s.match(/^(https?:\/\/(?:.+?)\.riotpixels\.net\/.+\.(jpg|jpeg|gif|png|bmp|webp))\..+?$/i))?m(r[1]):(r=s.match(/^https?:\/\/preview\.redd\.it\/(.+\.(jpg|jpeg|gif|png|bmp|webp))\?.+?$/i))?m("https://i.redd.it/"+r[1]):(r=s.match(/^(https:\/\/.+\.akamaized\.net\/imagecache\/\d+\/\d+\/\d+\/\d+\/)(\d+)(\/.+)$/i))?r[2]<1920&&m(r[1]+"1920"+r[3]):(r=s.match(/^(https:\/\/mmbiz\.qpic\.cn\/mmbiz_jpg\/.+?\/)(\d+)(\?wx_fmt=jpeg)/i))?r[2]!=0&&m(r[1]+"0"+r[3]):(r=s.match(/^https?:\/\/imgsrc\.baidu\.com\/forum\/pic\/item\/.+/i))?(r=s.match(/^(https?):\/\/(?:imgsrc|imgsa|\w+\.hiphotos)\.(?:bdimg|baidu)\.com\/(?:forum|album)\/.+\/(\w+\.(?:jpg|jpeg|gif|png|bmp|webp))(?:\?.+)?$/i))&&m(r[1]+"://imgsrc.baidu.com/forum/pic/item/"+r[2]):m(null)})}for(let m of[_,y,E])try{let r=await $e(m(),5e3);if(r&&r!=s&&(Array.isArray(r)||(r=[r]),r.length)){let $=await ye(r,!0);if($?.length)return $}}catch(r){console.log("ERROR getLargestImageSrc: "+m.name+" -> ",r)}return null}function ye(s,u=!0){return new Promise((h,_)=>{if(!s||!Array.isArray(s)||s.length===0)_("srcs is falsy, not an array, or empty");else{let y=m=>we(m).then(r=>(u||r&&h(m),r)),E=s.map(y);Promise.all(E).then(m=>{let r=m.indexOf(!0);r>-1?h(s[r]):_("none of the URLs are valid images")})}})}async function we(s){try{let u=await fetch(s,{method:"HEAD",redirect:"follow"});if(u?.ok&&u.headers?.get?.("content-type")?.startsWith?.("image/"))return!0}catch(u){console.log("ERROR isImageSrc: "+s+" -> ",u)}return new Promise(u=>{let h=new Image;h.src=s,h.onload=()=>u(!0),h.onerror=()=>u(!1)})}function xe(s){try{return new URL(s,location.href).href}catch{return s}}async function ve(s){try{let u=await fetch(s,{method:"HEAD",redirect:"follow"});if(u?.ok&&u.url&&u.url!==s)return u.url}catch{}return null}function $e(s,u){return Promise.race([s,new Promise((h,_)=>setTimeout(()=>_("time out "+u),u))])}function _e(s){return Array.from(new Set(s))}function ke(s,u,h){let _=[];if(!Array.isArray(u)&&!Array.isArray(h))u?.test?.(s)&&_.push(s.replace(u,h));else if(!Array.isArray(u)&&Array.isArray(h)){if(u?.test?.(s))for(let y of h)_.push(s.replace(u,y))}else if(Array.isArray(u)&&!Array.isArray(h))for(let y of u)y?.test?.(s)&&_.push(s.replace(y,h));else if(Array.isArray(u)&&Array.isArray(h))for(let y=0;y<u.length;y++){let E=u[y];if(E?.test?.(s)){let m=Array.isArray(h[y])?h[y]:[h[y]];for(let r of m)_.push(s.replace(E,r))}}return _e(_)}function G(s,u){Array.isArray(u)||(u=[u]);for(let h of u)if(h?.test?.(s))return!0;return!1}var W,je=ee(()=>{W={}});(()=>{let s="__FBAIO_MAGNIFY_IMAGE__",u="magnify_image_ctrl_enabled",h="magnify_image_auto_largest_src_enabled",_="ufs_magnify_image_size";if(window[s])return;window[s]=!0,console.log("FB AIO: magnify image ENABLED");let y={mouse:{x:0,y:0},autoLargestImageSrcEnabled:!0,hoverMinSize:{width:20,height:20}},E=null,m={none:"none",transparent:"transparent",dark:"dark",light:"light"},r=`Google lens | https://lens.google.com/uploadbyurl?url=#t#
Google image | https://www.google.com/searchbyimage?safe=off&sbisrc=1&image_url=#t#
Yandex | https://yandex.com/images/search?source=collections&rpt=imageview&url=#t#
SauceNAO | https://saucenao.com/search.php?db=999&url=#t#
IQDB | https://iqdb.org/?url=#t#
3D IQDB | https://3d.iqdb.org/?url=#t#
Baidu | https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=#t#
Bing | https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:#t#
TinEye | https://www.tineye.com/search?url=#t#
Sogou | https://pic.sogou.com/ris?query=#t#
360 | http://st.so.com/stu?imgurl=#t#
WhatAnime | https://trace.moe/?url=#t#
Ascii2D | https://ascii2d.net/search/url/#t#
Trace Moe | https://trace.moe/?url=#t#
KarmaDecay | http://karmadecay.com/#t#
QRCode decode | https://zxing.org/w/decode?full=true&u=#t#
QRCode | https://hoothin.com/qrcode/##t#
ImgOps | https://imgops.com/#b#`,$=["src","_src","href","xlink:href","poster","data-lazy-src","org_src","data-lazy","data-url","data-orig-file","zoomfile","file","original","load-src","imgsrc","real_src","src2","origin-src","data-lazyload","data-lazyload-src","data-lazy-load-src","data-ks-lazyload","data-ks-lazyload-custom","data-src","data-defer-src","data-actualsrc","data-cover","data-original","data-thumb","data-imageurl","data-placeholder","lazysrc"];window.addEventListener("mousemove",e=>{y.mouse.x=e.clientX,y.mouse.y=e.clientY}),Se(),ze(),Ae(),Le(),window===window.top&&(Ee(),window.addEventListener("message",async e=>{let{data:t,type:i}=e.data||{};if(i!=="fbaio-magnify-image-hover")return;let a=t?.largestResolved?t?.srcs:await V(t?.srcs);a?.length>1?ue(a,t?.x,t?.y):a?.length===1&&Z(a[0],t?.x,t?.y)}));async function ze(){ne(await K(h,!0)),U()?.storage?.onChanged?.addListener?.((e,t)=>{t==="local"&&e?.[h]&&ne(e[h].newValue!==!1)})}function ne(e){y.autoLargestImageSrcEnabled=e!==!1}async function Ae(){oe(await K(_,"20x20")),U()?.storage?.onChanged?.addListener?.((e,t)=>{t==="local"&&e?.[_]&&oe(e[_].newValue)})}function oe(e){y.hoverMinSize=se(e)}function se(e){if(typeof e=="string"){let[a,n]=e.split("x");return se({width:a,height:n})}let t=le(e?.width),i=le(e?.height);return{width:t??20,height:i??20}}function le(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,Math.round(t)):null}async function Ee(){me(await K(u,!0)),U()?.storage?.onChanged?.addListener?.((e,t)=>{t==="local"&&e?.[u]&&me(e[u].newValue!==!1)})}function me(e){if(!e){E?.(),E=null;return}E||(E=qe("Control",()=>{let t=Q();Ce(t.x,t.y)}))}function K(e,t){return new Promise(i=>{let a=U(),n=a?.storage?.local;if(!n?.get){i(t);return}try{n.get([e],c=>{if(a?.runtime?.lastError){i(t);return}i(c?.[e]??t)})?.then?.(c=>{i(c?.[e]??t)},()=>i(t))}catch{i(t)}})}function U(){return globalThis.chrome||globalThis.browser||null}function Le(){let e=null,t=document.createElement("div");t.id="fbaio-magnify-image-hover-div",t.title="Useful-script: Click to magnify",t.classList.add("hide"),t.addEventListener("click",async a=>{if(a.preventDefault(),a.stopPropagation(),!e)return;let n=y.autoLargestImageSrcEnabled,c=await V(e?.srcs);window.top.postMessage({type:"fbaio-magnify-image-hover",data:{srcs:c,largestResolved:n,x:e?.rect?.left,y:e?.rect?.top}},"*")});function i(){t.isConnected||(document.body||document.documentElement).appendChild(t)}i(),new MutationObserver(i).observe(document.documentElement,{childList:!0}),window.addEventListener("mouseover",a=>{let n=a.target;if(!n||n===t)return;let{width:c,height:g}=y.hoverMinSize;if(n.clientWidth<c||n.clientHeight<g)return;let o=ce(n);if(!o?.length){t.classList.toggle("hide",n!==t);return}let d=Me(n);(d.width<30||d.height<30)&&(d.top-=d.width/2,d.left-=d.height/2),d.left=Math.max(d.left,0),d.top=Math.max(d.top,0),e={srcs:o,rect:d,target:n},t.style.left=d.left+"px",t.style.top=d.top+"px",t.classList.toggle("hide",!1)},!0)}function Se(){let e="fbaio-magnify-image-css";if(document.querySelector("#"+e))return;let t=document.createElement("style");t.id=e,t.textContent=`
.fbaio-click-to-magnify-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 16777270;
}

/* --------------------- Choose image ------------------------- */
#fbaio-magnify-choose-image {
  position: fixed;
  width: 0;
  height: 0;
  opacity: 0;
  border-radius: 50%;
  background-color: #000b;
  z-index: 16777270;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease, background 0s ease;
}

#fbaio-magnify-choose-image .fbaio-img-container {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;
}

#fbaio-magnify-choose-image .fbaio-con {
  position: relative;
}

#fbaio-magnify-choose-image .fbaio-size {
  position: absolute;
  top: 0px;
  left: 0px;
  color: #eee;
  background-color: #0005;
  opacity: 0.5;
  z-index: 2;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s ease;
  pointer-events: none;
}

#fbaio-magnify-choose-image .fbaio-con:hover .fbaio-size {
  opacity: 1;
  background-color: #000a;
}

#fbaio-magnify-choose-image img {
  max-width: 300px;
  max-height: 300px;
  min-width: 50px;
  min-height: 50px;
  object-fit: contain;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

#fbaio-magnify-choose-image .fbaio-con:hover img {
  transform: scale(1.1);
  z-index: 2;
  box-shadow: 0 0 10px #fffa;
}

/* --------------------- Magnify image --------------------- */

#fbaio-magnify-image * {
  font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif !important;
  font-size: 14px !important;
}

#fbaio-magnify-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000b;
  z-index: 2147483647;
  overflow: hidden;
  text-align: left !important;
}

.fbaio-toolbar {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  z-index: 2;
  text-align: center;
  width: max-content;
}

#fbaio-magnify-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  cursor: zoom-out;
}

.fbaio-btn {
  cursor: pointer;
  padding: 10px;
  margin: 0;
  line-height: 100%;
  background-color: #111d;
  z-index: 1;
  min-width: 10px;
  border: none;
  user-select: none;
}

.fbaio-btn:hover {
  background: #555d;
}

.fbaio-desc {
  position: absolute;
  top: 0;
  opacity: 0;
  background: #333;
  padding: 0 10px 5px;
  border-radius: 0 0 5px 5px;
  pointer-events: none;
  z-index: 0;
  inline-size: max-content;
  transition: all 0.3s ease;
}

.fbaio-toolbar:hover .fbaio-desc {
  top: 100%;
  opacity: 1;
}

#fbaio-magnify-image img {
  transition: transform 0.15s ease, opacity 0.5s ease 0.15s;
}

#fbaio-magnify-image .fbaio-img-anim {
  position: fixed;
  transition: all 0.3s ease !important;
  transform-origin: center;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: #fffa;
  border-radius: 50%;
}


#fbaio-magnify-image .fbaio-dropdown-menu {
  position: relative;
}

#fbaio-magnify-image .fbaio-dropdown-menu:hover ul {
  opacity: 1;
  height: max-content;
}

#fbaio-magnify-image .fbaio-dropdown-menu ul {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 0 0 5px 5px;
  list-style: none;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.2s ease;
}

#fbaio-magnify-image .fbaio-dropdown-menu ul li {
  padding: 5px;
  text-align: left;
}

#fbaio-magnify-image-hover-div {
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 15px;
  height: 15px;
  z-index: 99999999;
  background-color: #3339;
  border: 1px #eee9 solid;
  border-radius: 50%;
  transition: all 0.2s ease;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0.5;
}

#fbaio-magnify-image-hover-div:hover {
  background-color: #eee9;
  border: 1px #3339 solid;
  width: 30px;
  height: 30px;
  opacity: 1;
}

#fbaio-magnify-image-hover-div.hide {
  opacity: 0;
  display: block !important;
}

#fbaio-magnify-image-hover-div.hide:not(:hover) {
  opacity: 0;
  transition: all 0.2s 2s ease;
}
`,(document.head||document.documentElement).appendChild(t)}function Q(){return y.mouse}function P(e,t){if(e==null||t==null){let i=Q();return{x:i.x??e??0,y:i.y??t??0}}return{x:e,y:t}}function Ce(e,t){let i=P(e,t),a,n=!1;setTimeout(()=>{n||(a=Be(i.x,i.y,40,"","background: #eee9;"))},100),De(e,t).then(async c=>{if(n=!0,a?.(),!c?.length){J({msg:"Useful-script: No image found",x:i.x,y:i.y,align:"left"});return}let g=await V(c.map(o=>o.src));g?.length?g.length===1?Z(g[0],i.x,i.y):ue(g,i.x,i.y):J({msg:"Useful-script: No image found",x:i.x,y:i.y,align:"left"})})}async function V(e){if(Array.isArray(e)||(e=e?[e]:[]),!e.length||!y.autoLargestImageSrcEnabled)return e;let t=await Promise.all(e.map(async i=>{if(!/^https?:\/\//i.test(i))return i;try{y.largestImageSrcModule=y.largestImageSrcModule||Promise.resolve().then(()=>(je(),re));let{getLargestImageSrc:a}=await y.largestImageSrcModule;return await a(i,location.href)||i}catch(a){return console.log("ERROR resolveLargestImageSrcs: ",a),i}}));return Array.from(new Set(t.filter(Boolean)))}function Re(e){try{return new URL(e,location.href).href}catch{return e}}function Ie(e){return!e||e.nodeName?.toUpperCase?.()==="HTML"||e.nodeName==="#document"?!1:["","::before","::after"].map(t=>{let i=window.getComputedStyle(e,t).backgroundImage;return i?i.split(",").map(a=>a.match(/url\((['"]?)(.*?)\1\)/)?.[2]).filter(a=>a!==null):null}).flat().filter(t=>t)}function ce(e){if(!e)return null;let t=[()=>{let a=e.srcset||e.getAttribute?.("srcset");if(!a){let n=e.children;if(n?.length){a="";for(let c=0;c<n.length;c++){let g=n[c].srcset;g&&(a+=g+", ")}}}if(a)return Te(a)},()=>{for(let a in $){let n=$[a],c=n in e?e[n]:e.getAttribute?.(n);if(!/\bimagecover\.\w+$/i.test(c)&&c)return c}},()=>Ie(e),()=>{if(/image/i.test(e.tagName))return e.getAttribute("href");if(/svg/i.test(e.tagName))return[Pe(e),Ue(e)];if(/canvas/i.test(e.tagName))return e.toDataURL();if(/video/i.test(e.tagName)){let a=document.createElement("canvas");a.width=e.videoWidth,a.height=e.videoHeight,a.getContext("2d").drawImage(e,0,0);let n=a.toDataURL();return a.remove(),n}}],i=[];for(let a of t)try{let n=a();n&&n?.length&&(Array.isArray(n)||(n=[n]),i=i.concat(n.map(c=>Re(c))))}catch{}return Array.from(new Set(i.filter(Boolean)))}function de(e){let t=[],i=e.children;if(i?.length){t=t.concat(Array.from(i));for(let a of i)t=t.concat(de(a))}return t}function Te(e){let t=e.split(/[xw],/i),i=-1,a=null;return t.length?(t.forEach(n=>{let c=n.trim().split(/(\s+|%20)/),g=parseInt(c[2]||0);c[0]&&g>i&&(i=g,a=c[0])}),a):null}async function De(e,t){let i=Array.from(document.querySelectorAll("*")),a=P(e,t),n=[];if(i=i.reverse().filter(g=>{let o=g.getBoundingClientRect(),d=o.left<=a.x&&o.right>=a.x&&o.top<=a.y&&o.bottom>=a.y;if(d&&/picture|img/i.test(g.tagName)){let f=Array.from(g.querySelectorAll("source"));f?.length&&(n=n.concat(f))}return d}),i=i.concat(n),i=i.concat(i.slice(0,4).map(g=>de(g)).flat()),!i.length)return null;let c=[];for(let g of i){let o=ce(g);o&&o?.length&&(Array.isArray(o)||(o=[o]),o.forEach(d=>{c.find(f=>f.src===d)||c.push({src:d,ele:g})}))}if(c.length>1){let g=[/source/i,/img/i,/picture/i,/image/i,/a/i];c=c.sort((o,d)=>{let f=g.findIndex(w=>w.test(o.src)),l=g.findIndex(w=>w.test(d.src));return f=f===-1?100:f,l=l===-1?100:l,l-f})}return c.filter(({ele:g})=>!/iframe/i.test(g.tagName))}function ge(e,t,i,a,n){let c=e/t,g=i,o=i/c;return o>a&&(o=a,g=a*c),g>i&&(g=i,o=i/c),g<n&&(g=n,o=n/c),o<n&&(o=n,g=n*c),{width:g,height:o}}function ue(e,t,i){let{x:a,y:n}=P(t,i),c="fbaio-magnify-choose-image",g=document.getElementById(c);g&&g.remove();let o=document.createElement("div");o.id=c,o.style.cssText=`
      top: ${n}px;
      left: ${a}px;
    `,o.onclick=v=>{v.preventDefault(),(v.target===o||v.target===R)&&o.remove()},document.body.appendChild(o);let d=document.createElement("div");d.classList.add("fbaio-toolbar"),o.appendChild(d);let f=[m.none,m.dark,m.light],l=(Number(localStorage.getItem("fbaio-magnify-image-bg-choose-image"))||0)-1,w=document.createElement("div");w.classList.add("fbaio-btn"),w.innerText="B",w.ufs_title="Change background",w.onclick=()=>{switch(l=(l+1)%f.length,o.style.background="",f[l]){case m.none:o.style.background="#000b";break;case m.dark:o.style.background="rgba(30, 30, 30, 1)";break;case m.light:o.style.background="rgba(240, 240, 240, 1)";break}w.innerText="BG "+f[l],localStorage.setItem("fbaio-magnify-image-bg-choose-image",l)},d.appendChild(w);let L=document.createElement("div");L.classList.add("fbaio-desc"),L.innerText="Choose image",d.appendChild(L),d.addEventListener("mousemove",v=>{if(v.target!==d&&v.target?.ufs_title&&v.target?.ufs_title!==L.textContent){L.textContent=v.target.ufs_title;let D=v.target.offsetLeft+v.target.offsetWidth/2-L.offsetWidth/2;L.style.cssText=`left: ${D}px`}}),setTimeout(()=>{o.style.top=0,o.style.left=0,o.style.width="100vw",o.style.height="100vh",o.style.opacity=1,o.style.borderRadius="0"},0);let R=document.createElement("div");R.classList.add("fbaio-img-container");let z=[];for(let v=0;v<e.length;v++){let D=e[v],B=document.createElement("div");B.classList.add("fbaio-con"),R.appendChild(B);let b=document.createElement("div");b.classList.add("fbaio-size"),B.appendChild(b);let x=document.createElement("img");x.src=D,x.onload=()=>{b.innerText=`${x.naturalWidth} x ${x.naturalHeight}`,x.setAttribute("loaded",!0),z.length===1&&(x.click(),o.click())},x.onerror=()=>{b.remove(),x.remove(),z.splice(v,1),z.length===1&&z[0].getAttribute("loaded")&&(z[0].click(),o.click())},x.onclick=()=>{let k=Q();Z(D,k.x,k.y)},z.push(x),B.appendChild(x)}o.appendChild(R),w.click()}function Z(e,t,i,a=()=>{}){let{x:n,y:c}=P(t,i),g="fbaio-magnify-image",o=document.getElementById(g);o&&o.remove();let d=document.createElement("div");d.id=g,d.innerHTML=`
      <div class="fbaio-img-anim" style="top: ${c}px; left: ${n}px;"></div>
      <img
        src="${e}"
        style="
          top: ${window.innerHeight/2}px;
          left: ${window.innerWidth/2}px;
          transform-origin: center;
          transform: translate(-50%, -50%) !important;
          max-width: 100vw;
          max-height: 100vh;
          opacity: 0;
        "/>
      <div class="fbaio-toolbar">
        <div class="fbaio-btn" ufs_title="Original size">Size</div>
        <div class="fbaio-btn" ufs_title="Toggle original size">Z</div>
        <div class="fbaio-btn" ufs_title="Toggle background">B</div>
        <div class="fbaio-btn" ufs_title="Flip horizontal">\u2194</div>
        <div class="fbaio-btn" ufs_title="Flip vertical">\u2195</div>
        <div class="fbaio-btn" ufs_title="Rotate left">\u21BA</div>
        <div class="fbaio-btn" ufs_title="Rotate right">\u21BB</div>
        <div class="fbaio-btn" ufs_title="Open in new tab">\u2197</div>
        <div class="fbaio-btn" ufs_title="Download">\u2B07\uFE0F</div>
        <div class="fbaio-btn fbaio-dropdown-menu" ufs_title="">\u{1F50E} Search by image
          <ul>
          ${r.split(`
`).map(p=>{let[j,T]=p.split(" | ");return`<li class="fbaio-btn" data-url="${T}">${j}</li>`}).join("")}
          </ul>
        </div>
        <div class="fbaio-desc"></div>
      </div>
    `,document.body.appendChild(d);let f=d.querySelector(".fbaio-img-anim"),l=d.querySelector("img"),w=d.querySelector(".fbaio-toolbar"),[L,R,z,v,D,B,b,x,k,I]=Array.from(w.querySelectorAll(".fbaio-btn")),S=w.querySelector(".fbaio-desc");function F(){if(l.naturalWidth&&l.naturalHeight){let p=Ne(l.naturalWidth,l.naturalHeight);L.innerText=`${l.naturalWidth} x ${l.naturalHeight}`+(p?` ~ ${p}`:"")}}function C(){if(l.naturalWidth&&l.naturalHeight){let p=(parseFloat(l.style.width)/l.naturalWidth).toFixed(1);parseInt(p)==p&&(p=parseInt(p)),R.innerText=`${p}x`}}let{destroy:N,animateTo:O}=Fe(l,d,p=>{("width"in p||"height"in p)&&C()}),X;setTimeout(()=>{X=pe(f,40)},500),d.addEventListener("click",p=>{p.target===d&&(d.remove(),d=null,N(),a?.())});let Y=!1;l.onload=()=>{let p=l.naturalWidth,j=l.naturalHeight;if(Y){let T=p/j;l.style.height=`${parseInt(l.style.width)/T}px`}else{Y=!0;let T=ge(p,j,Math.max(window.innerWidth-100,400),Math.max(window.innerHeight-100,400),100);l.style.width=`${T.width}px`,l.style.height=`${T.height}px`,l.style.opacity=1,X?.(),f.style.top=l.style.top,f.style.left=l.style.left,f.style.width=l.style.width,f.style.height=l.style.height,f.style.borderRadius=0,f.style.opacity=0,setTimeout(()=>{f.remove()},300)}F(),C()},l.onerror=()=>{J({msg:"Failed to load image"})},R.onclick=()=>{let p=l.naturalWidth,j=l.naturalHeight;if(parseInt(l.style.width)===p&&parseInt(l.style.height)===j){let T=ge(p,j,Math.max(window.innerWidth-100,400),Math.max(window.innerHeight-100,400),100);p=T.width,j=T.height}O(window.innerWidth/2,window.innerHeight/2,p,j),C()};let H=[m.none,m.transparent,m.dark,m.light],M=(Number(localStorage.getItem("fbaio-magnify-image-bg"))||0)-1;z.onclick=()=>{switch(M=(M+1)%H.length,l.style.background="",H[M]){case m.none:break;case m.transparent:l.style.cssText+="background: linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100%) 0 0 / 20px 20px, linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0.4) 100%) 10px 10px / 20px 20px !important;";break;case m.dark:l.style.background="rgba(30, 30, 30, 1)";break;case m.light:l.style.background="rgba(240, 240, 240, 1)";break}z.innerText="BG "+H[M],localStorage.setItem("fbaio-magnify-image-bg",M)},z.click();let A={flip_horizontal:!1,flip_vertical:!1,rotate:0};v.onclick=()=>{A.flip_horizontal?(l.style.transform=l.style.transform.replace("scaleX(-1)",""),A.flip_horizontal=!1):(l.style.transform+=" scaleX(-1)",A.flip_horizontal=!0)},D.onclick=()=>{A.flip_vertical?(l.style.transform=l.style.transform.replace("scaleY(-1)",""),A.flip_vertical=!1):(l.style.transform+=" scaleY(-1)",A.flip_vertical=!0)},B.onclick=()=>{l.style.transform=l.style.transform.replace(`rotate(${A.rotate}deg)`,""),A.rotate-=90,l.style.transform+=` rotate(${A.rotate}deg)`},b.onclick=()=>{l.style.transform=l.style.transform.replace(`rotate(${A.rotate}deg)`,""),A.rotate+=90,l.style.transform+=` rotate(${A.rotate}deg)`},x.onclick=()=>{if(/^data:image\/svg/.test(l.src)){let p=We(l.src);window.open(p,"_blank")}else window.open(l.src,"_blank")},I.querySelectorAll("li.fbaio-btn").forEach(p=>{p.onclick=async j=>{j.preventDefault(),window.open(p.getAttribute("data-url").replace("#b#",l.src.replace(/https?:\/\//i,"")).replace("#t#",encodeURIComponent(l.src)),"_blank","width=1024, height=768, toolbar=1, menubar=1, titlebar=1")}}),k.onclick=()=>{Oe(l.src)},w.onmousemove=p=>{if(p.target!==w&&p.target.attributes.ufs_title&&p.target.attributes.ufs_title.textContent!==S.textContent){S.textContent=p.target.attributes.ufs_title.textContent;let j=p.target.offsetLeft+p.target.offsetWidth/2-S.offsetWidth/2;S.style.cssText=`left: ${j}px`}}}function Be(e,t,i=40,a="",n=""){let c=document.createElement("div");return c.style.cssText=`
      position: fixed;
      left: ${e-i/2}px;
      top: ${t-i/2}px;
      width: ${i}px;
      height: ${i}px;
      z-index: 2147483647;
      pointer-events: none;
      user-select: none;
      ${a}
    `,pe(c,i,n),document.body.appendChild(c),()=>c.remove()}function pe(e,t=Math.min(e?.clientWidth,e?.clientHeight)||0,i=""){let a=Math.random().toString(36).substr(2,9);e.classList.add("fbaio-loading-"+a);let n=4,c=document.createElement("style");return c.id="fbaio-loading-style-"+a,c.textContent=`
      .fbaio-loading-${a}::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${t}px;
        height: ${t}px;
        margin-top: -${t/2}px;
        margin-left: -${t/2}px;
        border-radius: 50%;
        border: ${n}px solid #555 !important;
        border-top-color: #eee !important;
        animation: fbaio-spin 1s ease-in-out infinite;
        box-sizing: border-box !important;
        ${i}
      }
      @keyframes fbaio-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,(document.head||document.documentElement).appendChild(c),()=>{e&&e.classList.remove("fbaio-loading-"+a)}}function q(e,t,i,a){return e.addEventListener(t,i,a),()=>e.removeEventListener(t,i,a)}function Fe(e,t,i){let a="fbaio-drag-and-zoom";e.classList.add(a);let n=document.createElement("style");n.textContent=`
      .${a} {
        cursor: grab;
        position: relative !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -khtml-user-select: none;
        max-width: unset !important;
        max-height: unset !important;
        min-width: unset !important;
        min-height: unset !important;
        -webkit-user-drag: none !important;
      }`,(t||e).appendChild(n);let c=.3,g={x:0,y:0},o={x:0,y:0},d={left:parseFloat(e.style.left),top:parseFloat(e.style.top),width:parseFloat(e.style.width),height:parseFloat(e.style.height)},f=!0;function l(){let b=!1,x={};for(let k in d){let I=parseFloat(e.style[k]),S=d[k],F=Math.abs(S-I);if(F>.1){let C=F<1?S:He(I,S,c);e.style[k]=C+"px",x[k]=C,b=!0}}b&&i?.(x),f&&requestAnimationFrame(l)}l();let w=!1,L=q(t||e,"mousedown",function(b){b.preventDefault(),w=!0,g.x=b.clientX,g.y=b.clientY,e.style.cursor="grabbing"}),R=q(document,"mousemove",function(b){if(o.x=b.clientX,o.y=b.clientY,w){let x=b.clientX-g.x,k=b.clientY-g.y;d.left+=x,d.top+=k,g.x=b.clientX,g.y=b.clientY}}),z=q(document,"mouseup",function(){w=!1,e.style.cursor="grab"}),v=q(document,"mouseleave",function(){w=!1,e.style.cursor="grab"}),D=q(t||e,"wheel",function(b){b.preventDefault();let x=parseFloat(e.style.width)/e.width,k=-b.wheelDeltaY||-b.wheelDelta||-b.deltaY,I=Math.abs(.3*k/120),S=k>0?x*(1-I):x*(1+I),F=e.width*S,C=e.height*S;if(F<10||C<10)return;let N=parseFloat(e.style.left),O=parseFloat(e.style.top),X=o.x-N,Y=o.y-O,H=N-(F-e.width)*(X/e.width),M=O-(C-e.height)*(Y/e.height);d.left=H,d.top=M,d.width=F,d.height=C},{passive:!1}),B=[L,R,z,v,D];return{animateTo:(b,x,k,I)=>{d.left=b,d.top=x,d.width=k,d.height=I},destroy:()=>{f=!1,n.remove(),e.classList.remove(a),B.forEach(b=>b?.())}}}function Me(e,t=window){let i=e.getBoundingClientRect(),a=t.getComputedStyle(e),n=parseFloat,c=i.top+n(a.paddingTop)+n(a.borderTopWidth),g=i.right-n(a.paddingRight)-n(a.borderRightWidth),o=i.bottom-n(a.paddingBottom)-n(a.borderBottomWidth),d=i.left+n(a.paddingLeft)+n(a.borderLeftWidth);return{top:c,right:g,bottom:o,left:d,width:g-d,height:o-c}}function qe(e,t,i=500){let a=null,n=0,c=g=>{if(g.key!==e){n=0;return}if(n++,n===2){t?.(),n=0;return}clearTimeout(a),a=setTimeout(()=>{n=0},i)};return document.addEventListener("keyup",c),()=>{clearTimeout(a),document.removeEventListener("keyup",c)}}function He(e,t,i){return e+(t-e)*i}function We(e){try{if(!/^data:image\/svg/.test(e))throw new Error("Invalid SVG");let t=atob(e.split(",")[1]),i=new Blob([t],{type:"image/svg+xml"}),a=URL.createObjectURL(i);return setTimeout(()=>URL.revokeObjectURL(a),6e4),a}catch(t){return console.log("ERROR: ",t),null}}function Ue(e){return URL.createObjectURL(new Blob([e],{type:"image/svg+xml"}))}function Pe(e){try{return"data:image/svg+xml;charset=utf-8;base64,"+btoa(new XMLSerializer().serializeToString(e))}catch(t){return console.log("ERROR: ",t),null}}function Ne(e,t){let i=Math.min(e,t),a=Math.max(e,t);return a<=256&&i<=144?"144p":a<=320&&i<=180?"240p":a<=640&&i<=360?"360p":a<=640&&i<=480?"SD (480p)":a<=1280&&i<=720?"HD (720p)":a<=1600&&i<=900?"HD+ (900p)":a<=1920&&i<=1080?"FHD (1080p)":a<=2560&&i<=1440?"QHD (1440p)":a<=3840&&i<=2160?"4K (2160p)":a<=5120&&i<=2880?"5K (2880p)":a<=7680&&i<=4320?"8K (4320p)":a<=10240&&i<=4320?"10K (4320p)":a<=15360&&i<=8640?"16K":"> 16K"}function J({msg:e="",x:t=window.innerWidth/2,y:i=window.innerHeight-100,align:a="center",duration:n=3e3,id:c="aio_notify_div"}={}){let g=document.getElementById(c);g&&g.remove();let o=document.createElement("div");o.id=c,o.style.cssText=`
      position: fixed;
      left: ${t}px;
      top: ${i}px;
      padding: 10px;
      background-color: #333;
      color: #fff;
      border-radius: 5px;
      z-index: 2147483647;
      transition: all 1s ease-out;
      ${a==="right"?"transform: translateX(-100%);":a==="center"?"transform: translateX(-50%);":""}
    `,o.textContent=e,(document.body||document.documentElement).appendChild(o);let d=[];function f(l){d.forEach(w=>clearTimeout(w)),d=[setTimeout(()=>{o&&(o.style.opacity=0,o.style.top=`${i-50}px`)},l-1e3),setTimeout(()=>{o?.remove()},l)]}return n>0&&f(n),{closeAfter:f,remove(){return o?(o.remove(),o=null,!0):!1},setText(l,w){return o?(o.textContent=l,w&&f(w),!0):!1}}}function Oe(e){let t=document.createElement("a");t.href=e,t.download=e.split(/[/?#]/).filter(Boolean).pop()||"image",t.rel="noreferrer",document.body.appendChild(t),t.click(),t.remove()}})()})();
