//== Canvas에 출력
function rndr(s) {
	// 변수의 초기화
	s = s.replace(/\r/g, "");
	var arr = s.split("\n");
	var w = 0;
	var h = arr.length;
	var cnvsArea = $("#cnvsArea").empty();
	var cntxt;
	var colBs = 64 * 1.5;
	var bsSz = 6;

	// 문자열을 화소배열로 변환
	for (var y = 0; y < h; y ++) {
		arr[y] = arr[y].split(",");
		if (arr[y].length > w) w = arr[y].length;
	}

	// Canvas사용가능 판단
	try {
		cntxt = $('<canvas '
			+ 'width="' + w * bsSz + '" '
			+ 'height="' + h * bsSz + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
	} catch(e) {
		$("#cnvsArea")
		.text("이 브라우저에서는 사용할 수 없습니다");
		return;
	}

	// 그리기
	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var cell = arr[y][x] * 1;
			cntxt.fillStyle = createGradCol(cell, colBs);
			cntxt.fillRect(x * bsSz, y * bsSz , bsSz, bsSz);
		}
	}
}

//== 그라데이션 생성
function createGradCol(no, max) {
	var hsv = ColUtl.rgbPrm2hsv(255, 0, 0);
	hsv.h = Math.floor(360 * no / max);
	var res = ColUtl.hsv2html(hsv);
	return res;
}

