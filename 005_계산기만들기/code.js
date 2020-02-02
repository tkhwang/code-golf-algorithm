//= 원본 코드
function originalCode(arg) {
	// 배열을 초기화
	var res = "";

	// 처리
	var splt = arg.match(/\d+|./g);
	res = splt.length;

	// 처리 결과를 담은 배열을 돌려주고 종료
	return res;
}

