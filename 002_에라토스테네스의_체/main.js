$(function() {
	//== 모범 답안
	var ans = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47
		,53,59,61,67,71,73,79,83,89,97].toString();

	//== 코드를 확인
	function chckCode() {
		// 초기화
		var src = $("#src").val();

		// 처리
		var res = execCode(src);

		// 판정
		var judg = (res == ans) ? "정답" : "오답";
		$("#stts").text(judg);

		// 결과를 출력
		$("#res").val(res);
	}

	//== 버튼의 처리를 등로
	$("#chck").click(chckCode);

	//== 처음에만 실행
	vwCode();	// 원본 코드를 표시
	chckCode();	// 작성자의 답안을 확인
});

