/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.linearGallery.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 27/01/14 20.06
 *  *****************************************************************************
 */

/*Browser detection patch*/
if (!jQuery.browser) {
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1;
    var nAgt = navigator.userAgent;
    jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera")))jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("MSIE")))jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3, end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else-1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
    -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}


/*******************************************************************************
 jquery-animate-css-rotate-scale ©zachstronaut.
 A jquery implementation to manipulate scale and rotate as other CSS properties.
 https://github.com/zachstronaut/jquery-animate-css-rotate-scale


 inclusion jquery-animate-css-rotate-scale
 ******************************************************************************/

//(function(b){var d=null,i=b.fn.css;b.fn.css=function(a,c){d===null&&(d=typeof b.cssProps!="undefined"?b.cssProps:typeof b.props!="undefined"?b.props:{});if(typeof d.transform=="undefined"&&(a=="transform"||typeof a=="object"&&typeof a.transform!="undefined")){var e=d,f;a:{f=this.get(0);for(var h=["transform","WebkitTransform","msTransform","MozTransform","OTransform"],g;g=h.shift();)if(typeof f.style[g]!="undefined"){f=g;break a}f="transform"}e.transform=f}if(d.transform!="transform")if(a=="transform"){if(a= d.transform,typeof c=="undefined"&&jQuery.style)return jQuery.style(this.get(0),a)}else if(typeof a=="object"&&typeof a.transform!="undefined")a[d.transform]=a.transform,delete a.transform;return i.apply(this,arguments)};var e="deg";b.fn.rotate=function(a){var c=b(this).css("transform")||"none";if(typeof a=="undefined"){if(c&&(a=c.match(/rotate\(([^)]+)\)/))&&a[1])return a[1];return 0}if(a=a.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/))a[3]&&(e=a[3]),b(this).css("transform",c.replace(/none|rotate\([^)]*\)/, "")+"rotate("+a[1]+e+")");return this};b.fn.scale=function(a){var c=b(this).css("transform");if(typeof a=="undefined"){if(c&&(a=c.match(/scale\(([^)]+)\)/))&&a[1])return a[1];return 1}b(this).css("transform",c.replace(/none|scale\([^)]*\)/,"")+"scale("+a+")");return this};var h=b.fx.prototype.cur;b.fx.prototype.cur=function(){if(this.prop=="rotate")return parseFloat(b(this.elem).rotate());else if(this.prop=="scale")return parseFloat(b(this.elem).scale());return h.apply(this,arguments)};b.fx.step.rotate= function(a){b(a.elem).rotate(a.now+e)};b.fx.step.scale=function(a){b(a.elem).scale(a.now)};var j=b.fn.animate;b.fn.animate=function(a){if(typeof a.rotate!="undefined"){var b=a.rotate.toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);b&&b[5]&&(e=b[5]);a.rotate=b[1]}return j.apply(this,arguments)}})(jQuery);


/*!
 /**
 * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
 * scale and rotation independently.
 * https://github.com/zachstronaut/jquery-animate-css-rotate-scale
 * Released under dual MIT/GPL license just like jQuery.
 * 2009-2012 Zachary Johnson www.zachstronaut.com
 */
(function ($) {
	// Updated 2010.11.06
	// Updated 2012.10.13 - Firefox 16 transform style returns a matrix rather than a string of transform functions.  This broke the features of this jQuery patch in Firefox 16.  It should be possible to parse the matrix for both scale and rotate (especially when scale is the same for both the X and Y axis), however the matrix does have disadvantages such as using its own units and also 45deg being indistinguishable from 45+360deg.  To get around these issues, this patch tracks internally the scale, rotation, and rotation units for any elements that are .scale()'ed, .rotate()'ed, or animated.  The major consequences of this are that 1. the scaled/rotated element will blow away any other transform rules applied to the same element (such as skew or translate), and 2. the scaled/rotated element is unaware of any preset scale or rotation initally set by page CSS rules.  You will have to explicitly set the starting scale/rotation value.

	function initData($el) {
		var _ARS_data = $el.data('_ARS_data');
		if (!_ARS_data) {
			_ARS_data = {
				rotateUnits: 'deg',
				scale: 1,
				rotate: 0
			};

			$el.data('_ARS_data', _ARS_data);
		}

		return _ARS_data;
	}

	function setTransform($el, data) {
		$el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
	}

	$.fn.rotate = function (val) {
		var $self = $(this), m, data = initData($self);

		if (typeof val == 'undefined') {
			return data.rotate + data.rotateUnits;
		}

		m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
		if (m) {
			if (m[3]) {
				data.rotateUnits = m[3];
			}

			data.rotate = m[1];

			setTransform($self, data);
		}

		return this;
	};

	// Note that scale is unitless.
	$.fn.scale = function (val) {
		var $self = $(this), data = initData($self);

		if (typeof val == 'undefined') {
			return data.scale;
		}

		data.scale = val;

		setTransform($self, data);

		return this;
	};

	// fx.cur() must be monkey patched because otherwise it would always
	// return 0 for current rotate and scale values
	var curProxied = $.fx.prototype.cur;
	$.fx.prototype.cur = function () {
		if (this.prop == 'rotate') {
			return parseFloat($(this.elem).rotate());

		} else if (this.prop == 'scale') {
			return parseFloat($(this.elem).scale());
		}

		return curProxied.apply(this, arguments);
	};

	$.fx.step.rotate = function (fx) {
		var data = initData($(fx.elem));
		$(fx.elem).rotate(fx.now + data.rotateUnits);
	};

	$.fx.step.scale = function (fx) {
		$(fx.elem).scale(fx.now);
	};

	/*

	 Starting on line 3905 of jquery-1.3.2.js we have this code:

	 // We need to compute starting value
	 if ( unit != "px" ) {
	 self.style[ name ] = (end || 1) + unit;
	 start = ((end || 1) / e.cur(true)) * start;
	 self.style[ name ] = start + unit;
	 }

	 This creates a problem where we cannot give units to our custom animation
	 because if we do then this code will execute and because self.style[name]
	 does not exist where name is our custom animation's name then e.cur(true)
	 will likely return zero and create a divide by zero bug which will set
	 start to NaN.

	 The following monkey patch for animate() gets around this by storing the
	 units used in the rotation definition and then stripping the units off.

	 */

	var animateProxied = $.fn.animate;
	$.fn.animate = function (prop) {
		if (typeof prop['rotate'] != 'undefined') {
			var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
			if (m && m[5]) {
				$self = $(this);
				data = initData($self);
				data.rotateUnits = m[5];
			}

			prop['rotate'] = m[1];
		}

		return animateProxied.apply(this, arguments);
	};
})(jQuery);


/*******************************************************************************
 end inclusion
 ******************************************************************************/


/*******************************************************************************
 jQuery.mb.components: jquery.mb.pagination
 version: 1.0
 © 2001 - 2011 Matteo Bicocchi (pupunzi), Open Lab

 inclusion: jquery.mb.pagination.js
 ******************************************************************************/

$.fn.initPagination=function(b){var a=this.get(0);a.opt={elements:null,elsPerPage:null,navigationID:null,showNextPrev:null,showIdxList:null,showIdx:null,maxPage:null,nextLabel:"next",prevLabel:"prev"};$.extend(a.opt,b);if(a.opt.elements)a.opt.elements.hide(),a.paginationIDX=-1,a.pages=[],a.totPages=Math.ceil(a.opt.elements.length/a.opt.elsPerPage),$(a).buildIndex(a.opt.elements,a.opt.elsPerPage,a.opt.navigationID),$(a).paginateNext(a.opt.elements,a.opt.elsPerPage,a.opt.navigationID)}; $.fn.buildIndex=function(b,a,c){for(var d=this.get(0),g=d.opt.maxPage&&d.totPages>d.opt.maxPage?d.opt.maxPage:d.totPages,e=0;e<g;e++){d.pages[e]=[];for(var f=a*e;f<a*e+a;f++)b.eq(f).length>0&&d.pages[e].push(b.eq(f))}a=$("#"+c);d.totPages>1&&a.show();if(d.opt.showIdxList){a.find(".navIdx").remove();c=$("<div/>").addClass("navIdx");a.append(c);for(e=0;e<g;e++)f=$("<span/>").html(e+1).addClass("index").attr("idx",e),c.append(f),f.bind("click.pagination",function(){$(d).paginateIdx(b,$(this).attr("idx"))})}if(d.opt.showNextPrev){a.find(".navNextPrev").remove(); var h=$("<div/>").addClass("navNextPrev"),e=$("<span/>").addClass("next").html(d.opt.nextLabel).bind("click.pagination",function(a){$(d).paginateNext(b);a.stopPropagation()}),c=$("<span/>").addClass("prev").html(d.opt.prevLabel).bind("click.pagination",function(a){$(d).paginatePrev(b);a.stopPropagation()});h.append(c).append(e).append(i);a.prepend(h)}if(d.opt.showIdx){var i=$("<span/>").addClass("idx").html("1&#8211;"+g);h.append(i)}$(d).manageNav()}; $.fn.paginateNext=function(b){var a=this.get(0);if(!(a.paginationIDX>=(a.opt.maxPage&&a.totPages>a.opt.maxPage?a.opt.maxPage:a.totPages)-1)){a.paginationIDX++;b.hide();$("#"+a.opt.navigationID);var b=a.pages[a.paginationIDX],c;for(c in b)b[c].fadeIn(100);$(a).manageNav()}};$.fn.paginatePrev=function(b){var a=this.get(0);if(!(a.paginationIDX<1)){a.paginationIDX--;b.hide();var b=a.pages[a.paginationIDX],c;for(c in b)b[c].fadeIn(100);$(a).manageNav()}}; $.fn.paginateIdx=function(b,a){var c=this.get(0);b.hide();c.paginationIDX=a;$(c).manageNav();var c=c.pages[c.paginationIDX],d;for(d in c)c[d].show()};$.fn.getPageFromIndex=function(b,a){var c=this.get(0);if(!a)a=c.opt.elsPerPage;var d=Math.floor((b-1)/a);c.paginationIDX!=d&&$(".index").eq(d).click()}; $.fn.manageNav=function(){var b=this.get(0),a=b.opt.maxPage&&b.totPages>b.opt.maxPage?b.opt.maxPage:b.totPages,c=$("#"+b.opt.navigationID),d=c.find("[idx]").eq(b.paginationIDX);c.find("[idx]").removeClass("sel");d.addClass("sel");b.totPages<=1?(c.find(".prev").remove(),c.find(".next").remove(),c.find(".index").remove()):(b.paginationIDX==0?c.find(".prev").addClass("disabled"):c.find(".prev").removeClass("disabled"),b.paginationIDX==a-1?c.find(".next").addClass("disabled"):c.find(".next").removeClass("disabled"), b.opt.showIdx&&c.find(".idx").html(b.paginationIDX+1+"&#8211;"+a))};

/*******************************************************************************
 end inclusion
 ******************************************************************************/

(function($) {

    $.mbLinearGallery={
        name:"mb.linearGallery",
        author:"Matteo Bicocchi",
        version:"1.1",

        defaults:{
            elements:[], // if empty get children
            thumbPlaceHolder:"#thumbs",
            resizeEnabled:false,
            transitionTime:600,
            imageWrapperWidth:"0%",
            imageMinWidth:550,
            defaultScale:.2,
            defaultOpacity:.4,
            enableZoom:true,
            addTouch:true,
            onStart:function(){},
            onChange:function(){},
            onCreateThumbs:function(){}
        },

        build:function(opt){
            return this.each(function(){
                var gallery=this;
                var $gallery=$(gallery);

                $gallery.children().hide();

                gallery.opt={};
                $.extend(gallery.opt,$.mbLinearGallery.defaults,opt);

                if (gallery.opt.elements.length == 0){
                    gallery.opt.elements = $gallery.children();
                }

                var galleryWrapper=$("<div/>").addClass("galleryWrapper");
                $gallery.append(galleryWrapper);

                galleryWrapper.css({
                    overflow:"hidden",
                    position: "relative",
                    whiteSpace: "nowrap",
                    "-moz-box-sizing": "border-box",
                    verticalAlign: "top"
                });

                for(var i=0; i<= gallery.opt.elements.length-1;i++){
                    var newImg=$.mbLinearGallery.buildImage(gallery,gallery.opt.elements[i],i+1);
                    galleryWrapper.append(newImg);
                    $.mbLinearGallery.buildThumbs(gallery,gallery.opt.elements[i]);
                }

                // Add empty elements at the beginning and at the end.
                galleryWrapper.prepend($.mbLinearGallery.buildImage(gallery));
                galleryWrapper.append($.mbLinearGallery.buildImage(gallery));

                // set the height of the gallery
                galleryWrapper.css({height:$(".galleryWrapper").parent().height()});

                var elements=$(".element",".elementWrapper");
                elements.each(function(i){
                    var el = $(this);
                    el.css({width:"auto",height:"100%"}).hide();

                    if(el.width()>=el.parent().width()){
                        el.css({width:"100%",height:"auto"});
                    }
                    $(".imageDesc", el).css({position:"absolute", left:$("img",el.parent()).position().left, width:$("img",el.parent()).width()});

                    el.fadeIn(3000, function(){
                    });
                });

                $(window).resize(function(){$.mbLinearGallery.refresh(gallery)});

                if(gallery.opt.addTouch)
                    $gallery.addTouch();

                if(typeof gallery.opt.onCreateThumbs=="function")
                    gallery.opt.onCreateThumbs(gallery.opt.thumbPlaceHolder);

                $gallery.goTo(1,true);

            });
        },

        buildImage:function(gallery, imgObj, idx){
            var elementWrapper= $("<div/>").addClass("elementWrapper");

            elementWrapper.css({
                position: "relative",
                overflow:"hidden",
                width: gallery.opt.imageWrapperWidth,
                minWidth: gallery.opt.imageMinWidth,
                height: "101%",
                display: "inline-block",
                "text-align": "center",
                "-moz-box-sizing": "border-box",
                //        margin: -2,
                padding: 0,
                "vertical-align":"top"
            }).click(function(){
                if($(this).children().length>0){
                    var idx= $(this).index();
                    $(gallery).goTo(idx,true);
                }
            });

            if(typeof imgObj == "object"){
                var url= imgObj.url ? imgObj.url : $(imgObj).attr("src");
                var link= imgObj.link ? imgObj.link : $(imgObj).data("link");
                var element;

                if($(imgObj).data("nozoom") || link)
                    elementWrapper.addClass("noZoom");



                if(url){
                    element=$("<img>").addClass("galleryImage element").css({position:"relative"});
                    element.css({
                        margin: "auto",
                        cursor: "pointer",
                        height: "100%"
                    });
                    element.attr("src",url);
                }else{
                    element=$("<div/>").addClass("galleryBox element").css({position:"relative"});
                    element.css({
                        margin: "auto",
                        cursor: "pointer",
                        height: "100%"
                    });
                    var c= $(imgObj).clone().css({height: $(gallery).height()}).show();
                    element.html(c);
                }

                if(idx){
                    element.data("index",idx);
                }
                elementWrapper.append(element);

                var desc= imgObj.description ? imgObj.description : $(imgObj).attr("title");

                if(desc){
                    var description=$("<div>").addClass("imageDesc")
                        .css({position:"absolute",left:element.position().left, width:elementWrapper.width(), display:"none"}).html(desc);
                    elementWrapper.append(description);

                    /*
                     if(element.data("index")==1){
                     description.fadeIn();
                     }
                     */

                }
                if(link){
                    element.addClass("link");
                    element.click(function(){
                        var idx= element.data("index");
                        if(idx == gallery.opt.actualIdx ){
                            window.open(link);
                        }
                    });
                }else if(gallery.opt.enableZoom && !$(imgObj).data("nozoom")){
                    element.click(function(){
                        var idx= element.data("index");
                        if(idx == gallery.opt.actualIdx ){
                            var t=gallery.opt.transitionTime/1.5;
                            var zoomEl=$(this).clone().addClass("zoomEl");
                            var zoomDesc=$(this).parent().find(".imageDesc").clone().addClass("zoomDesc");
                            zoomDesc.css({position:"absolute",left:$(this).offset().left}).hide();

                            var startTop=$(this).offset().top;
                            zoomEl.css({position:"absolute", top:startTop,left:$(this).offset().left, width:$(this).width(), height:$(this).height()});

                            var overlay=$("<div>").addClass("overlay").hide();
                            $(overlay).append(zoomEl);
                            $(overlay).append(zoomDesc);
                            $("body").append(overlay);

                            var isHorizzontal=zoomEl.height()<zoomEl.width();

                            var scale=isHorizzontal ? ($(window).width()*70/zoomEl.width())/100: ($(window).height()*80/zoomEl.height())/100;

                            var elTop=($(window).height()-zoomEl.height())/2;

                            overlay.fadeIn(t*2, function(){
                                zoomEl.animate({scale: scale, top:elTop},t,function(){});
                                zoomDesc.fadeIn();
                            });
                            overlay.one("click",function(){
                                zoomDesc.fadeOut();
                                zoomEl.animate({scale: '1', top:startTop},t,function(){
                                    overlay.fadeOut(t*2,function(){overlay.remove()});
                                });
                            });
                        }
                    });
                }
            }
            return elementWrapper;
        },

        addTouch: function(){
            var $el = this;
            var el = $el.get(0);

            el.addEventListener('touchstart', function(event) {
                var touch = event.touches[0];
                el.opt.touchStartX= touch.pageX;
                el.opt.touchStartY= touch.pageY;
            });

            el.addEventListener('touchend', function(event) {
            });

            el.addEventListener('touchmove', function(event) {
                event.preventDefault();
                var touch = event.touches[0];
                if(touch.pageX > el.opt.touchStartX+300){
                    $el.goTo(el.opt.actualIdx-1,true);
                    el.opt.touchStartX=touch.pageX;
                }else if(touch.pageX < el.opt.touchStartX-300){
                    $el.goTo(el.opt.actualIdx+1,true);
                    el.opt.touchStartX=touch.pageX;
                }
            })
        },

        buildThumbs:function(gallery,imgObj){

            var thumbPlaceHolder= $(gallery.opt.thumbPlaceHolder);
            var thumbURL = imgObj.thumb ? imgObj.thumb : $(imgObj).data("thumb");
            thumbURL = thumbURL ? thumbURL : imgObj.src;
            var thumbTitle=imgObj.title; //.replace(/\|/g,".")
            var thumb=$("<img>").addClass("imgThumb").hide().load(function(){
                thumb.fadeIn(2000);
            }).attr({"src":thumbURL});
            var thumbWrapper= $("<div>").addClass("thumbWrapper");

            thumbWrapper.append(thumb);

            thumbWrapper.click(function(){
                if($(this).find("img").length>0){
                    var idx= $(this).index()+1;
                    $(gallery).goTo(idx,true);
                }
            });

            thumbWrapper.bind("mouseenter",function(){

                var titleDiv=$("<div>").addClass("thumbTitle");
                titleDiv.html(thumbTitle);
                titleDiv.css({position:"absolute", top:$(this).offset().top+$(this).height(), left:$(this).offset().left});
                $("body").append(titleDiv);
            }).bind("mouseleave",function(){
                $(".thumbTitle").remove();
            });

            thumbPlaceHolder.append(thumbWrapper);
        },

        goTo:function(idx, anim){
            var g= this.get(0);

            if(idx<=0 || idx>g.opt.elements.length) return;

            if(anim==undefined)
                anim=true;

            if(idx==g.opt.actualIdx && anim)
                return;

            g.opt.actualIdx=idx;

            var gallery=$(".galleryWrapper",g);
            var target= $(".elementWrapper").eq(g.opt.actualIdx);
            var allImages= $(".elementWrapper",g);

            var t=anim? g.opt.transitionTime:0;
            allImages.animate({opacity:g.opt.defaultOpacity, scale: g.opt.defaultScale},t/1.5,function(){
                allImages.removeClass("sel");
                target.addClass("sel");
                if(g.opt.enableZoom && !target.hasClass("noZoom"))
                    target.addClass("zoom");
                allImages.css("z-index",0);
                target.css("z-index",1);
                if(anim)
                    $(".imageDesc", $(this)).fadeOut();
            });

            target.animate({opacity:1, scale: '1'},t/2,function(){

                if(anim)
                    $(".imageDesc", target).fadeIn();
                $(".imageDesc", target).css({position:"absolute",left:$(".element",target).position().left, width:$(".element",target).width()});
            });

            var thumbContainer=$(g.opt.thumbPlaceHolder);
            $(".thumbWrapper",thumbContainer).removeClass("sel");
            var targetThumb= $(".thumbWrapper",thumbContainer).eq(g.opt.actualIdx-1);
            targetThumb.addClass("sel");

            var scrollLeft = (target.width()*g.opt.actualIdx) - (($(".galleryWrapper",g).outerWidth()-target.outerWidth())/2);

            $(".galleryWrapper",g).animate({scrollLeft:scrollLeft},t,function(){ //"easeOutSine",
                if(typeof g.opt.onChange == "function"){
                    g.opt.onChange(g.opt.actualIdx);
                }
            });

        },

        refresh:function(gallery){

            var galleryWrapper= $(".galleryWrapper",$(gallery));
            var elements=$(".element",".elementWrapper");
            var prop = galleryWrapper.height()/ galleryWrapper.width();


            galleryWrapper.css({height:$(gallery).height()});

            elements.each(function(){
                $(this).css({width:"auto",height:"100%"});
                if($(this).width()>=$(this).parent().width()){
                    $(this).css({width:"100%",height:"auto"})
                }
            });

            var h= $(".galleryWrapper",$(gallery)).width()*prop;

            if(gallery.opt.resizeEnabled){
                $(".galleryWrapper",$(gallery)).css({height:h});
            }

            $(gallery).goTo(gallery.opt.actualIdx,false);

        }
    };

    $.fn.mbLinearGallery = $.mbLinearGallery.build;
    $.fn.addTouch = $.mbLinearGallery.addTouch;
    $.fn.goTo = $.mbLinearGallery.goTo;

})(jQuery);
