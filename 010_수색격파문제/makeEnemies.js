//== 적의 생성
function makeEnemies(seed, p, xors) {
	// 변수 초기화
	var xors = new Xors(seed);
	var eneArr = [];
	var eneNo = 0;
	var holeArr = [];
	var w = p.w, h = p.h;

	// 적이 서로 모이는 시야범위의 제곱
	var rng = Math.pow(p.gthrRng, 2);

	// 계산양을 줄이기 위한 맵 분할용 변수의 초기화
	var sqSz = 20;	// 맵 분할 픽셀 수
	var sqWIn = Math.ceil(w / sqSz);
	var sqHIn = Math.ceil(h / sqSz);
	var sqW = sqWIn + 2;	// 맵 분할수
	var sqH = sqHIn + 2;	// 맵 분할수
		// 맵 분할수 + 2 를 하는 것은
		// 맵 분할 루프처리를 위해서
	var sqLen = sqW * sqH;
	var sqArr = [];
	for (var i = 0; i < sqLen; i ++) {sqArr[i] = [];}

	// 적 소굴 초기화
	for (var i = 0; i < p.hole; i ++) {
		var hole = {
			 x: xors.rand() % w
			,y: xors.rand() % h
		};
		holeArr.push(hole);

		// 적의 초기화
		for (var j = 0; j < p.holeEne; j ++) {
			// 위치 초기화
			var pos = {x: hole.x, y: hole.y};

			// 이동
			var mv = xors.rand() % p.mvMax + 1;
			var dir = xors.rand() % 2;
			for (var m = 0; m < mv; m ++) {
				pos.x += xors.rand() % p.mvX * 2 - p.mvX;
				pos.y += xors.rand() % p.mvY * 2 - p.mvY;
			}

			// 좌표 저장
			pos.x = (pos.x + w * p.mvMax) % w;
			pos.y = (pos.y + h * p.mvMax) % h;
			pos.sqX = (pos.x / sqSz)|0;
			pos.sqY = (pos.y / sqSz)|0;
			eneArr.push(pos);
		}
	}
	eneNo = eneArr.length;

	// 적을 분할한 맵에 배치
	for (var i = 0; i < eneNo; i ++) {
		var ene = eneArr[i];
		var pos = (ene.sqX + 1) + (ene.sqY + 1) * sqW;
		sqArr[pos].push(ene);
	}

	// 맵 분할 루프처리
	for (var y = 0; y < sqH; y ++) {
		for (var x = 0; x < sqW; x ++) {
			// 루프 위치가 아니라면 건너뜀
			if (0 != x && sqW - 1 != x
			 && 0 != y && sqH - 1 != y) continue;

			// 루프 부분의 위치를 깊은 복사(deep copy)
			var pNow = x + y * sqW;
			var xRef = 1 + (x - 1 + sqWIn * 2) % sqWIn;
			var yRef = 1 + (y - 1 + sqHIn * 2) % sqHIn;
			var pRef = xRef + yRef * sqW;
			sqArr[pNow] = $.extend(true, [], sqArr[pRef]);

			// 루프에 해당하는 부분의 좌표를 수정
			for (var i = 0; i < sqArr[pNow].length; i ++) {
				if (x == 0) {
					sqArr[pNow][i].x -= w;
				} else
				if (x == sqW - 1) {
					sqArr[pNow][i].x += w;
				}
				if (y == 0) {
					sqArr[pNow][i].y -= h;
				} else
				if (y == sqH - 1) {
					sqArr[pNow][i].y += h;
				}
			}
		}
	}

	// 주위의 분할 구역을 보고 시야범위내의 평균치를 계산
	var eneArrNew = [];
	for (var i = 0; i < eneNo; i ++) {
		// 근방 1의 구역을 탐색범위로
		var ene = eneArr[i];
		var arr = [];
		for (var y = -1; y <= 1; y ++) {
			for (var x = -1; x <= 1; x ++) {
				var pos = (ene.sqX + 1 + x)
						+ (ene.sqY + 1 + y) * sqW;
				arr = arr.concat(sqArr[pos]);
			}
		}

		// 변수의 초기화
		var arrSz = arr.length;
		var sumX = 0;
		var sumY = 0;
		var cnt = 0;

		// 시야범위내의 적의 평균치를 계산
		for (var j = 0; j < arrSz; j ++) {
			var difX = arr[j].x - ene.x;
			var difY = arr[j].y - ene.y;

			if (difX * difX + difY * difY < rng) {
				sumX += arr[j].x;
				sumY += arr[j].y;
				cnt ++;
			}
		}

		// 루프 부분도 고려하여 좌표를 저장
		eneArrNew[i] = {
			 x: (sumX / cnt + w) % w
			,y: (sumY / cnt + h) % h
			,hit: false
		};
	}
	eneArr = eneArrNew;

	return {eneArr: eneArr, holeArr: holeArr}
}

