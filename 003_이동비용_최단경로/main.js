$(function() {
	//== 맵
	var map =
		[5,5,4,2,1,1,1,2,2,3
		,5,4,3,2,1,1,2,2,3,4
		,5,4,2,1,1,2,2,4,5,5
		,4,4,2,1,2,2,3,3,4,5
		,4,3,1,1,4,3,3,3,4,5
		,3,1,1,5,4,3,2,3,4,5
		,2,1,3,4,3,3,2,2,3,4
		,1,1,3,4,3,2,1,1,2,3
		,2,1,1,3,4,2,2,3,4,4
		,3,2,1,1,3,3,3,3,4,5];
	var mapSz = 10;
	var strt = {x: 4, y: 0};
	var goal = {x: 5, y: 9};

	//== 답
	var ans = [4, 0, 4, 1, 4, 2, 3, 2, 3, 3, 3, 4, 2, 4, 2, 5,
		1, 5, 1, 6, 1, 7, 1, 8, 2, 8, 2, 9, 3, 9, 4, 9, 5, 9];

	//== 코드를 확인
	function chckCode() {
		// 초기화
		var src = $("#src").val();

		// 처리
		var res = execCode(src, [mapSz, mapSz, map,
			strt.x, strt.y, goal.x, goal.y]);

		// 판정
		var judg = "오답";
		if (res.toString() == ans.toString()) judg = "정답";
		$("#stts").text(judg);

		drwMap(res, map, mapSz);	// 맵을 표시

		// 읽기 쉽도록 가공
		var arr = [];
		for (var i = 0; i < res.length; i += 2) {
			arr.push("x " + res[i] + ", y " + res[i + 1]);
		}

		// 결과를 출력
		$("#res").val(arr.join("\n"));
	}

	//== 버튼의 처리를 등록
	$("#chck").click(chckCode);

	//== 처음에만 실행
	vwCode();	// 원본 코드를 표시
	chckCode();	// 코드를 확인
});

