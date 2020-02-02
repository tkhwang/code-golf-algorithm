//= 원본 코드
function originalCode() {
	// 변수의 초기화
	var res = "";

	var viewW = 96;
	var viewH = 64;
	var viewBase = Math.min(viewW , viewH);
	var viewX = 0;
	var viewY = -1.35;
	var viewRate = 0.3;
	var loop = 64;

	var cellSz = viewW * viewH;
	var cellArray = new Array(viewH);
	for (var y = 0; y < viewH; y++) {
		cellArray[y] = new Array(viewW);
	}

	for (var z = 0; z < cellSz; z++) {
		var x = z % viewW;
		var y = Math.floor(z / viewW);

		var a = viewY + viewRate * ((y - viewH / 2) / viewBase) ;
		var b = viewX + viewRate * ((x - viewW / 2) / viewBase) ;

		var i = 0;
		var j = 0;

		for (var k = 0; k < loop; k++) {
			if (i * i + j * j > 4) {
				break;
			}

			var i2 = i * i - j * j + a;
			var j2 = 2 * i * j + b;
			i = i2;
			j = j2;
		}
		cellArray[y][x] = k;
	}

	for(var y = 0; y < viewH; y++ ) {
		cellArray[y] = cellArray[y].join(",");
	}
	var res = cellArray.join("\n");

	// 결과를 반환하고 종료
	return res;
}

