jQuery.event.add(window, 'load', function () {
    // userAgent
    function userAgent () {
        let UserAgent = navigator.platform;
        let agentBrowser = navigator.userAgent.toLowerCase();
        let isSafari = navigator.vendor.match(/apple/i);
        if (UserAgent.match(/i(Phone|Pod)/i) != null) {
            $('html').addClass('ios');
        } else {
            $('html').addClass('android');
        }
        if ((navigator.appName == 'Netscape' && agentBrowser.indexOf('trident') != -1) || (agentBrowser.indexOf("msie") != -1)) {
            $('html').addClass('ie11');
        }
        if (isSafari) { // mac용
            if (!$('html').hasClass('ios')) {
                $('html').removeClass('android').addClass('ios');
            }
        }
    }
    userAgent ();

    // layer pop
    $('.pop-open').on('click', function (e) {
        e.preventDefault();
        popupOpen($(this));
    });
    function popupOpen(target) {
        const popIdx = target.attr('data-pop');
        layerPop = $('.layer-pop' +'[data-pop=' + popIdx +']');
        popWrap = $('.layer-pop .pop-wrap');
        layerPop.fadeIn();
        popWrap.fadeIn();
    }
    $('.layer-pop').on('click', function (e) {
        const _this = $(this).closest('.layer-pop');
        const tarItem = $('.pop-outer, .btn-close');
        if ($(e.target).is(tarItem)) {
            popClose (_this);
        }
    });
    function popClose (target) {
        target.fadeOut();
        target.find(popWrap).fadeOut().parent().removeAttr('style');
    }


    //swiper
    let bLen = $('.b-list').length;

    for (var i = 0; i < bLen+1; i++) {
        let bListSwp = $('.bList-swp').eq(i);
        if (bListSwp.children('.list').length == 1) {
            let swpOpt = {},
            slideLength = bListSwp.children('.list').find('.swiper-slide').length;
            if (slideLength == 1) {
                swpOpt = {
                    allowSlidePrev: false,
                    allowSlideNext: false,
                    simulateTouch: false
                }
                bListSwp.find('.list [class*="swiper-button"]').hide();
            } else {
                if ($(window).width() > tbl) {
                    //pc
                    swpOpt = {
                        spaceBetween: 32,
                        slidesPerView: 3,
                        simulateTouch: true,
                        speed: 300,
                        loop: false,
                        observer: true,
                        observeParents: true,
                        watchSlidesVisibility: true,  
                        watchSlidesProgress: true, 
                    }
                } else {
                    //mo
                    swpOpt = {
                        spaceBetween: 0,
                        pagination: {
                            el: bListSwp.find('.swiper-pagination'),
                            clickable: true,
                            type: 'progressbar'
                        },
                        simulateTouch: true,
                        speed: 300,
                        loop: false,
                        observer: true,
                        observeParents: true,
                    }
                }
            }
            var brandThumbList = new Swiper(bListSwp.find('.list .swiper-container'), swpOpt);
        };

        if (bListSwp.find('.thumb').length == 1) {
            let swpOpt = {},
            slideLength = bListSwp.find('.thumb .swiper-slide').length;
            if (slideLength == 1) {
                swpOpt = {
                    allowSlidePrev: false,
                    allowSlideNext: false,
                    simulateTouch: false,
                }
                bListSwp.find('.thumb [class*="swiper-button"]').hide();
            } else {
                if ($(window).width() > tbl) {
                    //pc
                    swpOpt = {
                        thumbs: {
                            swiper: brandThumbList
                        },
                        pagination: {
                            el: bListSwp.find('.thumb .swiper-pagination'),
                            clickable: true,
                            type: 'progressbar'
                        },
                        speed: 100,
                        cssMode: true,
                        mousewheel: true,
                        keyboard: true,
                        observer: true,
                        observeParents: true,
                        navigation: false,
                    }
                } else {
                    //mo
                    swpOpt = {
                        pagination: {
                            el: bListSwp.find('.thumb .swiper-pagination'),
                            clickable: true,
                            type: 'progressbar'
                        },
                        navigation: {
                            nextEl: bListSwp.find('.swiper-button-next'),
                            prevEl: bListSwp.find('.swiper-button-prev'),
                        },
                        observer: true,
                        observeParents: true,
                        autoHeight:true,
                    }
                }
            }
            let brandDetailThumb = new Swiper(bListSwp.find('.thumb .swiper-container'), swpOpt);
        };
    }
});