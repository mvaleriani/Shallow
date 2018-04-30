"use strict";
var byond = new function(){
    this.constructor = function(data){
        cuppa.imgToSVG();
        new cuppa.autoDim();
        new cuppa.tweenmax();
        new cuppa.parallaxBg();
        new cuppa.wheelSmooth();
        new cuppa.layer();
        new cuppa.packery();
        new cuppa.coverImage();
        new cuppa.menu();
        new cuppa.footerFixed();
        new cuppa.responsiveImage();
        new cuppa.includeHTML();
        new cuppa.anchorSmooth();
        // jquery
        $('.hover-3d').tilt({speed:2000, transition: true, perspective:2000, maxTilt: 20});
        $("form").validate();
    }.bind(this); cuppa.ready(this.constructor);

    this.showMenuMobile = function(value, type){
        if(value == undefined) value = true;
        if(type == undefined) type = 1;
        if(value){
            switch (type) {
                case 1:
                    var menu = document.querySelector(".main-menu-dropdown");
                    if(!menu) return;
                    var animate = cuppa.elements(".animate", { parent:menu, reverse:true });
                    var tl = new TimelineMax();
                        tl.set("body", {overflow:"hidden"});
                        tl.add(function(){ cuppa.css(animate,{transition:"none !important"}) });
                        tl.set(menu, {display:"none", alpha:0} );
                        tl.to(menu, 0.3, {display:"block", alpha:1});
                        tl.staggerFromTo(animate, 0.4, {opacity:0, y:"+=10"}, {opacity:1, y:0}, 0.05);
                        tl.set(animate, {transition:"0.3s"});
                    break;
            }
        }else{
            switch (type) {
                case 1:
                    var menu = document.querySelector(".main-menu-dropdown");
                    if(!menu) return;
                    var tl = new TimelineMax();
                    tl.to(menu, 0.3, {display:"none", alpha:0});
                    tl.set("body", {"overflow-y":"auto"});
                    break;
            }
        }
    }.bind(this);

    this.onSubmit = function(form){
        form = cuppa.element(form)[0];
        if(!$(form).valid()) return false;
        var url = "https://www.onpixel.co/themes/byond/www/classes/sendForm.php";
        var data = cuppa.serialize(form);
        cuppa.ajax(url, {data:data}, function(result){
            alert("Your message has been successfully sent. We will contact you very soon!");
            form.reset();
        });
        return false;
    }.bind(this);
};