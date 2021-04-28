// GNB
function fn_gnb(){
	var btnMenu = $(".btnMenu"),
		gnb = $("#gnb"),
		btnClose = gnb.find(".btnClose");

	$("#wrap").append("<p class='dim'></p>");
	
	btnMenu.click(function(e){
		e.preventDefault();
		gnb.addClass("on");
		$(".dim").fadeIn();
	});

	btnClose.click(function(e){
		e.preventDefault();
		gnb.removeClass("on");
		$(".dim").fadeOut();
	});
}

// POPUP
function fn_layer(e,s){
	var $element = $("."+e);
	var $eInner = $element.find("> .inner");

	$element.fadeIn();
	$eInner.css({width:s});
	$("body, html").css({"overflow":"hidden"});

	$(".closeLayer").click(function(e){
		e.preventDefault();
		$(this).closest(".layer, .layerSwiper").fadeOut();
		$("body, html").css({"overflow":"auto"});
	});

	if($element.find(".btnBottom").length){
		$(".fullPop .popCont").css({"padding-bottom":$(".btnBottom").outerHeight()+20});
	}

	if($(".layerSwiper").css("display") == "block"){
		var swiper = new Swiper('.layerSwiper .swiper', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination'
			},
			spaceBetween: 30,
		});
	}
}

// 파일첨부 삭제
function fn_file_del(obj){
	$(obj).closest(".file").remove();
}

// 공지사항 파일첨부
function fn_file(obj){
	var fileVal = $(obj).val();
	$(".fileWrap").append("<p class='file'><span>"+ fileVal +"</span> <a href='javascript:void(0);' onclick='fn_file_del(this);' class='btnDel'>삭제</a></p>")
}

// 리스트 삭제 공통
function fn_list_del(obj){
	$(obj).closest("li").remove();
}

// 리스트 추가
function fn_add_list(obj){
	$(".addList").append('<li><input type="text" title="요청할 자료 명 입력" placeholder="요청한 자료 명 입력1(예:통장사본)"><a href="javascript:void(0)" class="btnDel" onclick="fn_list_del(this)">삭제</a></li>');
}


// 그래프
function graph(){
	var graph = $(".graph");
	var weekHour = graph.find("strong").text().replace(/[^0-9]/g, ''); // 주당 근로시간 값
	var text = graph.find("em").text().replace(/[^0-9]/g, ''); // 근무시간 값
	var value = text*(100/weekHour);//1.923076923076923; // 근무시간 값을 100%로 환산
	graph.find("em").css({left:value+"%"}); // 근무시간 위치 이동
	graph.find("p").css({width:value+"%"}); // 그래프 width % 체크
	graph.find("p").text(Math.round(value) + '%');
}

$(window).load(function(){
	/*
	// 메인
	graph(); // 첫 로딩시

	setInterval(function(){
		graph();
	}, 3000); // 1초마다 시간 체크
	*/
})

$(function(){
	/* >>>>>>>>>> 공통 <<<<<<<<<<  */

	// GMB
	fn_gnb();

	// 하단 버튼 영역
	if($(".btnBottom").not(".noFix").length){
		$("#container").css({"padding-bottom":$(".btnBottom").outerHeight()+20});
	}

	// 탑 메뉴 열기
	var btnMenu = $(".btnMenu"),
		utilPop = $(".utilPop");

	btnMenu.click(function(e){
		e.preventDefault();
		utilPop.fadeIn(200);
		utilPop.find(".btnClose").click(function(e){
			e.preventDefault();
			utilPop.fadeOut(200);
		});
	});

	// 탑 메뉴 열기

	//컨텍스트 메뉴
	$(".btn-context-menu").click(function(e){
		e.preventDefault();

		$('.context-menu').fadeOut(200);	//다른 창을 먼저 닫는다.

		var contextMenu = $('.context-menu', $(e.target).parent());
		contextMenu.fadeIn(200);
		contextMenu.find(".btnClose").click(function(e){
			e.preventDefault();
			$(e.target).parent().fadeOut(200);
		});
	});

	$('#floatMenu').click(function(e){
		var isShow = $('#floatMenu .float-menu').hasClass('show');
		if(isShow){
			$('#floatMenu .float-menu').removeClass('show');
			$('#floatMenu .float-menu').addClass('hide');
		}else{
			$('#floatMenu .float-menu').removeClass('hide');
			$('#floatMenu .float-menu').addClass('show');
		}
	});

	// 탭
	var tabWrap = $(".tabWrap");
	tabWrap.each(function(){
		var btnTab = $(this).find("> ul > li"),
			btnTabL = btnTab.length,
			btnTabCurr = $(this).find("> ul > li.curr").index(),
			tabBox = $(this).find("> .tabBoxWrap > div");
		
		btnTab.css({width:100/btnTabL+"%"});
		tabBox.not(":eq("+btnTabCurr+")").hide();
		btnTab.find("a").click(function(e){
			e.preventDefault();
			var i = $(this).parent().index();
			btnTab.removeClass("curr");
			$(this).parent().addClass("curr");
			tabBox.hide();
			tabBox.eq(i).show();
		});
	});

	// 서브탭
	var subTabWrap = $(".subTabWrap");
	subTabWrap.each(function(){
		var subBtnTab = $(this).find("> ul > li"),
			subBtnTabL = subBtnTab.length,
			subBtnTabCurr = $(this).find("> ul > li.curr").index(),
			subTabBox = $(this).find("> .subTabBox > div");
		
		subBtnTab.css({width:100/subBtnTabL+"%"});
		subTabBox.not(":eq("+subBtnTabCurr+")").hide();
		subBtnTab.find("a").click(function(e){
			e.preventDefault();
			var i = $(this).parent().index();
			subBtnTab.removeClass("curr");
			$(this).parent().addClass("curr");
			subTabBox.hide();
			subTabBox.eq(i).show();
		});

		console.log(subBtnTabCurr)
	});

	// 하단 버튼
	$(".fixedArea > a.btnMore").click(function(e){
		e.preventDefault();
		$(this).toggleClass("on");
	})

	// 하단 퀵메뉴
	if($("#FixedBtn").length){
		$("#wrap").css({"margin-bottom":"70px"});
	}

	// 풀사이즈
	$(window).resize(function(){
		$(".fullScreen").css({"min-height":$(window).height() - $("#subHeader").height() - $("#container").css("padding-bottom").replace("px","")});
	}).resize();

	/* >>>>>>>>>> 페이지 <<<<<<<<<<  */

	// 이용안내 리스트
	var accList = $(".accList");
	accList.find("a").click(function(e){
		e.preventDefault();
		if($(this).hasClass("on")){
			accList.find("a").removeClass("on");
			accList.find("a").siblings("div").slideUp();
		}else{
			accList.find("a").removeClass("on");
			accList.find("a").siblings("div").slideUp();
			$(this).addClass("on");
			$(this).siblings("div").slideDown();
		}
	});

	// 알림센터 리스트
	var noticeArea = $(".noticeArea");
	noticeArea.find("a").click(function(e){
		e.preventDefault();
		$(this).closest("li").remove();
	});

	// 지도영역
	$(window).resize(function(){
		$(".mapArea").height($(".mapArea").width());
	}).resize();

	/* >>>>>>>>>> 관리자 페이지 <<<<<<<<<<  */

	// 위치저장 리스트 팝업
	var accordion = $(".mapList, .workList02");
	accordion.find("dl").eq(0).find("dt").addClass("on").siblings("dd").show();
	accordion.find("dl dt a").click(function(e){
		e.preventDefault();
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
			$(this).parent().next().slideUp(200);
		}else{
			accordion.find("dl dt").removeClass("on");
			accordion.find("dl dd").slideUp(200);
			$(this).parent().addClass("on");
			$(this).parent().next().slideDown(200);
		}

		if(accordion.find("dl dt").hasClass("on") == false){
			$(".btnAll").removeClass("on").text("전체 펼침");
		}else{
			$(".btnAll").addClass("on").text("전체 닫기");
		}
	});

	$(".btnAll").click(function(e){
		e.preventDefault();
		if($(this).hasClass("on")){
			$(this).removeClass("on").text("전체 펼침");
			accordion.find("dl dt").removeClass("on");
			accordion.find("dl dd").slideUp(200);
		}else{
			$(this).addClass("on").text("전체 닫기");
			accordion.find("dl dt").addClass("on");
			accordion.find("dl dd").slideDown(200);
		}
	});
	$(window).scroll(function(){
		$(".fixTh").each(function(){
			var $this = $(this);
			$this.css({top:$this.parent().offset().top - $(window).scrollTop()});
		});
	});

	// 근로계약관리
	if($(".btnSwiper").css("display") == "block"){
		var btnSwiper = new Swiper('.btnSwiper', {
			effect: 'fade',
			spaceBetween: 30,
		});
	}
	if($(".contSwiper").css("display") == "block"){
		var contSwiper = new Swiper('.contSwiper', {
			autoHeight: true,
			pagination: {
				el: '.swiper-pagination'
			},
			spaceBetween: 30,
			thumbs: {
				swiper: btnSwiper,
			},
		});
	}

	// 계약 직원 등록 - 전체선택
	var btnAllCheck = $(".btnAllCheck"),
		oneCheck = $(".listTable input[type=checkbox]");
	btnAllCheck.click(function(e){
		e.preventDefault();
		if($(this).hasClass("on")){
			$(this).removeClass("on").text("전체선택");
			oneCheck.prop("checked",false);
		}else{
			$(this).addClass("on").text("전체해제");
			oneCheck.prop("checked",true);
		}
	});

	oneCheck.click(function(){
		if($(".listTable input:checked").length == oneCheck.length){
			btnAllCheck.addClass("on").text("전체해제");
		}else{
			btnAllCheck.removeClass("on").text("전체선택");
		}
	});

	// 직원 관리 select 색상 변경
	if($(".userInfo select").val() == "a"){
		$(".userInfo select").removeClass("off");
	}else{
		$(".userInfo select").addClass("off");
	}
	$(".userInfo select").change(function(){
		if($(this).val() == "a"){
			$(this).removeClass("off");
		}else{
			$(this).addClass("off");
		}
	})


	if($('#TopSubBtnGroup')){
		$('#TopSubBtnGroup ul li').width('100');
		$('#TopSubBtnGroup ul').width($('#TopSubBtnGroup ul li').length * 150);
	}

})