//= 최근방 이웃 보간법 코드
function codeNearestNeighbor(imgSrc, imgDst) {
	// 변수 초기화
	var res = "";

	// 원래 이미지
	var col  = imgSrc.col;
	var srcW = imgSrc.w;
	var srcH = imgSrc.h;
	var srcArr = imgSrc.arr;

	// 보간 후의 이미지
	var dstW = imgDst.w;
	var dstH = imgDst.h;
	var dstArr = imgDst.arr;

	// 최근방 이웃 보간법 처리
	for (var y = 0; y < dstH; y ++) {
		for (var x = 0; x < dstW; x ++) {
			var x0 = Math.floor(x / (dstW / srcW));
			var y0 = Math.floor(y / (dstH / srcH));

			var col0 = srcArr[x0 + y0 * srcW];

			for (var c = 0; c < col; c ++) {
				dstArr[x + y * dstW][c] = col0[c];
			}
		}
	}
}

