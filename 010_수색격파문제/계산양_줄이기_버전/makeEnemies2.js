//== 적의 생성 (계산양 줄이기 적용하지 않은 버전)
function makeEnemies2(seed, p, xors) {
	// 처리시간과 판정횟수
	var startTime = +new Date();
	var chckCnt = 0;

	// 변수 초기화
	var xors = new Xors(seed);
	var eneArr = [];
	var eneNo = 0;
	var holeArr = [];
	var w = p.w, h = p.h;

	// 적의 시야범위의 제곱
	var gthrRng = p.gthrRng;
	var rng = Math.pow(p.gthrRng, 2);

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
			eneArr.push(pos);
		}
	}
	eneNo = eneArr.length;

	// 주위 영역을 보고 시야범위내의 적들의 평균 좌표를 계산
	var eneArrNew = [];
	for (var i = 0; i < eneNo; i ++) {
		// 변수 초기화
		var ene1 = eneArr[i];
		var e1x = ene1.x;
		var e1y = ene1.y;

		var sumX = 0;
		var sumY = 0;
		var cnt = 0;

		// 시야범위내의 적의 평균좌표 계산
		for (var j = 0; j < eneNo; j ++) {
			// 변수 초기화
			var ene2 = eneArr[j];
			var e2x = ene2.x;
			var e2y = ene2.y;

			if (e1x <= gthrRng && e2x + gthrRng >= w) e2x -= w;
			if (e1y <= gthrRng && e2y + gthrRng >= h) e2y -= h;

			if (e1x + gthrRng >= w && e2x <= gthrRng) e2x += w;
			if (e1y + gthrRng >= h && e2y <= gthrRng) e2y += h;

			var difX = e1x - e2x;
			var difY = e1y - e2y;

			chckCnt ++;	// 판정횟수 카운트
			if (difX * difX + difY * difY < rng) {
				sumX += e2x + w;
				sumY += e2y + h;
				cnt ++;
			}
		}

		// 루프부분을 고려하여 평균좌표를 저장
		eneArrNew[i] = {
			 x: (sumX / cnt + w) % w
			,y: (sumY / cnt + h) % h
			,hit: false
		};
	}
	eneArr = eneArrNew;

	// 처리시간과 판정횟수를 출력
	var endTime = +new Date();
	console.log("계산시간: " + (endTime - startTime) + " msec");
	console.log("판정횟수: " + chckCnt + "회");

	return {eneArr: eneArr, holeArr: holeArr}
}

