$(function() {
	// 원래 이미지
	var imgSrc = {};
	imgSrc.col = 3;
	imgSrc.w   = 12;
	imgSrc.h   = 12;

	var R = [255, 0, 0];
	var G = [0, 255, 0];
	var B = [0, 0, 255];
	imgSrc.arr = [
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G,
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G,
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G,
		R, G, B, R, G, B, R, G, B, R, G, B,
		G, B, R, G, B, R, G, B, R, G, B, R,
		B, R, G, B, R, G, B, R, G, B, R, G
	];

	// 확대할 이미지
	var imgDst = {};
	imgDst.col = 3;
	imgDst.w   = 600;
	imgDst.h   = 100;

	imgDst.arr = [];
	for (var i = 0; i < imgDst.w * imgDst.h; i ++) {
		imgDst.arr[i] = new Array(imgDst.col);
	}

	//== 코드를 확인
	function chckCode() {
		// 초기화
		var src = $("#src").val();

		// 처리
		execCode(src, [imgSrc, imgDst]);	// 결과를 취득

		// 결과를 출력
		rndr(imgDst);
		$("#res").val(imgDst.arr);
	}

	//== 버튼 처리를 등록
	$("#chck").click(chckCode);

	//== 선택 처리를 등록
	$("#codeType").change(function() {
		vwCode(eval($(this).val()));	// 원본 코드를 표시
	});

	//== 처음에만 실행
	vwCode(codeNearestNeighbor);	// 원본 코드를 표시
	chckCode();	// 코드를 확인
});

