$(function() {
	//== 문제
	var ques = ["1+2+3", "1+2*3-4", "1-2/3+4", "10*-20/5+30"];

	//== 코드를 확인
	function chckCode() {
		// 초기화
		var src = $("#src").val();
		var sccs = true;
		var resArr = [];

		for (var i = 0; i < ques.length; i ++) {
			// 처리
			var q = ques[i];
			eval("var ans = " + q);
			var res = execCode(src, [q]);
			if (res != ans) sccs = false;

			resArr.push((i + 1) + "회째 " + q + " = "
				+ res + "\n      정답은「" + ans + "」결과는"
				+ (sccs ? "정답" : "오답"));
		}

		// 판정
		var judg = sccs ? "정답" : "오답";
		$("#stts").text(judg);

		// 결과를 출력
		$("#res").val(resArr.join("\n\n"));
	}

	//== 버튼의 처리를 등록
	$("#chck").click(chckCode);

	//== 처음에만 실행
	vwCode();	// 원본 코드를 표시
	chckCode();	// 코드를 확인
});

