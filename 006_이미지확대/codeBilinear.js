//= 바이리니어 보간법 코드
function codeBilinear(imgSrc, imgDst) {
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

	// 스케일
	var scaleX = (dstW - 1) / (srcW - 1);
	var scaleY = (dstH - 1) / (srcH - 1);

	// 바이리니어 보간법 처리
	for (var y = 0; y < dstH; y ++) {
		for (var x = 0; x < dstW; x ++) {
			var x0 = Math.floor(x / scaleX);
			var y0 = Math.floor(y / scaleY);

			var x1 = Math.min(srcW - 1, x0 + 1);
			var y1 = Math.min(srcH - 1, y0 + 1);

			var col0 = srcArr[x0 + y0 * srcW];
			var col1 = srcArr[x1 + y0 * srcW];
			var col2 = srcArr[x0 + y1 * srcW];
			var col3 = srcArr[x1 + y1 * srcW];

			var rtX = x / scaleX - x0;
			var rtY = y / scaleY - y0;

			for (var c = 0; c < col; c ++) {
				dstArr[x + y * dstW][c] = Math.round(
					  (1 - rtX) * (1 - rtY) * col0[c]
					+      rtX  * (1 - rtY) * col1[c]
					+ (1 - rtX) *      rtY  * col2[c]
					+      rtX  *      rtY  * col3[c]
				);
			}
		}
	}
}

