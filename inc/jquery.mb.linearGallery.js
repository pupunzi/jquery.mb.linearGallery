/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2011. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: mbicocchi@open-lab.com
 site: http://pupunzi.com

 Licences: MIT, GPL
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 ******************************************************************************/

/*
 * jQuery.mb.components: jquery.mb.linearGallery
 * version: 1.0
 * © 2001 - 2011 Matteo Bicocchi (pupunzi), Open Lab
 */

// jquery-animate-css-rotate-scale ©zachstronaut.
// A jquery implementation to manipulate scale and rotate as other CSS properties.
// https://github.com/zachstronaut/jquery-animate-css-rotate-scale

// inclusion jquery-animate-css-rotate-scale

(function(b){var d=null,i=b.fn.css;b.fn.css=function(a,c){d===null&&(d=typeof b.cssProps!="undefined"?b.cssProps:typeof b.props!="undefined"?b.props:{});if(typeof d.transform=="undefined"&&(a=="transform"||typeof a=="object"&&typeof a.transform!="undefined")){var e=d,f;a:{f=this.get(0);for(var h=["transform","WebkitTransform","msTransform","MozTransform","OTransform"],g;g=h.shift();)if(typeof f.style[g]!="undefined"){f=g;break a}f="transform"}e.transform=f}if(d.transform!="transform")if(a=="transform"){if(a= d.transform,typeof c=="undefined"&&jQuery.style)return jQuery.style(this.get(0),a)}else if(typeof a=="object"&&typeof a.transform!="undefined")a[d.transform]=a.transform,delete a.transform;return i.apply(this,arguments)};var e="deg";b.fn.rotate=function(a){var c=b(this).css("transform")||"none";if(typeof a=="undefined"){if(c&&(a=c.match(/rotate\(([^)]+)\)/))&&a[1])return a[1];return 0}if(a=a.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/))a[3]&&(e=a[3]),b(this).css("transform",c.replace(/none|rotate\([^)]*\)/, "")+"rotate("+a[1]+e+")");return this};b.fn.scale=function(a){var c=b(this).css("transform");if(typeof a=="undefined"){if(c&&(a=c.match(/scale\(([^)]+)\)/))&&a[1])return a[1];return 1}b(this).css("transform",c.replace(/none|scale\([^)]*\)/,"")+"scale("+a+")");return this};var h=b.fx.prototype.cur;b.fx.prototype.cur=function(){if(this.prop=="rotate")return parseFloat(b(this.elem).rotate());else if(this.prop=="scale")return parseFloat(b(this.elem).scale());return h.apply(this,arguments)};b.fx.step.rotate= function(a){b(a.elem).rotate(a.now+e)};b.fx.step.scale=function(a){b(a.elem).scale(a.now)};var j=b.fn.animate;b.fn.animate=function(a){if(typeof a.rotate!="undefined"){var b=a.rotate.toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);b&&b[5]&&(e=b[5]);a.rotate=b[1]}return j.apply(this,arguments)}})(jQuery);

// end inclusion ----------------------------

(function($) {

  $.mbLinearGallery={
    name:"mb.linearGallery",
    author:"Matteo Bicocchi",
    version:"1.0",
    defaults:{
      images:[], // an array of objects: [{url:..., desc:..., link:...},{url:..., desc:..., link:...},...]
      resizeEnabled:true,
      onStart:function(){}
    },

    build:function(opt){
      return this.each(function(){
        var gallery=this;
        var $gallery=$(gallery);

        gallery.opt={};
        $.extend(gallery.opt,$.mbLinearGallery.defaults,opt);

        gallery.opt.actualIdx=0;

        var galleryWrapper=$("<div/>").addClass("galleryWrapper");
        $gallery.append(galleryWrapper);

        galleryWrapper.css({
          overflow:"hidden",
          position: "relative",
          whiteSpace: "nowrap",
          "-moz-box-sizing": "border-box",
          verticalAlign: "top"
        });

        for(var i=0; i<= gallery.opt.images.length-1;i++){
          var newImg=$.mbLinearGallery.buildImage(gallery.opt.images[i]);
          galleryWrapper.append(newImg);
        }

        // Add empty elements at the beginning and at the end.
        galleryWrapper.prepend($.mbLinearGallery.buildImage());
        galleryWrapper.append($.mbLinearGallery.buildImage());

        // set the height of the gallery
        galleryWrapper.css({height:$(".galleryWrapper").parent().height()});

        var images=$("img",".imgWrapper");
        images.each(function(){
          $(this).css({width:"auto",height:"100%"});
          if($(this).width()>=$(this).parent().width()){
            $(this).css({width:"100%",height:"auto"})
          }
        });

        $(window).resize(function(){$.mbLinearGallery.refresh(gallery)});
        $gallery.goTo(gallery.opt.actualIdx,false,false);

      })
    },

    buildImage:function(imgObj){
      var imageWrapper= $("<div/>").addClass("imgWrapper");
      imageWrapper.css({
        position: "relative",
        width: "50%",
        height: "101%",
        display: "inline-block",
        "text-align": "center",
        "-moz-box-sizing": "border-box",
        margin: -2,
        padding: 0,
        "vertical-align":"top"
      });

      if(typeof imgObj == "object"){
        var url= imgObj.url;
        var desc= imgObj.desc;
        var link= imgObj.link;
        var content=$("<img>").addClass("galleryImage");
        imageWrapper.append(content);
        content.css({
          margin: "auto",
          height: "100%"
        });
        content.attr("src",url);
      }

      return imageWrapper;
    },

    goTo:function(idx, anim, async){
      console.debug(idx);

      var g= this.get(0);

      if(anim==undefined)
        anim=true;

      if(idx==g.opt.actualIdx && anim)
        return;


      g.opt.actualIdx=idx;


      var gallery=$(".galleryWrapper");
      var target= $(".imgWrapper").eq(g.opt.actualIdx);
      var allImages= $(".imgWrapper").not(target);


      if(!async)
        allImages= $(".imgWrapper");

      var t=anim? 800:0;

      allImages.animate({opacity:.2, scale: '.5'},t/2,function(){
        allImages.removeClass("sel");target.addClass("sel");
      });
      allImages.css("z-index",0);target.css("z-index",1);
      target.animate({opacity:1, scale: '1'},t,function(){});

      var scrollLeft = (target.width()*g.opt.actualIdx) - (($(".galleryWrapper").width()-target.width())/2);
      if (!anim)
        t=0;
      $(".galleryWrapper").animate({scrollLeft:scrollLeft},t);

    },

    refresh:function(gallery){

      var galleryWrapper= $(".galleryWrapper",$(gallery));
      var images=$("img",".imgWrapper");
      var prop = galleryWrapper.height()/ galleryWrapper.width();

      galleryWrapper.css({height:$(".galleryWrapper").parent().height()});

      images.each(function(){
        $(this).css({width:"auto",height:"100%"});
        if($(this).width()>=$(this).parent().width()){
          $(this).css({width:"100%",height:"auto"})
        }
      });

      var h= $(".galleryWrapper").width()*prop;
      if(gallery.opt.resizeEnabled)
        $(".galleryWrapper").css({height:h});

      $(gallery).goTo(gallery.opt.actualIdx,false);

    }
  };

  $.fn.mbLinearGallery= $.mbLinearGallery.build;
  $.fn.goTo= $.mbLinearGallery.goTo;

})(jQuery);