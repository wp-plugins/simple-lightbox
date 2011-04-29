var SLB=null;
(function(d){SLB={activeImage:null,badObjects:["select","object","embed"],container:null,enableSlideshow:null,groupName:null,imageArray:[],options:null,overlayDuration:null,overlayOpacity:null,playSlides:null,refTags:["a","area"],relAttribute:null,resizeDuration:null,slideShowTimer:null,startImage:null,prefix:"slb",checkedUrls:{},initialize:function(a){this.options=d.extend(true,{animate:true,validateLinks:false,captionEnabled:true,captionSrc:true,autoPlay:true,borderSize:10,containerID:document,enableSlideshow:true,
googleAnalytics:false,imageDataLocation:"south",initImage:"",loop:true,overlayDuration:0.2,overlayOpacity:0.8,relAttribute:"lightbox",resizeSpeed:400,showGroupName:false,slideTime:4,strings:{closeLink:"close",loadingMsg:"loading",nextLink:"next &raquo;",prevLink:"&laquo; prev",startSlideshow:"start slideshow",stopSlideshow:"stop slideshow",numDisplayPrefix:"Image",numDisplaySeparator:"of"},placeholders:{slbContent:'<img id="slb_slbContent" />',slbLoading:'<span id="slb_slbLoading">loading</span>',
slbClose:'<a class="slb_slbClose" href="#">close</a>',navPrev:'<a class="slb_navPrev slb_nav" href="#">&laquo; prev</a>',navNext:'<a class="slb_navNext slb_nav" href="#">&raquo; next</a>',navSlideControl:'<a class="slb_navSlideControl" href="#">Stop</a>',dataCaption:'<span class="slb_dataCaption"></span>',dataNumber:'<span class="slb_dataNumber"></span>'},layout:null},a);if(!this.options.layout||this.options.layout.toString().length==0)this.end();if(this.options.animate){this.overlayDuration=Math.max(this.options.overlayDuration,
0);this.resizeDuration=this.options.resizeSpeed}else this.resizeDuration=this.overlayDuration=0;this.enableSlideshow=this.options.enableSlideshow;this.overlayOpacity=Math.max(Math.min(this.options.overlayOpacity,1),0);this.playSlides=this.options.autoPlay;this.container=d(this.options.containerID);this.relAttribute=this.options.relAttribute;this.updateImageList();var b=this;a=d(this.container).get(0)!=document?this.container:d("body");d("<div/>",{id:this.getID("overlay"),css:{display:"none"}}).appendTo(a).click(function(){b.end()});
a=d("<div/>",{id:this.getID("lightbox"),css:{display:"none"}}).appendTo(a).click(function(){b.end()});var c=this.getLayout();d(c).appendTo(a);this.setUI();this.setEvents();this.options.initImage!=""&&this.start(d(this.options.initImage))},getLayout:function(){var a=this.options.layout,b,c;for(b in this.options.placeholders){c="{"+b+"}";if(a.indexOf(c)!=-1){c=new RegExp(c,"g");a=a.replace(c,this.options.placeholders[b])}}return a},setUI:function(){var a=this.options.strings;this.get("slbClose").html(a.closeLink);
this.get("navNext").html(a.nextLink);this.get("navPrev").html(a.prevLink);this.get("navSlideControl").html(this.playSlides?a.stopSlideshow:a.startSlideshow)},setEvents:function(){var a=this;this.get("container,details").click(function(e){e.stopPropagation()});var b=function(){a.get("navPrev").unbind("click").click(false);setTimeout(function(){a.get("navPrev").click(b)},500);a.showPrev();return false};this.get("navPrev").click(function(){return b()});var c=function(){a.get("navNext").unbind("click").click(false);
setTimeout(function(){a.get("navNext").click(c)},500);a.showNext();return false};this.get("navNext").click(function(){return c()});this.get("navSlideControl").click(function(){a.toggleSlideShow();return false});this.get("slbClose").click(function(){a.end();return false})},updateImageList:function(){for(var a,b,c,e=this,g=0;g<this.refTags.length;g++){b=d(this.container).find(this.refTags[g]);for(var i=0;i<b.length;i++){a=b[i];c=d(a).attr("rel");d(a).attr("href")&&c.toLowerCase().match(this.relAttribute)&&
d(a).click(function(){e.start(this);return false})}}},getCaption:function(a){a=d(a);var b="";if(this.options.captionEnabled){b=a.attr("title")||"";if(b==""){var c=d(a).find("img").first();if(d(c).length)b=d(c).attr("title")||d(c).attr("alt");if(!b)if(a.text().length)b=a.text();else if(this.options.captionSrc)b=a.attr("href");b||(b="")}}return b},start:function(a){a=d(a);this.hideBadObjects();this.imageArray=[];this.groupName=this.getGroup(a);d(a).attr("rel");var b=this,c={};this.fileExists(d(a).attr("href"),
function(){b.get("overlay").height(d(document).height()).fadeTo(b.overlayDuration,b.overlayOpacity);var e=function(){b.startImage=0;var f=[],l;for(var k in c)f.push(k);f.sort(function(n,o){return n-o});for(k=0;k<f.length;k++){l=c[f[k]];if(d(l).get(0)==d(a).get(0))b.startImage=k;b.imageArray.push({link:d(l).attr("href"),title:b.getCaption(l)})}f=d(document).scrollTop()+d(window).height()/15;b.get("lightbox").css("top",f+"px").show();b.changeImage(b.startImage)};if(null==b.groupName){c[0]=a;b.startImage=
0;e()}else{var g=d(b.container).find(d(a).get(0).tagName.toLowerCase()),i=[],h,j;for(h=0;h<g.length;h++){j=d(g[h]);j.attr("href")&&b.getGroup(j)==b.groupName&&i.push(j)}var m=0;for(h=0;h<i.length;h++){j=i[h];b.fileExists(d(j).attr("href"),function(f){c[f.idx]=f.els[f.idx];m++;m==f.els.length&&e()},function(f){m++;f.idx==f.els.length&&e()},{idx:h,els:i})}}},function(){b.end()})},getGroup:function(a){var b=null,c="";a=d(a).attr("rel");c=this.relAttribute;for(var e=true,g;e;){g=a.indexOf(c);if(g==-1)return b;
if(" "!=c.charAt(0)&&g>0)c=" "+c;else e=false}c=d.trim(a.substring(g).replace(c,""));if(c.length&&"["==c.charAt(0)&&c.indexOf("]")!=-1)b=c.substring(1,c.indexOf("]"));return b},changeImage:function(a){this.activeImage=a;this.disableKeyboardNav();this.pauseSlideShow();this.get("slbLoading").show();this.get("slbContent").hide();this.get("details").hide();var b=new Image,c=this;d(b).bind("load",function(){c.get("slbContent").attr("src",b.src);c.resizeImageContainer(b.width,b.height);c.isSlideShowActive()&&
c.startSlideShow()});b.src=this.imageArray[this.activeImage].link},resizeImageContainer:function(a,b){this.get("container");var c=this.options.borderSize*2;this.get("container").animate({width:a+c,height:b+c},this.resizeDuration);this.showImage()},showImage:function(){this.get("slbLoading").hide();var a=this;this.get("slbContent").fadeIn(500,function(){a.updateDetails()});this.preloadNeighborImages()},updateDetails:function(){if(this.options.captionEnabled){this.get("dataCaption").text(this.imageArray[this.activeImage].title);
this.get("dataCaption").show()}else this.get("dataCaption").hide();if(this.hasImages()){var a=this.options.strings.numDisplayPrefix+" "+(this.activeImage+1)+" "+this.options.strings.numDisplaySeparator+" "+this.imageArray.length;if(this.options.showGroupName&&this.groupName!="")a+=" "+this.options.strings.numDisplaySeparator+" "+this.groupName;this.get("dataNumber").text(a).show()}this.get("details").width(this.get("slbContent").width()+this.options.borderSize*2);this.updateNav();this.get("details").animate({height:"show",
opacity:"show"},650)},updateNav:function(){if(this.hasImages()){this.get("navPrev").show();this.get("navNext").show();if(this.enableSlideshow){this.get("navSlideControl").show();this.playSlides?this.startSlideShow():this.stopSlideShow()}else this.get("navSlideControl").hide()}else{this.get("dataNumber").hide();this.get("navPrev").hide();this.get("navNext").hide();this.get("navSlideControl").hide()}this.enableKeyboardNav()},isSlideShowActive:function(){return this.playSlides},startSlideShow:function(){this.playSlides=
true;var a=this;clearInterval(this.slideShowTimer);this.slideShowTimer=setInterval(function(){a.showNext();a.pauseSlideShow()},this.options.slideTime*1E3);this.get("navSlideControl").text(this.options.strings.stopSlideshow)},stopSlideShow:function(){this.playSlides=false;this.slideShowTimer&&clearInterval(this.slideShowTimer);this.get("navSlideControl").text(this.options.strings.startSlideshow)},toggleSlideShow:function(){this.playSlides?this.stopSlideShow():this.startSlideShow()},pauseSlideShow:function(){this.slideShowTimer&&
clearInterval(this.slideShowTimer)},hasImage:function(){return this.imageArray.length>0},hasImages:function(){return this.imageArray.length>1},isFirstImage:function(){return this.activeImage==0},isLastImage:function(){return this.activeImage==this.imageArray.length-1},showNext:function(){if(this.hasImages()){if(!this.options.loop&&this.isLastImage())return this.end();this.isLastImage()?this.showFirst():this.changeImage(this.activeImage+1)}},showPrev:function(){if(this.hasImages()){if(!this.options.loop&&
this.isFirstImage())return this.end();this.activeImage==0?this.showLast():this.changeImage(this.activeImage-1)}},showFirst:function(){this.hasImages()&&this.changeImage(0)},showLast:function(){this.hasImages()&&this.changeImage(this.imageArray.length-1)},enableKeyboardNav:function(){var a=this;d(document).keydown(function(b){a.keyboardAction(b)})},disableKeyboardNav:function(){d(document).unbind("keydown")},keyboardAction:function(a){keycode=a==null?event.keyCode:a.which;key=String.fromCharCode(keycode).toLowerCase();
if(keycode==27||key=="x"||key=="o"||key=="c")this.end();else if(key=="p"||key=="%")this.showPrev();else if(key=="n"||key=="'")this.showNext();else if(key=="f")this.showFirst();else if(key=="l")this.showLast();else key=="s"&&this.hasImage()&&this.options.enableSlideshow&&this.toggleSlideShow()},preloadNeighborImages:function(){var a=this.imageArray.length-1==this.activeImage?0:this.activeImage+1;nextImage=new Image;nextImage.src=this.imageArray[a].link;a=this.activeImage==0?this.imageArray.length-
1:this.activeImage-1;prevImage=new Image;prevImage.src=this.imageArray[a].link},end:function(){this.disableKeyboardNav();this.pauseSlideShow();this.get("lightbox").hide();this.get("overlay").fadeOut(this.overlayDuration);this.showBadObjects()},showBadObjects:function(a){d(this.badObjects.join(",")).css("visibility",(typeof a=="undefined"?true:!!a)?"visible":"hidden")},hideBadObjects:function(){this.showBadObjects(false)},addPrefix:function(a){return this.prefix+"_"+a},getID:function(a){return this.addPrefix(a)},
getSel:function(a){var b="#";if(a.toString().indexOf(",")!=-1){a=a.toString().split(",");for(b=0;b<a.length;b++)a[b]=this.getSel(d.trim(a[b]));a=a.join(",")}else{if(a in this.options.placeholders)d(this.options.placeholders[a]).attr("id")||(b=".");a=b+this.getID(a)}return a},get:function(a){return d(this.getSel(a))},fileExists:function(a,b,c,e){if(!this.options.validateLinks)return b(e);var g=this,i=function(j){if(j.status<400)d.isFunction(b)&&b(e);else d.isFunction(c)&&c(e)};if(a in this.checkedUrls)i(this.checkedUrls[a]);
else{var h=new XMLHttpRequest;h.open("HEAD",a,true);h.onreadystatechange=function(){if(4==this.readyState){g.addUrl(a,this);i(this)}};h.send()}},addUrl:function(a,b){a in this.checkedUrls||(this.checkedUrls[a]=b)}}})(jQuery);
