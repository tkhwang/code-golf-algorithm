//== 맵 생성
function mkMap(map) {
	// 랜덤 시드를 설정
	var xors = new Xors(map.seed);

	// 가로 세로 2배로 맵을 초기화
	var w = map.w;
	var h = map.h;
	var arr = map.arr;
	for (var x = 0; x < w; x ++) {
		arr[x] = [];
		for (var y = 0; y < h * 2; y ++) {
			arr[x][y] = 0;
		}
	}

	// 맵 생성
	for (var i = 0; i < map.key; i ++) {
		// 키 포인트 작성
		var rX = xors.rand() % w;
		var rY = xors.rand() % h;
		var pos = {x: rX, y: rY};

		// 맵 성장
		for (var j = 0; j < map.deep; j ++) {
			mapGrwth(pos, rX, rY);
		}
	}

	// 맵 성장
	function mapGrwth(pos, bsX, bsY) {
		var mvR = xors.rand() % 10;
		var mvX = 0, mvY = 0;

		// 키 포인트의 이동 방향
		switch (mvR) {
		// 단순히 이동
		case 0: case 1: mvX =  1; break;
		case 2: case 3: mvX = -1; break;
		case 4: case 5: mvY =  1; break;
		case 6: case 7: mvY = -1; break;

		// 중심으로 이동
		case 8: mvX = (pos.x < bsX) ? 1
					: (pos.x > bsX) ? -1 : 0; break;
		case 9: mvY = (pos.y < bsY) ? 1
					: (pos.y > bsY) ? -1 : 0; break;
		}

		// 킴 포인트의 위치를 이동
		pos.x = map.inW(pos.x + mvX);
		pos.y = map.inH(pos.y + mvY);

		// 조산 활동
		arr[pos.x][pos.y] += 1;
	}

	// 최고 고도 계산
	var altMax = 1;	// 최고 고도
	for (var x = 0; x < w; x ++) {
		for (var y = 0; y < h; y ++) {
			if (arr[x][y] > altMax) {
				altMax = arr[x][y];
			}
		}
	}

	// 높이 조정
	var sqrtAltMax = Math.sqrt(altMax);
	for (var x = 0; x < w; x ++) {
		for (var y = 0; y < h; y ++) {
			var sqrt = Math.sqrt(arr[x][y]);
			arr[x][y] = (sqrt / sqrtAltMax * map.stp)|0;
			arr[x][y] ++;
			if (arr[x][y] > map.stp) arr[x][y] = map.stp;
		}
	}
}

