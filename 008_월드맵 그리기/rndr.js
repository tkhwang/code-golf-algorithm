//== 컬러 설정
var colDat = [
	 {to:  56, c1: [ 40,  97, 174], c2: [ 40,  97, 174]}
	,{to: 124, c1: [ 40,  97, 174], c2: [ 99, 162, 216]}
	,{to: 140, c1: [123, 192, 102], c2: [199, 219, 122]}
	,{to: 156, c1: [199, 219, 122], c2: [204, 153,  69]}
	,{to: 188, c1: [204, 153,  69], c2: [102,  52,   1]}
	,{to: 256, c1: [102,  52,   1], c2: [102,  52,   1]}
];

//== Canvas에 출력
function rndr(s) {
	// 변수의 초기화
	s = s.toString().replace(/\r/g, "");
	var arrSrc = s.split(",");
	var w = arrSrc.shift();
	var h = arrSrc.shift();
	var cnvsArea = $("#cnvsArea").empty();
	var cntxt;
	var bsSz = 2;

	// Canvas 사용가능여부 확인
	try {
		cntxt = $('<canvas '
			+ 'width="' + w * bsSz + '" '
			+ 'height="' + h * bsSz + '">')
			.appendTo(cnvsArea)
			.get(0).getContext("2d");
	} catch(e) {
		$("#cnvsArea")
		.text("이 브라우저에서는 사용 할 수 없습니다");
		return;
	}

	// 맵에 컬러를 할당
	var arr = [];
	for (var y = 0; y < h; y ++) {
		arr[y] = [];
		for (var x = 0; x < w; x ++) {
			var col = arrSrc[x + y * w];
			var res;
			var frm = 0;
			for (var c = 0; c < colDat.length; c ++) {
				var d = colDat[c];
				if (col < d.to) break;
				frm = d.to;
			}
			arr[y][x] = sldCol(frm, d.to, col, d.c1, d.c2);
		}
	}

	// 각 셀을 설정（ImageData를 사용하여 고속화）
	var cW = w * bsSz;
	var cH = h * bsSz;
	var imgDt = cntxt.getImageData(0, 0, cW, cH);
	var dt = imgDt.data;
	for (var y = 0; y < cH; y ++) {
		for (var x = 0; x < cW; x ++) {
			var cell = arr[(y / bsSz)|0][(x / bsSz)|0];
			var p = (x + y * cW) * 4;
			dt[p + 0] = cell[0];
			dt[p + 1] = cell[1];
			dt[p + 2] = cell[2];
			dt[p + 3] = 255;
		}
	}
	cntxt.putImageData(imgDt, 0, 0);
}

//== 범위를 지정하여 그라데이션 컬러 설정
function sldCol(noStrt, noEnd, no, col0, col1) {
	var p = (no - noStrt) / (noEnd - noStrt);
	var r = (col0[0] * (1 - p) + col1[0] * p)|0;
	var g = (col0[1] * (1 - p) + col1[1] * p)|0;
	var b = (col0[2] * (1 - p) + col1[2] * p)|0;
	return [r, g, b];
}

