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
      images:[],
      // an array of objects: [{url:..., desc:..., link:...},{url:..., desc:..., link:...},...]
      // if leaved empty then it looks into the HTML code for images as: 
      // <img src="elements/gallery1/HR/01.jpg" title="photo n°1" data-link="http://pupunzi.com" data_thumb="elements/gallery1/HR/01_thumb.jpg">
      thumbPlaceHolder:"#thumbs",
      resizeEnabled:false,
      transitionTime:600,
      imageWrapperWidth:"50%",
      imageMinWidth:550,
      defaultScale:.3,
      defaultOpacity:.7,
      onStart:function(){},
      onChange:function(){}
    },

    build:function(opt){
      return this.each(function(){
        var gallery=this;
        var $gallery=$(gallery);

        $gallery.find("img").hide();

        gallery.opt={};
        $.extend(gallery.opt,$.mbLinearGallery.defaults,opt);

        var galleryWrapper=$("<div/>").addClass("galleryWrapper");
        $gallery.append(galleryWrapper);

        galleryWrapper.css({
          overflow:"hidden",
          position: "relative",
          whiteSpace: "nowrap",
          "-moz-box-sizing": "border-box",
          verticalAlign: "top"
        });

        if (gallery.opt.images.length == 0){
          gallery.opt.images = $gallery.find("img");
        }


        for(var i=0; i<= gallery.opt.images.length-1;i++){
          var newImg=$.mbLinearGallery.buildImage(gallery,gallery.opt.images[i]);
          galleryWrapper.append(newImg);

          $.mbLinearGallery.buildThumbs(gallery,gallery.opt.images[i])
        }

        // Add empty elements at the beginning and at the end.
        galleryWrapper.prepend($.mbLinearGallery.buildImage(gallery));
        galleryWrapper.append($.mbLinearGallery.buildImage(gallery));

        // set the height of the gallery
        galleryWrapper.css({height:$(".galleryWrapper").parent().height()});

        var images=$("img",".imgWrapper");
        images.each(function(i){
          $(this).css({width:"auto",height:"100%"});
          if($(this).width()>=$(this).parent().width()){
            $(this).css({width:"100%",height:"auto"})
          }

          $(this).data("index",i+1)
        });

        $(window).resize(function(){$.mbLinearGallery.refresh(gallery)});
        $gallery.goTo(1,false);

      })
    },

    buildImage:function(gallery,imgObj){
      var imageWrapper= $("<div/>").addClass("imgWrapper");
      imageWrapper.css({
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
      });

      imageWrapper.click(function(){
        if($(this).find("img").length>0){
          var idx= $(this).index();
          $(gallery).goTo(idx,true);
        }
      });

      if(typeof imgObj == "object"){
        var url= imgObj.url ? imgObj.url : $(imgObj).attr("src");
        var link= imgObj.link ? imgObj.link : $(imgObj).data("link");
        var image=$("<img>").addClass("galleryImage").css({position:"relative"});
        image.css({
          margin: "auto",
          cursor: "pointer",
          height: "100%"
        });

        image.attr("src",url);
        imageWrapper.append(image);

        image.load(function(){
          var desc= imgObj.desc ? imgObj.desc : $(imgObj).attr("title");

          if(desc){
            var description=$("<div>").addClass("imageDesc")
              .css({position:"absolute",bottom:0,left:image.position().left, width:image.width(), display:"none"}).html(desc);
            imageWrapper.append(description);
            if(image.data("index")==1){
              description.fadeIn();
            }
          }

          if(link){
            $(this).click(function(){
              var idx= image.data("index");
              if(idx == gallery.opt.actualIdx ){
                window.open(link);
              }

            });

          }
        })
      }

      return imageWrapper;
    },

    buildThumbs:function(gallery,imgObj){
      
      var thumbPlaceHolder= $(gallery.opt.thumbPlaceHolder);
      var thumbURL= imgObj.url ? imgObj.thumb : $(imgObj).data("thumb");
      var thumb=$("<img>").addClass("imgThumb").attr("src",thumbURL);
      var thumbWrapper= $("<div>").addClass("thumbWrapper");

      thumbWrapper.append(thumb);

      thumbWrapper.click(function(){
        if($(this).find("img").length>0){
          var idx= $(this).index()+1;
          $(gallery).goTo(idx,true);
        }
      });



      thumbPlaceHolder.append(thumbWrapper);
    },

    goTo:function(idx, anim){
      var g= this.get(0);

      if(anim==undefined)
        anim=true;

      if(idx==g.opt.actualIdx && anim)
        return;

      g.opt.actualIdx=idx;

      var gallery=$(".galleryWrapper",g);
      var target= $(".imgWrapper").eq(g.opt.actualIdx);
      var allImages= $(".imgWrapper",g);

      var t=anim? g.opt.transitionTime:0;
      allImages.animate({opacity:g.opt.defaultOpacity, scale: g.opt.defaultScale},t/2,function(){
        allImages.removeClass("sel");
        target.addClass("sel");
        allImages.css("z-index",0);
        target.css("z-index",1);
        if(anim)
          $(".imageDesc", $(this)).fadeOut();
      });

      target.animate({opacity:1, scale: '1'},t,function(){
        if(anim)
        $(".imageDesc", target).fadeIn();
        $(".imageDesc", target).css({position:"absolute",bottom:0,left:$("img",target).position().left, width:$("img",target).width()});
      });


      var scrollLeft = (target.width()*g.opt.actualIdx) - (($(".galleryWrapper",g).outerWidth()-target.outerWidth())/2);

      $(".galleryWrapper",g).animate({scrollLeft:scrollLeft},t,function(){
        if(typeof g.opt.onChange == "function"){
          g.opt.onChange(g.opt.actualIdx);
        }
      });

    },

    refresh:function(gallery){

      var galleryWrapper= $(".galleryWrapper",$(gallery));
      var images=$("img",".imgWrapper");
      var prop = galleryWrapper.height()/ galleryWrapper.width();


      galleryWrapper.css({height:$(gallery).height()});

      images.each(function(){
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

  $.fn.mbLinearGallery= $.mbLinearGallery.build;
  $.fn.goTo= $.mbLinearGallery.goTo;

})(jQuery);