/*����������� �� ����� ����*/
document.getElemetsByClassName=function(a,b){var c=[],e=null,d=RegExp(["(^|\\s)",a,"(\\s|$)"].join(""));b&&b.getElementsByTagName&&(e=b.getElementsByTagName("*"));e||(e=document.getElementsByTagName?document.getElementsByTagName("*"):document.all);for(var g=0,h=e.length;g<h;g++)(e[g].getAttribute("class")||e[g].className).match(d)&&c.push(e[g]);return c};function WindowSize(){this.h=this.w=0;return this}
WindowSize.prototype.update=function(){var a=document,b=window.innerWidth?window.innerWidth:a.documentElement&&a.documentElement.clientWidth?a.documentElement.clientWidth:a.body.clientWidth,a=window.innerHeight?window.innerHeight:a.documentElement&&a.documentElement.clientHeight?a.documentElement.clientHeight:a.body.clientHeight;return b!=this.w||a!=this.h?(this.w=b,this.h=a,!0):!1};function PageSize(){this.win=new WindowSize;this.h=this.w=0;return this}
PageSize.prototype.update=function(){var a=document,b=window.innerWidth&&window.scrollMaxX?window.innerWidth+window.scrollMaxX:a.body.scrollWidth>a.body.offsetWidth?a.body.scrollWidth:a.body.offsetWidt,a=window.innerHeight&&window.scrollMaxY?window.innerHeight+window.scrollMaxY:a.body.scrollHeight>a.body.offsetHeight?a.body.scrollHeight:a.body.offsetHeight,c=this.win.update();if(b<this.win.w)b=this.win.w;if(a<this.win.h)a=this.win.h;return c||b!=this.w||a!=this.h?(this.w=b,this.h=a,!0):!1};
function PagePos(){this.y=this.x=0;return this}PagePos.prototype.update=function(){var a=document,b=window.pageXOffset?window.pageXOffset:a.documentElement&&a.documentElement.scrollLeft?a.documentElement.scrollLeft:a.body?a.body.scrollLeft:0,a=window.pageYOffset?window.pageYOffset:a.documentElement&&a.documentElement.scrollTop?a.documentElement.scrollTop:a.body?a.body.scrollTop:0;return b!=this.x||a!=this.y?(this.x=b,this.y=a,!0):!1};
if(!window.Spica){var Spica={};Spica.Browser=new function(){this.name=navigator.userAgent;this.isWinIE=this.isMacIE=!1;this.isGecko=this.name.match(/Gecko\//);this.isSafari=this.name.match(/AppleWebKit/);this.isSafari3=this.name.match(/AppleWebKit\/(\d\d\d)/)&&parseInt(RegExp.$1)>500;this.isKHTML=this.isSafari||navigator.appVersion.match(/Konqueror|KHTML/);this.isOpera=window.opera;if(document.all&&!this.isGecko&&!this.isSafari&&!this.isOpera)this.isWinIE=this.name.match(/Win/),this.isMacIE=this.name.match(/Mac/),
this.isNewIE=this.name.match(/MSIE (\d\.\d)/)&&RegExp.$1>6.5};Spica.Event={cache:!1,getEvent:function(a){return a?a:window.event?window.event:null},getKey:function(a){return!a?void 0:a.keyCode?a.keyCode:a.charCode},stop:function(a){if(a){try{a.stopPropagation()}catch(b){}a.cancelBubble=!0;try{a.preventDefault()}catch(c){}return a.returnValue=!1}},register:function(a,b,c){if(a){b=="keypress"&&!a.addEventListener&&(b="keydown");b=="mousewheel"&&Spica.Browser.isGecko&&(b="DOMMouseScroll");if(!this.cache)this.cache=
[];a.addEventListener?(this.cache.push([a,b,c]),a.addEventListener(b,c,!1)):a.attachEvent?(this.cache.push([a,b,c]),a.attachEvent("on"+b,c)):a["on"+b]=c}},deregister:function(a,b,c){a&&(b=="keypress"&&!a.addEventListener&&(b="keydown"),b=="mousewheel"&&Spica.Browser.isGecko&&(b="DOMMouseScroll"),a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent("on"+b,c):a["on"+b]=null)},deregisterAll:function(){if(Spica.Event.cache){for(var a=0,b=Spica.Event.cache.length;a<b;a++)Spica.Event.deregister(Spica.Event.cache[a]),
Spica.Event.cache[a][0]=null;Spica.Event.cache=!1}},run:function(a){typeof a=="function"&&(Spica.Browser.isGecko||Spica.Browser.isOpera?this.register(window,"DOMContentLoaded",a):this.register(window,"load",a))}};Spica.Event.register(window,"unload",Spica.Event.deregisterAll)}
function Lightbox(a){this._imgs=[];this._sets=[];this._img=this._box=this._wrap=null;this._open=-1;this._page=new PageSize;this._pos=new PagePos;this._zoomimg=null;this._expanded=this._expandable=!1;this._funcs={move:null,up:null,drag:null,wheel:null,dbl:null};this._level=1;this._curpos={x:0,y:0};this._imgpos={x:0,y:0};this._minpos={x:0,y:0};this._expand=a.expandimg;this._shrink=a.shrinkimg;this._blank=a.blankimg;this._resizable=a.resizable;this._timer=null;this._anim={step:0,w:50,h:50,a:0,t:0,f:a.animation};
this._next=this._prev=this._openedset=this._overall=this._indicator=null;this._hiding=[];this._actionEnabled=this._changed=this._first=!1;return this._init(a)}
Lightbox.prototype={refresh:function(a){a||(a=document);this._imgs.length=0;this._genListFromLinks(a)},_init:function(a){var b=document;if(b.getElementsByTagName){if(Spica.Browser.isMacIE)return this;var c=b.getElementsByTagName("body")[0];this._wrap=this._createWrapOn(c);this._box=this._createBoxOn(c,a);this._img=this._box.firstChild;this._zoomimg=b.getElementById("actionImage");a.skipInit||this._genListFromLinks(b);return this}},_genListFromLinks:function(a){for(var a=a.getElementsByTagName("a"),
b=0;b<a.length;b++){var c=a[b],e=this._imgs.length,d=String(c.getAttribute("rel")).toLowerCase();if(c.getAttribute("href")&&d.match("lightbox")){this._imgs[e]={src:c.getAttribute("href"),w:-1,h:-1,title:"",cls:c.className,set:d};if(c.getAttribute("title"))this._imgs[e].title=c.getAttribute("title");else if(c.firstChild&&c.firstChild.getAttribute&&c.firstChild.getAttribute("title"))this._imgs[e].title=c.firstChild.getAttribute("title");c.onclick=this._genOpener(e);d!="lightbox"&&(this._sets[d]||(this._sets[d]=
[]),this._sets[d].push(e))}}},_genOpener:function(a){var b=this;return function(){b._show(a);return!1}},_createWrapOn:function(a){var b=this;if(!a)return null;var c=document.createElement("div");a.appendChild(c);c.id="overlay";c.style.display="none";c.style.position="fixed";c.style.top="0px";c.style.left="0px";c.style.zIndex="1550"/*z-index ���� */;c.style.width="100%";c.style.height="100%";if(Spica.Browser.isWinIE)c.style.position="absolute";Spica.Event.register(c,"click",function(a){b._close(a)});return c},_createBoxOn:function(a,
b){var c=this;if(!a)return null;var e=document.createElement("div");a.appendChild(e);e.id="lightbox";e.style.display="none";e.style.position="absolute";e.style.zIndex="1560"/*z-index ���� */;var d=document.createElement("img");e.appendChild(d);d.id="lightboxImage";d.width=200;d.height=200;c._set_cursor(d);Spica.Event.register(d,"mouseover",function(){c._actionEnabled=!0;c._show_action()});Spica.Event.register(d,"mouseout",function(){c._actionEnabled=!1;c._hide_action()});Spica.Event.register(d,"click",function(a){c._close(a)});
var g=new Image;g.onload=function(){var a=document.createElement("img");e.appendChild(a);a.id="loadingImage";a.src=g.src;a.style.position="absolute";a.style.zIndex="70";c._set_cursor(a);Spica.Event.register(a,"click",function(a){c._close(a)});g.onload=function(){}};if(b.loadingimg!="")g.src=b.loadingimg;if(b.previmg)d=document.createElement("img"),e.appendChild(d),d.id="prevLink",d.style.display="none",d.style.position="absolute",d.style.left="9px",d.style.zIndex="70",d.src=b.previmg,c._prev=d,Spica.Event.register(d,
"mouseover",function(){c._actionEnabled=!0;c._show_action()}),Spica.Event.register(d,"click",function(){c._show_next(-1)});if(b.nextimg)d=document.createElement("img"),e.appendChild(d),d.id="nextLink",d.style.display="none",d.style.position="absolute",d.style.right="9px",d.style.zIndex="70",d.src=b.nextimg,c._next=d,Spica.Event.register(d,"mouseover",function(){c._actionEnabled=!0;c._show_action()}),Spica.Event.register(d,"click",function(){c._show_next(1)});d=document.createElement("img");e.appendChild(d);
d.id="actionImage";d.style.display="none";d.style.position="absolute";d.style.top="15px";d.style.left="15px";d.style.zIndex="70";c._set_cursor(d);d.src=c._expand;Spica.Event.register(d,"mouseover",function(){c._actionEnabled=!0;c._show_action()});Spica.Event.register(d,"click",function(){c._zoom()});if(b.closeimg)d=document.createElement("img"),e.appendChild(d),d.id="closeButton",d.style.display="inline",d.style.position="absolute",d.style.right="9px",d.style.top="10px",d.style.zIndex="80",d.src=
b.closeimg,c._set_cursor(d),Spica.Event.register(d,"click",function(a){c._close(a)});d=document.createElement("span");e.appendChild(d);d.id="lightboxCaption";d.style.display="none";d.style.position="absolute";d.style.zIndex="80";if(b.effectpos){if(b.effectpos.x=="")b.effectpos.x=0;if(b.effectpos.y=="")b.effectpos.y=0}else b.effectpos={x:0,y:0};var h=new Image;h.onload=function(){var a=document.createElement("img");e.appendChild(a);a.id="effectImage";a.src=h.src;if(b.effectclass)a.className=b.effectclass;
a.style.position="absolute";a.style.display="none";a.style.left=[b.effectpos.x,"px"].join("");a.style.top=[b.effectpos.y,"px"].join("");a.style.zIndex="90";c._set_cursor(a);Spica.Event.register(a,"click",function(){a.style.display="none"})};if(b.effectimg!="")h.src=b.effectimg;if(c._resizable)d=document.createElement("div"),a.appendChild(d),d.id="lightboxOverallView",d.style.display="none",d.style.position="absolute",d.style.zIndex="70",c._overall=d,d=document.createElement("div"),a.appendChild(d),
d.id="lightboxIndicator",d.style.display="none",d.style.position="absolute",d.style.zIndex="80",c._indicator=d;return e},_set_photo_size:function(){if(this._open!=-1){var a=30,b=document.getElementById("lightboxCaption");b&&(a+=b.clientHeight||b.offsetHeight);var c=this._page.win.w-30,e=this._page.win.h-a,d=a=15,g=9,h=9,f=0;if(this._expanded){var b=parseInt(this._imgs[this._open].w*this._level),i=parseInt(this._imgs[this._open].h*this._level);this._minpos.x=this._pos.x+c-this._img.width;this._minpos.y=
this._pos.y+e-this._img.height;if(this._img.width<=c)this._imgpos.x=this._pos.x+(c-this._img.width)/2;else{if(this._imgpos.x>this._pos.x)this._imgpos.x=this._pos.x;else if(this._imgpos.x<this._minpos.x)this._imgpos.x=this._minpos.x;a=15+this._pos.x-this._imgpos.x;g=this._pos.x-this._imgpos.x-5;h=this._img.width-this._page.win.w+this._imgpos.x+25;Spica.Browser.isWinIE&&(h-=10)}if(this._img.height<=e)this._imgpos.y=this._pos.y+(e-this._img.height)/2,f=Math.floor(this._img.height/2)-10;else{if(this._imgpos.y>
this._pos.y)this._imgpos.y=this._pos.y;else if(this._imgpos.y<this._minpos.y)this._imgpos.y=this._minpos.y;d=15+this._pos.y-this._imgpos.y;f=Math.floor(e/2)-10+this._pos.y-this._imgpos.y}this._anim.w=b;this._anim.h=i;this._show_overall(!0)}else{f=this._imgs[this._open].w;i=this._imgs[this._open].h;if(f<0)f=this._img.width;if(i<0)i=this._img.height;var j=1;if((f>=c||i>=e)&&i&&f)j=c/f<e/i?c/f:e/i;this._expandable=j<1?!0:!1;this._anim.w=Math.floor(f*j);this._anim.h=Math.floor(i*j);if(this._resizable)this._expandable=
!0;if(Spica.Browser.isWinIE)this._box.style.display="block";this._imgpos.x=this._pos.x+(c-this._img.width)/2;this._imgpos.y=this._pos.y+(e-this._img.height)/2;f=Math.floor(this._img.height/2)-10;this._show_overall(!1);if(c=document.getElementById("loadingImage"))c.style.left=[(this._img.width-30)/2,"px"].join(""),c.style.top=[(this._img.height-30)/2,"px"].join("");if(b)b.style.top=[this._img.height+10,"px"].join(""),b.style.width=[this._img.width+20,"px"].join("")}this._box.style.left=[this._imgpos.x,
"px"].join("");this._box.style.top=[this._imgpos.y,"px"].join("");this._zoomimg.style.left=[a,"px"].join("");this._zoomimg.style.top=[d,"px"].join("");this._wrap.style.left=this._pos.x;if(this._prev&&this._next)this._prev.style.left=[g,"px"].join(""),this._next.style.right=[h,"px"].join(""),this._prev.style.top=this._next.style.top=[f,"px"].join("");this._changed=!0}},_show_overall:function(a){if(this._overall!=null)if(a){if(this._open!=-1){var b=a=0,c=0,e=0,d=0,g=0,h=0,f=0,a=this._img.width,b=this._img.height,
c=this._page.win.w-30,e=this._page.win.h-30,f=a;f<b&&(f=b);f<c&&(f=c);f<e&&(f=e);if(!(f<1))a=parseInt(a/f*100),b=parseInt(b/f*100),d=parseInt(c/f*100),g=parseInt(e/f*100),c=this._pos.x+c-100-20,e=this._pos.y+e-100-20,h=c-parseInt((this._imgpos.x-this._pos.x)/f*100),f=e-parseInt((this._imgpos.y-this._pos.y)/f*100),this._overall.style.left=[c,"px"].join(""),this._overall.style.top=[e,"px"].join(""),this._overall.style.width=[a,"px"].join(""),this._overall.style.height=[b,"px"].join(""),this._indicator.style.left=
[h,"px"].join(""),this._indicator.style.top=[f,"px"].join(""),this._indicator.style.width=[d,"px"].join(""),this._indicator.style.height=[g,"px"].join(""),this._overall.style.display="block",this._indicator.style.display="block"}}else this._overall.style.display="none",this._indicator.style.display="none"},_set_size:function(a){if(this._open!=-1&&(this._page.update()||this._pos.update()||this._changed)){if(Spica.Browser.isWinIE)this._wrap.style.width=[this._page.win.w,"px"].join(""),this._wrap.style.height=
[this._page.win.h,"px"].join(""),this._wrap.style.top=[this._pos.y,"px"].join("");a&&this._set_photo_size()}},_set_cursor:function(a){if(!Spica.Browser.isWinIE||Spica.Browser.isNewIE)a.style.cursor="pointer"},_current_setindex:function(){if(!this._openedset)return-1;for(var a=this._sets[this._openedset],b=0,c=a.length;b<c;b++)if(a[b]==this._open)return b;return-1},_get_setlength:function(){return!this._openedset?-1:this._sets[this._openedset].length},_show_action:function(){if(this._open!=-1){var a=
this._current_setindex();if(a>-1){if(a>0)this._prev.style.display="inline";if(a<this._get_setlength()-1)this._next.style.display="inline"}if(this._expandable&&this._zoomimg)this._zoomimg.src=this._expanded?this._shrink:this._expand,this._zoomimg.style.display="inline"}},_hide_action:function(){if(this._zoomimg)this._zoomimg.style.display="none";this._open>-1&&this._expanded&&this._dragstop(null);if(this._prev)this._prev.style.display="none";if(this._next)this._next.style.display="none"},_zoom:function(){var a=
this,b=document.getElementById("closeButton");if(a._expanded){if(a._reset_func(),a._expanded=!1,b)b.style.display="inline"}else if(a._open>-1){a._level=1;a._imgpos.x=a._pos.x;a._imgpos.y=a._pos.y;a._expanded=!0;a._funcs.drag=function(b){a._dragstart(b)};a._funcs.dbl=function(){a._close(null)};if(a._resizable)a._funcs.wheel=function(b){a._onwheel(b)},Spica.Event.register(a._box,"mousewheel",a._funcs.wheel);Spica.Event.register(a._img,"mousedown",a._funcs.drag);Spica.Event.register(a._img,"dblclick",
a._funcs.dbl);a._show_caption(!1);if(b)b.style.display="none"}a._set_photo_size();a._show_action()},_reset_func:function(){this._funcs.wheel!=null&&Spica.Event.deregister(this._box,"mousewheel",this._funcs.wheel);this._funcs.move!=null&&Spica.Event.deregister(this._img,"mousemove",this._funcs.move);this._funcs.up!=null&&Spica.Event.deregister(this._img,"mouseup",this._funcs.up);this._funcs.drag!=null&&Spica.Event.deregister(this._img,"mousedown",this._funcs.drag);this._funcs.dbl!=null&&Spica.Event.deregister(this._img,
"dblclick",this._funcs.dbl);this._funcs={move:null,up:null,drag:null,wheel:null,dbl:null}},_onwheel:function(a){var b=0,a=Spica.Event.getEvent(a);a.wheelDelta?b=event.wheelDelta/-120:a.detail&&(b=a.detail/3);Spica.Browser.isOpera&&(b=-b);var c=this._level<1?0.1:this._level<2?0.25:this._level<4?0.5:1;this._level=b>0?this._level+c:this._level-c;if(this._level>8)this._level=8;else if(this._level<0.5)this._level=0.5;this._set_photo_size();return Spica.Event.stop(a)},_dragstart:function(a){var b=this,
a=Spica.Event.getEvent(a);b._curpos.x=a.screenX;b._curpos.y=a.screenY;b._funcs.move=function(a){b._dragging(a)};b._funcs.up=function(a){b._dragstop(a)};Spica.Event.register(b._img,"mousemove",b._funcs.move);Spica.Event.register(b._img,"mouseup",b._funcs.up);return Spica.Event.stop(a)},_dragging:function(a){a=Spica.Event.getEvent(a);this._imgpos.x+=a.screenX-this._curpos.x;this._imgpos.y+=a.screenY-this._curpos.y;this._curpos.x=a.screenX;this._curpos.y=a.screenY;this._set_photo_size();return Spica.Event.stop(a)},
_dragstop:function(a){a=Spica.Event.getEvent(a);this._funcs.move!=null&&Spica.Event.deregister(this._img,"mousemove",this._funcs.move);this._funcs.up!=null&&Spica.Event.deregister(this._img,"mouseup",this._funcs.up);this._funcs.move=null;this._funcs.up=null;this._set_photo_size();return a?Spica.Event.stop(a):!1},_show_caption:function(a,b){var c=document.getElementById("lightboxCaption");if(c)c.innerHTML.length==0||!a?c.style.display="none":(c.style.top=[this._img.height+10,"px"].join(""),c.style.left=
"0px",c.style.width=[this._img.width+20,"px"].join(""),c.style.display="block",this._setOpacity(c,b?0:9.9))},_toggle_wrap:function(a){this._wrap.style.display=a?"block":"none";if(this._hiding.length==0&&!this._first){for(var b=["select","embed","object"],c=0,e=b.length;c<e;c++)for(var d=document.getElementsByTagName(b[c]),g=0,h=d.length;g<h;g++){var f=d[g].style.visibility;f||(d[g].currentStyle?f=d[g].currentStyle.visibility:document.defaultView&&(f=document.defaultView.getComputedStyle(d[g],"").getPropertyValue("visibility")));
f!="hidden"&&this._hiding.push(d[g])}this._first=!0}c=0;for(e=this._hiding.length;c<e;c++)this._hiding[c].style.visibility=a?"hidden":"visible";a&&this._setOpacity(this._wrap,5)},_prepare:function(){if(this._open!=-1){this._set_size(!1);this._toggle_wrap(!0);this._box.style.display="block";this._hide_action();this._img.src=this._blank;var a=document.getElementById("loadingImage");if(a)a.style.display="inline";var a=["effectImage","closeButton","lightboxCaption"],b;for(b in a){var c=document.getElementById(a[b]);
if(c)c.style.display="none"}}},_show:function(a){var b=this,c=new Image;if(!(a<0||a>=b._imgs.length))b._open=a,b._prepare(),b._set_photo_size(),c.onload=function(){b._expanded=!1;if(b._imgs[b._open].w==-1)b._imgs[b._open].w=c.width,b._imgs[b._open].h=c.height;var a=document.getElementById("lightboxCaption");if(a){try{a.innerHTML=b._imgs[b._open].title}catch(d){}b._show_caption(!0,!0)}b._anim.t=(new Date).getTime();b._timer=window.setInterval(function(){b._run()},20);b._img.setAttribute("title",b._imgs[b._open].title);
b._anim.step=b._anim.f?0:2;b._set_photo_size();b._anim.f||b._show_image();if(b._imgs[b._open].set!="lightbox"){a=b._imgs[b._open].set;if(b._sets[a].length>1)b._openedset=a;if(!b._prev||!b._next)b._openedset=null}},b._expandable=!1,b._expanded=!1,b._anim.step=-1,c.src=b._imgs[b._open].src},_run:function(){var a=(new Date).getTime();if(!(a-this._anim.t<50))this._anim.t=a,this._set_size(!0),this._anim.step==0||this._anim.w!=this._img.width||this._anim.h!=this._img.height?this._doResizing():this._anim.step==
1?this._doFadeIn():this._anim.step==3&&this._doFadeOut()},_show_image:function(){if(this._open!=-1){this._img.src=this._imgs[this._open].src;var a=document.getElementById("loadingImage");if(a)a.style.display="none";if((a=document.getElementById("effectImage"))&&(!a.className||this._imgs[this._open].cls==a.className))a.style.display="block";if(a=document.getElementById("closeButton"))a.style.display="inline";this._show_caption(!0);this._actionEnabled&&this._show_action()}},_doResizing:function(){var a=
this._anim.f?Math.floor((this._anim.w-this._img.width)/3):0,b=this._anim.f?Math.floor((this._anim.h-this._img.height)/3):0;this._img.width+=a;this._img.height+=b;if(Math.abs(a)<1)this._img.width=this._anim.w;if(Math.abs(b)<1)this._img.height=this._anim.h;if(this._anim.w==this._img.width&&this._anim.h==this._img.height){if(this._changed=!1,this._set_photo_size(),this._anim.step==0)this._anim.step=1,this._anim.a=0,this._show_image(),this._setOpacity(this._img,this._anim.a)}else this._anim.step==2&&
!this._expanded&&this._show_caption(!0)},_doFadeIn:function(){this._anim.a+=2;if(this._anim.a>10)this._anim.step=2,this._anim.a=9.9;this._setOpacity(this._img,this._anim.a)},_doFadeOut:function(){this._anim.a-=1;if(this._anim.a<1){this._anim.step=2;this._anim.a=0;if(this._timer!=null)window.clearInterval(this._timer),this._timer=null;this._toggle_wrap(!1)}this._setOpacity(this._wrap,this._anim.a)},_setOpacity:function(a,b){Spica.Browser.isWinIE?a.style.filter="alpha(opacity="+b*10+")":a.style.opacity=
b/10},_close_box:function(){this._open=-1;this._openedset=null;this._hide_action();this._reset_func();this._show_overall(!1);this._box.style.display="none";if(!this._anim.f&&this._timer!=null)window.clearInterval(this._timer),this._timer=null},_show_next:function(a){if(!this._openedset)return this._close(null);a=this._sets[this._openedset][this._current_setindex()+a];this._close_box();this._show(a)},_close:function(a){if(a!=null&&(a=Spica.Event.getEvent(a),(a=a.target||a.srcElement)&&a.getAttribute("id")==
"lightboxImage"&&this._expanded))return;this._close_box();this._anim.f&&this._anim.step==2?(this._anim.step=3,this._anim.a=5):this._toggle_wrap(!1)}};Spica.Event.run(function(){new Lightbox({loadingimg:"/images/resource/loading.gif",expandimg:"/images/resource/expand.gif",shrinkimg:"/images/resource/shrink.gif",blankimg:"/images/resource/blank.gif",previmg:"/images/resource/prev.gif",nextimg:"/images/resource/next.gif",closeimg:"/images/resource/close.gif",effectimg:"/images/resource/new.gif",effectpos:{x:-40,y:-20},effectclass:"effectable",resizable:!0,animation:!0})});