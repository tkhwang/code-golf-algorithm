//= 원본 코드
function originalCode() {
	// 변수의 초기화
	var res = "";
	var w = 80;
	var h = 40;
	var sz = 30;

	// 처리부
	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var dstnc = Math.sqrt(
				  Math.pow(w / 2 - x, 2)
				+ Math.pow((h / 2 - y) * 2, 2)
			);
			if (dstnc < sz) {
				res += "*";
			} else {
				res += "-";
			}
		}
		res += "\n"
	}

	// 결과를 리턴하고 종료
	return res;
}

