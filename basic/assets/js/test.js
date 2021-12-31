jQuery.event.add(window, 'load', function () {
	const tabTar = $('.js-tab');
	const irCont = $('.ir-count');
	const inpItem = $('.inp-item');
	const headerOuter = $('.hmj-header');
	const innerCont = $('.drop-down-outer .inner-cont');
	const innerContLineHgt = $('.drop-down-outer .inner-cont').css('line-height');
	const boxHgt = innerCont.css('height', 'auto').height();


	innerCont.css('height', '22px');


	//gnb depth
	$('.btn-depth-switch:not(.toggle-menu), .btn-depth-prev').off();
	$('.btn-depth-switch:not(.toggle-menu), .btn-depth-prev').on('click', function (e) {
		if ($(this).hasClass('btn-depth-switch')) {
			$(this).addClass('active', function () {
				$('.gnb-menu-list > li').find('> button, > a').stop().animate({'opacity':'0'}, secVal[4]);
				$('.hmj-header .gnb-menu-list').css('overflow-y', 'hidden');
				if ($(window).width() <= tbl) {
					$('.account-box').eq(0).fadeOut(secVal[2]);
				}
			});
		} else {
			$('.gnb-menu-list > li').find('> button').stop().animate({'opacity':'1'}, secVal[4]);
			$('.gnb-menu-list > li').find('> a').stop().animate({'opacity':'.8'}, secVal[4]);
			$('.toggle-menu').removeClass('active').next().slideUp(secVal[2]);
			$(this).closest('li').find('.btn-depth-switch').removeClass('active');
			$('.hmj-header .gnb-menu-list').css('overflow-y', 'auto');
			if ($(window).width() <= tbl) {
				$('.account-box').fadeIn(secVal[2]);
			}
		}
	});

	//gnb 3depth toggle
	$('.toggle-menu').off();
	$('.toggle-menu').on('click', function () {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$(this).next().slideDown(secVal[2]);
		} else {
			$(this).next().slideUp(secVal[2]);
		}
	});



	irCont.each(function () {
		let irLeng = $(this).find('> .ir-item').length;
		for (let i = 0; i <= irLeng; i++) {
			$(this).find('> .ir-item').eq(i).css('transition-delay', '.' + i + 's');
			if (i > irNum[8]) {
				$(this).find('> .ir-item').eq(i).css('transition-delay', i / twoDig[0] + 's');
			}
		}
	});

	inpItem.on('keyup', function () {
		let inpItemVal = $(this).val();
		if (inpItemVal == 0) {
			$(this).parent().removeClass('active');
		} else {
			$(this).parent().addClass('active');
		}
	});

	$('.inp-close').on('click', function (e) {
		let returnTar = $(e.target).prev();
		$(this).closest('.inp-area').removeClass('active').find(inpItem).val(null);
		returnTar.focus();
	});

	$('.tooltip-box').on('mouseenter mouseleave click', '.btn-tooltip', function (e) {
		if (!$(this).hasClass('type-hover')) {
			if (e.type == 'click') {
				if (!$(this).hasClass('active') && !$(this).hasClass('type-hover') && !$('.btn-tooltip.active').length == 1) {
					$('.tooltip-cont').removeAttr('style');
				}
				tooltip($(this));
			}
		} else {
			if (!$(this).parent().is(':animated')) {
				if ($(window).width() > tbl) {
					if (e.type == 'mouseenter') {
						tooltip($(this));
					} else if (e.type == 'mouseleave') {
						$(this).parent().animate({ 'overflow': 'visible' }, secVal[1]);
						$('.btn-tooltip').removeClass('active');
						setObj(function () {
							$('.tooltip-cont').removeAttr('style');
							$('.tooltip-cont').removeClass('t-fix');
						}, secVal[1]);
					}
				} else {
					if (e.type == 'click') {
						if (!$(this).hasClass('active')) {
							setObj(function () {
								$('.tooltip-cont').removeAttr('style');
								$('.tooltip-cont').removeClass('t-fix');
							}, secVal[1]);
						}
						tooltip($(this));
					}
				}
			}
		}
	});

	$('.pop-open').on('click', function (e) {
		e.preventDefault();
		popupOpen($(this));
	});

	//checkbox all select 
	$(".check-terms").on("click", ".all input", function () {
		$(this).parents(".check-terms").find('input').prop("checked", $(this).is(":checked"));
	});

	//checkbox part select 
	$(".check-terms").on("click", ".normal input", function() {
		var is_checked = true;

		$(".check-terms .normal input").each(function(){
			is_checked = is_checked && $(this).is(":checked");
		});

		$(".all input").prop("checked", is_checked);
	});

	$('.layer-cont, .menu-inner-depth > ul').on('touchstart', function (e) {
		lastY = e.touches[0].clientY;
	});

	$('.layer-cont, .menu-inner-depth > ul').on('touchmove', function (e) {
		let top = e.touches[0].clientY;
		let scrollTop = $(e.currentTarget).scrollTop();
		let direction = (lastY - top) < 0 ? 'up' : 'down';
		
		if (scrollTop <= 0 && direction == 'up') {
			e.preventDefault();
		} else if (scrollTop >= (e.currentTarget.scrollHeight - $(window).outerHeight() + secVal[0]) && direction == 'down') {
			e.preventDefault();
		}
		lastY = top;
	});



	$('.btn-drop-down').on('click', function () {
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().addClass('active');
			innerCont.css('height', boxHgt);
		} else {
			$(this).parent().removeClass('active');
			innerCont.css('height', '22px');
		}
	});

	$('.header-cont .btn-search').on('click', function () {
		const searchTar = $('.gnb-search-dim');
		if (!searchTar.hasClass('active')) {
			searchTar.show();
			setObj(function () {
				searchTar.addClass('active');
				searchTar.find('.inp-item').focus();
			}, irNum[0]);
		} else {
			searchClose();
		}

		$('.btn-search-close, .gnb-search-dim').on('click', function (e) {
			const tarItem = $('.search-outer-box, .search-outer-box *:not(.btn-search-close)');
			if (!$(e.target).is(tarItem)) {
				searchClose();
			}
		});

		function searchClose () {
			searchTar.removeClass('active');
			setObj(function () {
				searchTar.find('.inp-item').val(null);
				searchTar.find('*').removeClass('active');
				$('.btn-search').focus();
				searchTar.hide();
			}, secVal[6]);
		}
	});

	// Header Search
	$('.search-outer-box').on('keyup', '.inp-item', function () {
		let inpVal = $(this).val();
		const searchParent = $(this).closest('.search-outer-box');
		if (!inpVal.length == 0) {
			searchParent.find('.keyword-box').addClass('active');
		} else {
			searchParent.find('.keyword-box').removeClass('active');
		}

		searchParent.find('.inp-close').on('click', function () {
			searchParent.find('.keyword-box').removeClass('active');
		});
	});


	function subContChk () {
		if (headerOuter.find('.sub-cont').length !== 0) {
			headerOuter.removeClass('none-sub');
		} else {
			headerOuter.addClass('none-sub');
		}
	}
	subContChk();

	// footer
	function resChk () {
		if ($(window).width() > tbl) {
			//pc
			$('html').removeClass('mo').addClass('pc');
			$('.mo-toggle').off()
			$('.footer-top .mo-toggle').find('.cont').show();
		} else {
			//mo
			$('html').removeClass('pc').addClass('mo');
			moToggle();
		}
	}
	resChk();

	function tooltip (target) {
		const btnTooltipWid = target.outerWidth();
		tooltipCont = target.closest('.tooltip-box').find('.tooltip-cont');
		tooltipContWid = target.closest('.tooltip-box').find('.tooltip-cont').width();
		if (tooltipContWid > secVal[4]) {
			tooltipCont.addClass('t-fix');
		} else {
			setObj(function () {
				tooltipCont.removeClass('t-fix');
			}, secVal[1]);
		}
		if ($(window).width() > tbl) {
			tooltipPadding = twoDig[0];
		} else {
			tooltipPadding = twoDig[1];
		}
		if ($(window).width() >= secVal[4]) {
			tooltipCont.css('margin-left', -(tooltipCont.outerWidth() / irNum[1] - btnTooltipWid / irNum[1]));
		} else {
			tooltipCont.css('width', $(window).width() - (tooltipPadding * irNum[1]));
		}
		if (!target.hasClass('active')) {
			$('.btn-tooltip').removeClass('active');
			target.addClass('active');
			const tooltipPos = tooltipCont.offset().left;
			const tooltipBoxWid = tooltipPos + tooltipCont.outerWidth();
			const tooltipSum = tooltipBoxWid - $(window).width();
			if (tooltipPos < 0) {
				tooltipCont.css({'left':-tooltipPos + tooltipPadding});
			}
			if (tooltipBoxWid > $(window).width()) {
				tooltipCont.css({'left':-(tooltipSum + tooltipPadding)});
			}
		} else {
			target.removeClass('active');
			setObj(function () {
				tooltipCont.removeAttr('style');
				tooltipCont.removeClass('t-fix');
			}, secVal[1]);
		}
		
		
		tooltipCont.find('.close').on('click', function(){
			$('.btn-tooltip').removeClass('active');
			setObj(function () {
				tooltipCont.removeAttr('style');
				tooltipCont.removeClass('t-fix');
			}, secVal[1]);
		})
	}

	if (!$('.js-is-sticky').length == 0) {
		$('.js-is-sticky').stickybits();
	}

	$(window).resize(function () {
	
		if ($('.tbl-box.row-fix').length !== 0) {
			tblFixRow();
		}
		if ($('.tbl-box.col-fix').length !== 0) {
			tblFixCol();
		}
		resChk();
		mapAutoHeight();
	});

	function tblFixRow () {
		if ($(window).width() <= tbl) {
			$('.tbl-box.row-fix').on('scroll', function () {
				const tblBox = $('.tbl-box.row-fix');
				const fixRow = $('.tbl-box.row-fix tr th:nth-child(1)');
				let fixLeft = tblBox.offset().left;
				if ($(this).scrollLeft() > 0) {
					fixRow.offset({'left':fixLeft});
					fixRow.css({'z-index':'999'});
				} else {
					fixRow.css({'left':'0', 'z-index':'-1'});
				}
			});
		}
	}
	if ($('.tbl-box.row-fix').length !== 0) {
		tblFixRow();
	}

	function tblFixCol () {
		if ($(window).width() <= tbl) {
			$('.tbl-box.col-fix').on('scroll', function () {
				const tblBox = $('.tbl-box.col-fix');
				const fixCol = $('.tbl-box.col-fix thead tr th');
				let fixTop = tblBox.offset().top;
				if ($(this).scrollTop() > 0) {
					fixCol.offset({'top':fixTop});
					fixCol.css({'z-index':'999'});
				} else {
					fixCol.css({'top':'0', 'z-index':'-1'});
				}
			});
		}
	}
	if ($('.tbl-box.col-fix').length !== 0) {
		tblFixCol();
	}

	//moToggle 
	function moToggle(){
		$('.mo-toggle').off()
		$('.mo-toggle .cont').slideUp(0);
		$('.mo-toggle .active .cont').slideDown(0);
		$('.mo-toggle').on('click', '.tit-btn, .mo-btn' ,function(){
			var toggleItem = $(this).parent('.item');
			if(toggleItem.hasClass('active')) {
				toggleItem.removeClass('active');
				toggleItem.find('.cont').slideUp(300);
			} else {
				toggleItem.addClass('active');
				toggleItem.find('.cont').slideDown(300);
			}
		});
	};

	// accordion common
	function accordion(){
		$('.accordion').off()
		$('.accordion').on('click', '.tit-btn', function() {
			var accordionItem = $(this).parent('.item');
			accordionItem.toggleClass('active').siblings('.item').removeClass('active');
			$('.accordion .item').find('.cont').slideUp(0);
			if(accordionItem.hasClass('active')) {
				accordionItem.find('.cont').slideDown(300);
			} else {
				accordionItem.find('.cont').slideUp(300);
			}
		})
	};
	accordion();

	// iframe map auto height
	function mapAutoHeight() {
		var bodyH = $(window).innerHeight();
		var topH = $('.hmj-header').height()
		if($(document).width() > tbl || $('.hmj-container.charge').length > 0) {
			$("[class*='intro-map']").css('height', bodyH - topH);
		}
	};
	mapAutoHeight();

	//textarea focus
	$('.inp-textarea').on('focusin focusout keyup', 'textarea', function (e) {
		if (e.type == 'focusin') {
			$(this).parent().addClass('focus');
		} else if (e.type == "focusout") {
			$(this).parent().removeClass('focus');
		} else {
			if ($(this).val() == 0) {
				$(this).parent().removeClass('active');
			} else {
				$(this).parent().addClass('active');
			}
		}
	});

	//filebox
	var fileTarget = $('.filebox .upload-hidden');		
	fileTarget.on('change', function(){ 
		var filename = $(this)[0].files[0].name; 
		$(this).parent('.filebox').find('.upload-name').val(filename);
		$(this).parent().find('.inp-close').show();
	});

	toggle();
	jsTab();
});

$(function () {
	const headerOuter = $('.hmj-header');
	const gnbMenuBox = $('.gnb-menu-box');
	$(window).on('scroll orientationchange', function (e) {
		const headerFixHgt = headerOuter.find('.header-cont').outerHeight(true) + irNum[0];
		// let topVal = parseInt($('body').css('top')) * -1;
		scrPos = $(this).scrollTop();
		if (e.type == 'scroll') {
			if (!$('.hmj-wrap').hasClass('mocean')) {
				if (!$('.gnb-menu-outer').hasClass('active')) {
					if ($('html').hasClass('ie11')) {
						$('.hmj-wrap').on('mousewheel DOMMouseScroll', function (e) {
							if ($('.sub-cont').length !== 0) {
								if (e.originalEvent.wheelDelta < 0) { // 아래로 스크롤 시
									headerOuter.addClass('header-fixed');
									headerOuter.css('top', -headerFixHgt);
									if ($(window).width() <= tbl && $('.sub-cont').is('display', 'none')) {
										headerOuter.addClass('scr-chk');
									}
								} else { // 위로 스크롤 시
									headerOuter.removeClass('header-fixed');
									headerOuter.css('top', 0);
									if ($(window).width() <= tbl && $('.sub-cont').is('display', 'none')) {
										headerOuter.removeClass('scr-chk').removeAttr('style');
									}
								}
							} else {
								if (e.originalEvent.wheelDelta < 0) {
									headerOuter.addClass('scr-chk');
									$('.main .hmj-header').removeClass('active');
								} else {
									headerOuter.removeClass('scr-chk').removeAttr('style');
									$('.main .hmj-header').addClass('active');
								}
							}
						});
					} else {
						if ($('.sub-cont').length !== 0) {
							if (scrPos > lastScrTopPos) { // 아래로 스크롤 시
								if (!$('.hmj-wrap').hasClass('type2') || $(window).width() > tbl) {
									headerOuter.addClass('header-fixed');
									if ($(window).width() <= tbl && $('.sub-cont').css('display') === 'none') {
										headerOuter.addClass('scr-chk');
									} else {
										headerOuter.css('top', -headerFixHgt);
									}
									if ($('.hmj-wrap').hasClass('tabFixed') && $('.tab-box-outer').hasClass('fixed')) { // 탭고정
										$(".tab-box-outer").addClass("down");
										$(".tab-box-outer").removeClass("up");
									}
								}
								if (scrPos < headerFixHgt) {
									headerOuter.attr('style', 'top: 0 !important;');
								}
							} else { // 위로 스크롤 시
								headerOuter.removeClass('header-fixed');
								headerOuter.css('top', 0);
								if ($('.hmj-wrap').hasClass('tabFixed') && $('.tab-box-outer').hasClass('fixed')) { // 탭고정
									$(".tab-box-outer").addClass("up");
									$(".tab-box-outer").removeClass("down");
								}
							}
						} else {
							if (scrPos > lastScrTopPos) {
								headerOuter.addClass('scr-chk');
								$('.main .hmj-header').removeClass('active');
							} else if (scrPos < lastScrTopPos && scrPos >= 0) {
								headerOuter.removeClass('scr-chk').removeAttr('style');
								$('.main .hmj-header').addClass('active');
							}
							if ($('html').hasClass('ios') && scrPos >= 0 && scrPos < 55) { // 아이폰 최상단 헤더 픽스
								headerOuter.removeClass('scr-chk').removeAttr('style');
								$('.main .hmj-header').addClass('active');
								$('.main .hmj-header').attr('style', 'top: 0 !important;')
							} else if (scrPos > 55) {
								$('.main .hmj-header').removeAttr('style');
							}
						}
					}
				}
				lastScrTopPos = scrPos;
			}
		} else if (e.type == 'orientationchange') {
			if (window.orientation == 0) {
				$(window).trigger('resize');
			} else {
				$(window).trigger('resize');
			}
		}
	});

	//gnb
	$('.btn-menu').on('click', function () {
		scrYPos = $(window).scrollTop();
		$(this).toggleClass('active');
		// if ($('html').hasClass('ios')) {
		// 	$('body').css({'position':'fixed', 'width':'100%'});
		// } else {
		// 	$('body').css('overflow', 'hidden');
		// }
		
		//모바일만 스크롤차단
		if ($(window).width() <= tbl) {
			$('body').css('overflow', 'hidden');
		};
		// gnb on
		if ($(this).hasClass('active')) {
			$('.hmj-header.scr-chk').css('backdrop-filter', 'unset');
			if ($('.hmj-wrap').hasClass('main')) {
				$('.hmj-header.active').css('backdrop-filter', 'unset');
			}
			setObj(function () {
				gnbMenuBox.parent().fadeIn(secVal[2], function () {
					gnbMenuBox.css('right', '0');
				});
			}, secVal[0]);
			setObj(function () {
				if ($(window).width() > tbl) {
					gnbMenuBox.parent().addClass('active').find('.btn-menu-close').stop().animate({'right':'22px'}, secVal[3]);
				} else {
					gnbMenuBox.parent().addClass('active').find('.btn-menu-close').stop().animate({'right':'11px'}, secVal[3]);
				}
			}, secVal[2]);
		}

		gnbMenuBox.parent().on('click', function (e) {
			const tarItem = $('.hmj-wrap:not(.hmj-header), .gnb-menu-outer *:not(.btn-menu-close)');
			if (!$(e.target).is(tarItem)) {
				// if ($('html').hasClass('ios')) {
				// 	$('body').css({'position':'static', 'width':'auto'});
				// } else {
				// 	$('body').css({'overflow':'visible'});
				// }
				
				if ($(window).width() > tbl) {
					gnbMenuBox.css('right', '-640px');
				} else {
					gnbMenuBox.css('right', '-100%');
					$('body').css('overflow', 'visible');
				}
				gnbMenuBox.parent().find('.btn-menu-close').stop().animate({'right':'-100px'}, secVal[2]);
				setObj(function () {
					gnbMenuBox.parent().removeClass('active').fadeOut(secVal[2]);
					$('.btn-depth-switch').removeClass('active');
					$(window).scrollTop(scrYPos);
					$('.hmj-header.scr-chk').css('backdrop-filter', 'blur(80px)');
					if ($('.hmj-wrap').hasClass('main')) {
						$('.hmj-header.active').css('backdrop-filter', 'blur(80px)');
					}
					$('.account-box').fadeIn(secVal[2]);
				}, secVal[2]);
				$('.btn-menu').removeClass('active');
				$('.toggle-menu').removeClass('active').next().slideUp(secVal[2]);
				$('.gnb-menu-list > li').find('> button').stop().animate({'opacity':'1'}, 500);
				$('.gnb-menu-list > li').find('> a').stop().animate({'opacity':'.8'}, 500);
			}
		});
	});

	//btn-top-box
	if($('.btn-top-box').length > 0 && !$('.hmj-wrap').hasClass('mocean')){

		//mo && mo-bottom-fixed
		if($(window).width() <= tbl && $('.hmj-container .mo-bottom-fixed').length > 0) {
			var bottomHgt = $('.mo-bottom-fixed').outerHeight() + 8;
			$('.btn-top-box').css('bottom', bottomHgt)
		}

		var lastPos = 0; 
		var	delta = 15;
		$(window).on('scroll', function() {
			var startPos = $(this).scrollTop();			
			if (startPos <= delta) {
				$('.btn-top-box').removeClass('active');
			} else {
				$('.btn-top-box').addClass('active');
			}
			lastPos = startPos;
		});

		$('.btn-top-box').on('click', '.btn-top', function(){
			// $(window).scrollTop(0);
			$('html, body').stop().animate({scrollTop:0}, secVal[3], 'easeInOutQuint');
		});
	};
});

// user agent
function checkAgent () {
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
checkAgent ();

function sideMenuInit () {
	// const innerCont = $('.drop-down-outer .inner-cont');
	// const innerContLineHgt = $('.drop-down-outer .inner-cont').css('line-height');
	const sideBox = $('.side-menu-wrap');
	const sideBoxHgt = sideBox.css('width', '217px').height();
	
	// // initializing style value
	// if (!innerCont.parent().hasClass('active')) {
	// 	innerCont.css('height', innerContLineHgt);
	// } else {
	// 	innerCont.css('height', boxHgt);
	// }
	sideBox.css({'width':'0', 'height':'0'});

	$('.btn-side-menu').on('click', function () {
		$(this).toggleClass('active');
		sideBox.toggleClass('active');

		if (sideBox.hasClass('active')) {
			sideBox.css({'width':'217px', 'height':sideBoxHgt});
		} else {
			sideBox.css({'width':'0', 'height':'0'});
		}

		$('.side-menu-wrap.active').on('click', '.btn-menu-close', function () {
			$('.btn-side-menu').removeClass('active');
			$('.side-menu-wrap').removeClass('active');
		});
	});
}

function iconTab(){
	var iconTabW = $('.icon-tab-list').find('li').outerWidth() / 2; 
	var iconTabC = $(window).width() / 2 - iconTabW;
	var iconTabP = $('.icon-tab-list').find('li.active').offset().left;

	$('.icon-tab-outer').scrollLeft(iconTabP - iconTabC);
}

// 충전소 정보 on
function stationOn() {
	if(!$('.station-info').hasClass('on')) {
		$('.station-info').addClass('on').fadeIn(100);
	}
}
// 충전소 정보 off
function stationOff() {
	$('.station-info').removeClass('on').fadeOut(100);
}

// tab
function jsTab() {
	$('.js-tab .tab-box-list > li').on('click', function (e) {
		const tabRoot = $(this).closest('.js-tab');
		const tabBoxItem = $('.js-tab-cont > div');
		let tabIdx = $(this).index();

		e.preventDefault();
		
		$(this).addClass('active').siblings().removeClass('active');
		tabRoot.find(tabBoxItem).removeClass('active').eq(tabIdx).addClass('active');		

		// tabScrCenter($(this));
		// function tabScrCenter (target) {
			const target = $(this);
			const tabScrBox = target.closest('.js-tab.x-scroll').find('.tab-box-list');
			const tabScrBoxItem = tabScrBox.find('li');
			let tabScrBoxHarf = tabScrBox.width() / irNum[1];
			let tabScrPos;
			let tabListWidth = 0;
			let tabTarLeft = 0;
			let tabPdValue = parseInt(tabScrBoxItem.parent().css('padding-left'));
			tabScrBoxItem.each(function () {
				tabListWidth += $(this).outerWidth();
			});
			for (let i = 0; i < target.index(); i++) tabTarLeft += tabScrBoxItem.eq(i).outerWidth();
			let tabTarPos = (tabTarLeft + target.outerWidth() / irNum[1] + tabPdValue);
			if (tabTarPos <= tabScrBoxHarf) {
				tabScrPos = 0;
			} else if (tabListWidth - tabTarPos <= tabScrBoxHarf) {
				tabScrPos = tabListWidth - tabScrBox.width() + (tabPdValue * irNum[1]);
			} else {
				tabScrPos = tabTarPos - tabScrBoxHarf;
			}
			tabScrBox.stop().animate({scrollLeft:tabScrPos}, secVal[2]);
		// }
	});	
};

//toggle common
function toggle(){
	$('.toggle').off();
	$('.toggle').on('click', '.tit-btn' ,function(){
		var toggleItem = $(this).parent('.item');
		if(toggleItem.hasClass('active')) {
			toggleItem.removeClass('active');
		} else {
			//브랜드거점일 경우만
			if(toggleItem.parents('.brand-branch').length == 1) {
				$('.toggle .item').removeClass('active');
			};
			toggleItem.addClass('active');
			if ($(this).parent().find('svg').hasClass('progress') == true) {
				$('.ie11 .progress').css('transform', 'rotate(-90deg)');
			};
		}
	});
};

// 선택형 아코디언
function selectDropdown(data){
	$('.select-dropdown .tit-btn').each(function(index, item){
		var name = $(item).attr('data-name');
		if(name == data){
			$('.select-dropdown .item').removeClass('active');
			$(item).parent('.item').addClass('active');
			// var itemTop = $(item).offset().top;
			// $('html,body').animate({scrollTop:itemTop}, 500);
		}
	});
};

// select
function customSelect () {
	//default selectbox
	$('div.slt-box:not(.shop-option)').on('click', '.selected-value', function (e) {
		if($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
		} else {
			$('div.slt-box').removeClass('active');
			$(this).parent().addClass('active');
		};
		$(this).parent().removeClass('on');

		//select option text
		$('.select-items').on('click', 'li', function () {
			//default selectbox
			var selectItem = $(this).text()
			$(this).addClass('selected').siblings('li').removeClass('selected');
			$(this).parent().siblings('.selected-value').text(selectItem);
			$(this).parents('div.slt-box').removeClass('active').addClass('on');
		});
	});

	//shop-option selectbox
	$('div.shop-option').on('click', '.selected-value', function (e) {
		if($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
			$('.mo-bottom-fixed > .scroll-area').css('height', 'auto');
		} else {
			$('div.slt-box').removeClass('active');
			$(this).parent().addClass('active');			
			floatAutoHeight();
		};

		//select option text
		$('.select-items').on('click', 'li', function () {
			$(this).parents('div.slt-box').removeClass('active');
		});
	});
	
	//outside click
	$('.hmj-wrap').on('click', function (e) {
		if(!$('div.slt-box').has(e.target).length) {
			$('div.slt-box').removeClass('active');
		}
	});
	
	//status desabled 
	if($('div.slt-box.disabled')) {
		$('div.slt-box.disabled').off();
	};
};

// popup
function popupOpen (target) {
	const bodyWid = $('body').width();
	const hgtSize = $(window).height() - 80;
	const popIdx = target.attr('data-pop-idx');
	popCont = $('.layer-popup-cont');
	popWrap = $('.layer-popup-wrap' + '[data-pop-idx=' + popIdx + ']');
	chkSwitch = true;
	$('.pc .hmj-header').css({'padding-right':'16px'}); //팝업오픈시 스크롤바 만큼 헤더 움직임 방지
	popWrap.fadeIn(secVal[2], function () {
		popAutoHgt();
	});
	popCont.fadeIn(secVal[2]);
	if (!popWrap.hasClass('full')) {
		$('body').css({'overflow':'hidden', 'width':bodyWid});
	}
	setObj(function () {
		popWrap.find(popCont).focus().append('<a href="#" class="tar-loop"></a>');
		$('.tar-loop').focusin(function () {
			popCont.focus();
		});
	}, 0);
	setObj(function () {
		popIdxHgt = popWrap.find(popCont).outerHeight(true);
		if (hgtSize < popIdxHgt && popBottomHgt == 0) {
			popCont.parent().css('height', 'auto');
			popWrap.stop().animate({scrollTop:0}, secVal[0]);
		}
	}, secVal[0]);

	$('.layer-popup-wrap').on('click', function (e) {
		const _this = $(this).closest('.layer-popup-wrap');
		// const tarItem = $('.layer-popup-cont > div, .layer-title,'
		//  + '.layer-cont *:not(.btn-close, .btn-del), .bottom-fixed *:not(.btn-close)');
		const tarItem = $('.layer-popup-body, .btn-close');
		if ($(e.target).is(tarItem)) {
			// if ($(this).scrollTop() !== 0) {
			// 	if (hgtSize < popIdxHgt) {
			// 		popWrap.stop().animate({scrollTop:0}, secVal[0], function () {
			// 			popClose (_this);
			// 		});
			// 	}
			// } else {
				popClose (_this);
			// }
		}
	});
}

function popClose (target) {
	target.fadeOut(secVal[3]);
	target.find(popCont).fadeOut(secVal[0]).parent().removeAttr('style');
	target.find('.tar-loop').remove();
	chkSwitch = false;
	setObj(function () {
		if (!target.hasClass('inner-pop')) {
			$('body').css({'overflow':'auto', 'width':'auto'});
			$('.hmj-header').css({'padding-right':'0'}); //팝업오픈시 스크롤바 만큼 헤더 움직임 방지
		}
		if ($('.swiper-container').length >= irNum[0]) {
			$('.swiper-wrapper').css('transform', 'translate3d(0, 0, 0)');
		}
		popCont.parent().css('height', '100%');
	}, secVal[0]);	
}

function popAutoHgt () {
	let popHeaderHgt = parseInt(popWrap.find('.layer-title').outerHeight(true));
	popBottomHgt = parseInt(popWrap.find('.bottom-fixed').outerHeight(true)) || 0;

	//하단 고정일경우 .mo-full은 필수
	if(popWrap.hasClass('mo-full')) {
		if($(window).width() > tbl) { //PC 
			if($(window).height() <= popWrap.find('.layer-popup-cont').height() + 80 && popBottomHgt !== 0) { // 팝업 내용이 window보다 크고 하단고정일때
				popWrap.addClass('fix-center');
			}
		} else { //mo
			if($(window).height() <= popWrap.find('.layer-popup-cont').height() && popBottomHgt !== 0) { // 팝업 내용이 window보다 크고 하단고정일때
				popWrap.addClass('fix-center');
			}
		}
	}

	if (popBottomHgt !== 0) { // 하단고정일때
		popWrap.find('.layer-cont').css('height', popWrap.find('.layer-popup-cont').height() - (popHeaderHgt + popBottomHgt));
		popWrap.find('.layer-cont').css('padding-bottom', '0');
	} else {
		popWrap.find('.layer-cont').css('height', popWrap.find('.layer-popup-cont').height() - popHeaderHgt); //모든 팝업 기본 높이계산
	}
}

//shop float auto height
function floatAutoHeight() {
	//mo && mo-bottom-fixed
	if($(document).width() < tbl && $('.mo-bottom-fixed').length > 0) {
		var bodyH = $(window).height() * 0.85;
		var bottomH = $('.bottom-fixed').height();
		if($('.mo-bottom-fixed .shop-option').hasClass('active')) {
			$('.mo-bottom-fixed > .scroll-area').css('height', bodyH - bottomH);
		} else {
			$('.mo-bottom-fixed > .scroll-area').css('max-height', bodyH - bottomH);
		}
	}
};


// bottom fixed
function floatOpen() {
	if ($(window).width() <= tbl) { //mo
		$('.mo-bottom-fixed').addClass('on');
		floatAutoHeight();
		$('body').css('overflow', 'hidden')
		if($('body >.dim').length === 0) {
			$('.hmj-wrap').before('<div class="dim"></div>');
		}
	}
}
function floatClose(){
	$('body').css('overflow', 'auto');
	$('.mo-bottom-fixed').removeClass('on');
	$('body > .dim').remove();
};

// shop category
function cateCenter() {
	const target = $('.cate-list li.active');
	const tabScrBox = target.closest('.sub-cate').find('.cate-list');
	const tabScrBoxItem = tabScrBox.find('li');
	let tabScrBoxHarf = tabScrBox.width() / irNum[1];
	let tabScrPos;
	let tabListWidth = 0;
	let tabTarLeft = 0;
	let tabPdValue = parseInt(tabScrBoxItem.parent().css('padding-left')) * 2;
	tabScrBoxItem.each(function () {
		tabListWidth += $(this).outerWidth();
	});
	for (let i = 0; i < target.index(); i++) tabTarLeft += tabScrBoxItem.eq(i).outerWidth();
	let tabTarPos = (tabTarLeft + target.outerWidth() / irNum[1] + tabPdValue);
	if (tabTarPos <= tabScrBoxHarf) {
		tabScrPos = 0
	} else if (tabListWidth - tabTarPos <= tabScrBoxHarf) {
		tabScrPos = tabListWidth - tabScrBox.width() + (tabPdValue * irNum[1]);
	} else {
		tabScrPos = tabTarPos - tabScrBoxHarf;
	}
	tabScrBox.stop().animate({scrollLeft: tabScrPos}, secVal[2]); 
};

// 탭고정
function tabFixed(){
	$.fn.Scrolling = function(obj, tar) {
		var _this = this;

		$(window).on('scroll resize orientationchange', function (e) {
			if ($(window).width() <= tbl) {
				var end = obj + tar;
				$(window).scrollTop() >= obj ? _this.addClass("fixed") : _this.removeClass("fixed");
				if($(window).scrollTop() >= end) _this.removeClass("fixed");
			} else {
				$(".tab-box-outer").removeClass("fixed")
			}
		});
	};
	$(".tab-box-outer").Scrolling($(".tab-box-outer").offset().top, ($(".tab-box-item").height()));

	$('.tab-box-outer li').click(function(){
		var offset = $('.tab-box-cont').offset();
		$('html').animate({scrollTop : offset.top - 160}, 400);
	});
}
//쿠기활용동의 팝업
function cookiePop() {
	let cookiePopWrap = $('.cookie-pop-wrap');

	if ($('body').find(cookiePopWrap).length == 1) {
		$('body').css('overflow', 'hidden');
	} else {
		$('body').css('overflow', 'auto');
	}		

	cookiePopWrap.find('.btn-close').on('click',function(){
		cookiePopWrap.fadeOut(secVal[4]);
		$('body').css('overflow', 'auto');
	})
}

// 휴대전화번호 체크
function telInputCheck(num){
	num.value = num.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'); // 숫자만
}

//온라인 구매가이드
function posActive() {
	let moScrPos = $('.mo-pos').offset().top;
	chkBool = false;

	if (!$('.ie11').length == 1) {
		moScrPos = moScrPos - 165;
	}

	//각 컨텐츠 top값 배열
	posArr = [];
	const posScrItem = $('.pos-scr-list .pos-scr-item');
	const posScrItemLeng = posScrItem.length;

	for (let i = 0; i < posScrItemLeng; i++) {
		let thisPos = parseInt(posScrItem.eq(i).offset().top);
		posArr.push(thisPos);
	}
		
	$('.pos-scr-box li .btn-scr-down, .pos-scr-box a').on('click', function (e) {
		e.preventDefault();
			$(this).closest('.pos-scr-box').addClass('active'); //pc구간 제어, 클릭시에만 active가 생기고 동시에 스크롤이 되면 active 사라짐
			if (!$('.pos-scr-box').length == 0) {
				const thisBtnIdx = $(this).parent().index();
				const activeBtnIdx = $(this).closest('.pos-scr-box').find('.active').index();
				const headerHgt = $('.hmj-header').height();
				const headerOuterHgt = $('.hmj-header .header-outer').height();
				const posScrItem = $('.pos-scr-item');
				let posScrVal = posScrItem.eq(thisBtnIdx).offset().top;
				if (activeBtnIdx <= thisBtnIdx) { //active된 index와 클릭한 index 비교
					if ($('html').hasClass('ie11')) {
						$('.hmj-header').addClass('header-fixed');
						setObj(function () {
							$('.hmj-header').css('top', -$('.header-cont').height());
						}, secVal[4]);
					}
					if ($(window).width() > tbl) {
						//pc 정방향
						$('html, body').stop().animate({scrollTop:posScrVal - 55}, secVal[2]);
					} else {
						if ($('.mo-pos').hasClass('active')) { //모바일에서 스크롤이 되었는지 확인
							$('html, body').stop().animate({scrollTop:posScrVal - headerHgt}, secVal[2]);
							setObj(function () {
								$('.hmj-header').addClass('header-fixed').css('top', -$('.header-cont').height());
							}, secVal[4]);
						} else {
							$('html, body').stop().animate({scrollTop:posScrVal - (headerOuterHgt + headerHgt)}, secVal[2]);
						}
					}
				} else {
					if ($('html').hasClass('ie11')) {
						$('.hmj-header').removeClass('header-fixed');
						setObj(function () {
							$('.hmj-header').css('top', '0');
						}, secVal[4]);
					}
					if ($(window).width() > tbl) {
						//pc 역방향
						$('html, body').stop().animate({scrollTop:posScrVal - headerHgt + 1}, secVal[2]);
					} else {
						$('html, body').stop().animate({scrollTop:posScrVal - (headerOuterHgt + headerHgt)}, secVal[2]);
					}
				}
			}
	});

	$(window).scroll(function () {
		const scrPos = $(this).scrollTop();
		
		//스크롤되면 .mo-pos에 .active 추가
		if (!$('.mo-pos').length == 0) {
			if (scrPos > moScrPos) {
				$('.mo-pos').addClass('active');
				chkBool = true;
			} else {
				$('.mo-pos').removeClass('active');
				chkBool = false;
			}
		}

		let posScrBox = $('.pos-scr-box'); 
		dist = 155; //간격조정
		setTimeout(function () {
			posScrBox.removeClass('active'); //pc구간 제어
		}, secVal[3]);
		posScrBox.each(function () { //mo, pc 동시 제어
			for (let i = 0; i < posScrItemLeng; i++) {
				if (scrPos >= posArr[i] - dist) { //스크롤값과 컨텐츠 top값 비교
					if (!$(this).find('li').eq(i).hasClass('active')) {
						if ($(this).closest('.pos-scr-box').hasClass('active')) { // 버튼 클릭이 되었을때 
							$(this).find('li.active').trigger('click'); // jsTab() 함수에 의해 active가 붙은 버튼을 클릭함
						} else { 
							$(this).find('li').eq(i).trigger('click'); //스크롤 하면 컨텐스와 같은 순번 버튼 클릭하여 jsTab()으로 제어
						}
					}
				}
			}
		});		
	});
}