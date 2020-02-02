//= 원본 코드
function originalCode() {
	// 변수의 초기화
	var res = "";

	// 출력 맵 데이터
	var destW = 256;
	var destH = 160;
	var resArr = [];
	var nMax = 16;
	var pile = (nMax * 0.4)|0;

	var srcWU = (destW / 20 - 1)|0;
	var srcHU = (destH / 20 - 1)|0;

	for (var n = 0; n < nMax; n ++) {
		// 원본 이미지 데이터
		var srcW = srcWU * (n + 1);
		var srcH = srcHU * (n + 1);
		var srcArr = [];
		for (var i = 0; i < srcW * srcH; i ++) {
			// 대체 랜덤
			srcArr[i] = ((i * i * 4999 + 8999 & 0xFFFF)
				/ 0x10000) % 2 * 255;
		}

		// 바이리니어 보간법의 결과 데이터
		var destArr = [];
		var scaleX = destW / (srcW - 1);
		var scaleY = destH / (srcH - 1);

		// 바이리니어 보간법
		for (var y = 0; y < destH; y ++) {
			for (var x = 0; x < destW; x ++) {
				var x0 = Math.floor(x / scaleX);
				var y0 = Math.floor(y / scaleY);

				var x1 = x / scaleX - x0;
				var y1 = y / scaleY - y0;

				var col0 = srcArr[x0 + (y0 ) * srcW];
				var col1 = srcArr[x0 + 1 + (y0 ) * srcW];
				var col2 = srcArr[x0 + (y0 + 1) * srcW];
				var col3 = srcArr[x0 + 1 + (y0 + 1) * srcW];

				destArr[x + y * destW] = Math.floor(
					  (1 - x1) * (1 - y1) * col0
					+      x1  * (1 - y1) * col1
					+ (1 - x1) *      y1  * col2
					+      x1  *      y1  * col3
				);
			}
		}

		// 겹치기 비율
		var plRes = (n + pile) / (n + pile + 1);
		var plDest = 1 / (n + pile + 1);

		// 맵의 합성
		for (var i = 0; i < destW * destH; i ++) {
			if (n == 0) {
				resArr[i] = destArr[i];
			} else {
				resArr[i] = Math.floor(
					resArr[i] * plRes + destArr[i] * plDest
				);
			}
		}
	}

	// 반환값 완성
	res = destW + "," + destH + "," + resArr .join(",");

	// 결과를 반환하고 종료
	return res;
}

