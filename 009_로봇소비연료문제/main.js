$(function() {
	//== 지도 설정
	var map = {
		 w: 120	// 가로 폭
		,h: 60	// 높이
		,arr: []	// 배열
		,stp: 10	 // 이동 비용의 스텝. 1~10.
		,key: 45	// 조산운동의 키 포인트 수
		,deep: 1000	// 조산운동의 심도계소
		,seed: 0	// 랜덤 시드
		,drwSz: 5	// 그림 크기
		,strtRtX: 0.9	// 시작위치 비율X
		,strtRtY: 0.3	// 시작위치 비율Y
		,goalRtX: 0.1	// 종료위치 비율X
		,goalRtY: 0.7	// 종료위치 비율Y
		,inW: function(x) {	// 좌표범위 가로
			if (x < 0) return 0;
			if (x >= this.w) return this.w - 1;
			return x;
		}
		,inH: function(y) {	// 좌표범위 세로
			if (y < 0) return 0;
			if (y >= this.h) return this.h - 1;
			return y;
		}
	};

	//== 로봇 설정
	var Rbt = function() {
		// 시작위치와 종료위치
		this.strtX = this.nowX = (map.w * map.strtRtX)|0;
		this.strtY = this.nowY = (map.h * map.strtRtY)|0;
		this.goalX = (map.w * map.goalRtX)|0;
		this.goalY = (map.h * map.goalRtY)|0;

		this.useFuel = 0;	// 사용연료
		this.useStp = 0;	// 이동횟수
		this.hstry = [];	// 이력
		this.sccs = false;	// 도착 성공여부
		this.mvMax = 500;	// 최대 이동횟수
	};
	var rYou, rCom;

	//== 로봇 이동확인
	function chckMvRbt(rbt, fncMv) {
		// 로봇의 이동
		var mvMax = 8;	// 최대 이동횟수
		var vwR = 1;	// 시야 반경
		var vwRng = vwR * 2 + 1;	// 시야 범위 칸수
		var w = map.w, h = map.h;

		rbtMvLoop:
		for (var i = 0; i < rbt.mvMax; i ++) {
			// 주변 맵의 초기화
			var arnd = [vwRng];
			for (var x = 0; x < vwRng; x ++) {
				arnd[x] = [];
				for (var y = 0; y < vwRng; y ++) {
					var x2 = rbt.nowX + x - vwR;
					var y2 = rbt.nowY + y - vwR;
					if (x2 >= 0 && x2 < w
					 && y2 >= 0 && y2 < h) {
						arnd[x][y]
							= Math.pow(map.arr[x2][y2], 2);
					} else {
						arnd[x][y] = 99999;
					}
				}
			}

			// 이동의 호출
			var mvArr = fncMv(arnd, rbt.nowX, rbt.nowY
				,rbt.goalX, rbt.goalY, w, h);

			// 이동 가능횟수 이내인지 확인
			if (mvArr.length > mvMax) continue;

			// 이동 컨트롤러를 사용한 이동
			var mvLen = mvArr.length;
			for (var m = 0; m < mvLen; m ++) {
				// 이동의 초기화
				var mvX = 0;
				var mvY = 0;
				var mv = mvArr[m];
				if (mv == "u") {mvY = -1;} else
				if (mv == "d") {mvY =  1;} else
				if (mv == "l") {mvX = -1;} else
				if (mv == "r") {mvX =  1;}

				// 이동후의 위치를 계산
				rbt.nowX = map.inW(rbt.nowX += mvX);
				rbt.nowY = map.inH(rbt.nowY += mvY);
				rbt.hstry.push({x: rbt.nowX, y: rbt.nowY});

				// 소비연료와 스텝의 계산
				rbt.useFuel += Math.pow(
					map.arr[rbt.nowX][rbt.nowY], 2);
				rbt.useStp ++;

				// 종료 판정
				if (rbt.nowX == rbt.goalX
				 && rbt.nowY == rbt.goalY) {
					rbt.sccs = true;
					break rbtMvLoop;
				}
			}
		}
	}

	//== 스테이터스(상태) 작성
	function mkStts(sccsY, sccsC, fuelY, fuelC, stpY, stpC) {
		var res = ["비김"];
		if (sccsY && fuelY < fuelC) {
			res[0] = "당신의 승리!";
		}
		if (! sccsY || fuelY > fuelC) {
			res[0] = "당신의 패배...OTL";
		}
		res.push("도착 성공 여부: You " + sccsY + " / COM " + sccsC);
		res.push("소비 연료: You " + fuelY + " / COM " + fuelC);
		res.push("이동 횟수: You " + stpY + " / COM " + stpC);
		return res.join("\n");
	}

	//== 스테이터스 표시
	function drwStts(rYou, rCom) {
		var res = mkStts(rYou.sccs, rCom.sccs, rYou.useFuel
			,rCom.useFuel, rYou.useStp, rCom.useStp);
		$("#res").val(res);
	}

	//== 원본 코드
	var srcCom = null;

	//== 코드를 확인
	function chckCode() {
		// 초기화
		map.seed = $("#seed").val() * 1;
		mkMap(map);	// 지도 생성
		$("#res").val("");	// 출력을 클리어

		// 함수 초기화
		var srcYou = $("#src").val();
		if (srcCom == null) srcCom = srcYou;
		var fncYou = codeToFnc(srcYou);
		var fncCom = codeToFnc(srcCom);

		// 로봇 초기화
		rYou = new Rbt();
		rCom = new Rbt();

		// 로봇 이동 확인
		chckMvRbt(rYou, fncYou);
		chckMvRbt(rCom, fncCom);

		// 지도 그리기
		drwMap(map);

		// 로봇 그리기
		drwRbt(rYou, "#ff0000", map);
		drwRbt(rCom, "#0000ff", map);
		drwStts(rYou, rCom);
	}

	//== 버튼의 처리를 등록

	//== "확인" 버튼
	$("#chck").click(chckCode);

	//== "시드를 1증가하고 확인" 버튼
	$("#chckPls1").click(function() {
		$("#seed").val($("#seed").val() * 1 + 1);
		chckCode();
	});

	//== "100회 확인" 버튼
	$("#chck100").click(function() {
		tryLoop(100);
	});

	//== "n번 확인" 버튼
	$("#chckN").click(function() {
		tryLoop($("#tryNo").val() * 1);
	});

	//== 여러번 시행
	function tryLoop(tryNo) {
		var tryCnt = 0;
		var rcrdArr = [];
		var sccsY = true, fuelY = 0, stpY = 0;
		var sccsC = true, fuelC = 0, stpC = 0;

		(function() {
			$("#chckPls1").click();
			rcrdArr.push($("#res").val());
			if (! rYou.sccs) sccsY = false;
			if (! rCom.sccs) sccsC = false;
			fuelY += rYou.useFuel;
			fuelC += rCom.useFuel;
			stpY += rYou.useStp;
			stpC += rCom.useStp;

			tryCnt ++;
			if (tryCnt < tryNo) {
				setTimeout(arguments.callee, 10);
				return;
			}

			var avrgFuelY = (fuelY / tryNo)|0;
			var avrgFuelC = (fuelC / tryNo)|0;
			var avrgStpY = (stpY / tryNo)|0;
			var avrgStpC = (stpC / tryNo)|0;
			var rcrdStr = ""
				+ "평균\n"
				+ mkStts(sccsY, sccsC, avrgFuelY
					,avrgFuelC, avrgStpY, avrgStpC)
				+ "\n--------------------\n\n"
			for (var i = 0; i < rcrdArr.length; i ++) {
				rcrdStr += (i + 1) + "번째\n"
					+ rcrdArr[i] + "\n\n";
			}
			$("#res").val(rcrdStr);
		})();
	}

	//== 처음에만 실행
	vwCode();	// 원본 코드를 표시
	chckCode();	// 작성자의 답안을 확인
});

