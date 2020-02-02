//= 원본 코드
function originalCode(arnd, nowX, nowY, goalX, goalY, mapW, mapH) {
	// 변수 초기화
	var res = ["u"];
	var drcX = goalX - nowX;
	var drcY = goalY - nowY;
	var dstnc = Math.abs(drcX) + Math.abs(drcY);

	if (dstnc < 5) {
		// 골이 가까우면 아무것도 생각하지 말고 골로 향함
		if (drcX < 0) {res = ["l"];} else
		if (drcX > 0) {res = ["r"];} else
		if (drcY < 0) {res = ["u"];} else
		if (drcY > 0) {res = ["d"];}
	} else
	if (drcX == 0) {
		// X위치가 골의 X위치와 같으므로 세로로 이동
		if (drcY < 0) {res = ["u"];} else
		if (drcY > 0) {res = ["d"];}
	} else
	if (drcY == 0) {
		// Y위치가 골의 Y위치와 같으므로 가로로 이동
		if (drcX < 0) {res = ["l"];} else
		if (drcX > 0) {res = ["r"];}
	} else {
		// 골에서 멀 경우
		var frstMv;
		if (Math.abs(drcX) > Math.abs(drcY)) {
			// 가로 방향의 거리가 멀 경우에는 가로 이동을 우선
			if (drcX < 0) {frstMv = "l";} else
			if (drcX > 0) {frstMv = "r";} else
			if (drcY < 0) {frstMv = "u";} else
			if (drcY > 0) {frstMv = "d";}
		} else {
			// 세로 방향의 거리가 멀 경우에는 세로 이동을 우선
			if (drcY < 0) {frstMv = "u";} else
			if (drcY > 0) {frstMv = "d";} else
			if (drcX < 0) {frstMv = "l";} else
			if (drcX > 0) {frstMv = "r";}
		}
		res = [frstMv];

		// 직진보다 대각선으로 돌아갈 경우가 비용이
		// 적게 들 것 같은 경우에는 대각선으로 이동.
		// 단, 골에서 멀어지는 경로는 제외함.
		// 
		// 예）이동 비용은 아래와 같음.
		// 
		//  1    1   4
		// 25  현재  4
		//  4    4   4
		// 
		// 골이 좌상방향에 있을 경우, "좌"로 이동하는 대신에
		// "상, 좌"로 이동함.

		// 대각선으로 이동하는 것이 비용이 적게 드는 지 검토
		var rt = 1.3;	// 비용 비율
		var a = arnd;	// 읽기 쉽도록 짧은 문자로 대체
		if (frstMv == "l") {
			if (a[0][1] * rt > a[1][0] + a[0][0] && drcY <= 0) {
				res = ["u", "l"];
			} else
			if (a[0][1] * rt > a[1][2] + a[0][2] && drcY >= 0) {
				res = ["d", "l"];
			}
		} else
		if (frstMv == "r") {
			if (a[2][1] * rt > a[1][0] + a[2][0] && drcY <= 0) {
				res = ["u", "r"];
			} else
			if (a[2][1] * rt > a[1][2] + a[2][2] && drcY >= 0) {
				res = ["d", "r"];
			}
		} else
		if (frstMv == "u") {
			if (a[1][0] * rt > a[0][1] + a[0][0] && drcX <= 0) {
				res = ["l", "u"];
			} else
			if (a[1][0] * rt > a[2][1] + a[2][0] && drcX >= 0) {
				res = ["r", "u"];
			}
		} else
		if (frstMv == "d") {
			if (a[1][2] * rt > a[0][1] + a[0][2] && drcX <= 0) {
				res = ["l", "d"];
			} else
			if (a[1][2] * rt > a[2][1] + a[2][2] && drcX >= 0) {
				res = ["r", "d"];
			}
		}
	}

	// 결과를 되돌려 주며 종료
	return res;
}

