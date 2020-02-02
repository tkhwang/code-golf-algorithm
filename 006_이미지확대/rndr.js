//== 캔버스에 출력
function rndr(img) {
	// 변수 초기화
	var arr = img.arr;
	var w = img.w;
	var h = img.h;
	var cnvsArea = $("#cnvsArea").empty();
	var cntxt;

	// Canvas 사용가능 여부 판정
	try {
		cntxt = $('<canvas '
			+ 'width="' + w + '" height="' + h + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
	} catch(e) {
		cnvsArea.text("이 브라우저에서는 이용할 수 없습니다.");
		return;
	}

	// 그리기
	var imgDt = cntxt.getImageData(0, 0, w, h);
	var dat = imgDt.data;
	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var p = arr[x + y * w];
			var pos = (x + y * w) * 4;
			dat[pos + 0] = p[0];
			dat[pos + 1] = p[1];
			dat[pos + 2] = p[2];
			dat[pos + 3] = 255;
		}
	}
	cntxt.putImageData(imgDt, 0, 0);

	// 디버그용: 출력 사이즈가 작을 때 확대표시
	//cnvsArea.children("canvas").width(240).height(240);
}

