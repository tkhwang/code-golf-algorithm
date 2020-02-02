$(function() {
	//== 폭탄처리 (여러번)
	window.execBomb = function(argFnc) {
		for (var i = 0; i < p.bomb; i ++) {
			argGm = argFnc(argGm);
			execBombOnce(argGm);
		}
	}

	//== 폭탄처리 (1회분)
	window.execBombOnce = function(arg) {
		var x = arg.x;
		var y = arg.y;
		bombPos.push({x: arg.x, y: arg.y});

		// 변수 초기화
		var rngOut2 = p.rngOut * p.rngOut;
		var rngIn2  = p.rngIn  * p.rngIn;

		arg.hitEnemy = [];
		arg.viewEnemy = [];

		// 폭탄처리
		for (var i = 0; i < eneArr.length; i ++) {
			var ene = eneArr[i];
			var difX = x - ene.x; difX = difX * difX;
			var difY = y - ene.y; difY = difY * difY;

			if (difX + difY <= rngIn2) {
				if (! ene.hit) {
					ene.hit = true;
					arg.hitEnemy.push($.extend({}, ene));
				}
			}
			if (difX + difY <= rngOut2) {
				arg.viewEnemy.push($.extend({}, ene));
			}
		}
		arg.cnt ++;
		return arg;
	}

	//== 득점 처리
	window.getPnt = function() {
		var pnt = 0;
		for (var i = 0; i < eneArr.length; i ++) {
			if (eneArr[i].hit) pnt++;
		}
		return pnt;
	}

	//== 설정 초기화
	var eneArr  = [];
	var argGm   = {};
	var bombPos = [];
	var holeArr = [];
	var p = new P();

	//== 파라메터 출력
	function outPrmStr() {
		var tgt = $(":input[id^=_p_]");
		tgt.each(function() {
			var obj = $(this);
			var nm = obj.attr("id").replace(/^_p_/, "");
			eval("obj.val(p." + nm + " * 1)");
		});
	}

	//== 파라메터 반영
	$("#btnChngPrm").click(function() {
		var tgt = $(":input[id^=_p_]");
		tgt.each(function() {
			var obj = $(this);
			var nm = obj.attr("id").replace(/^_p_/, "");
			eval("p." + nm + " = " + obj.val() + " * 1");
		});
		chckCode();
	});

	//= 초기화와 생성

	//== 초기화
	function init(seed) {
		// 변수 초기화
		bombPos = [];

		// 적의 생성
		var codeType = $("#codeType").val();
		console.log("codeType：" + codeType);
		var res = window[codeType](seed, p);

		eneArr = res.eneArr;
		holeArr = res.holeArr;

		// 인수 초기화
		argGm.w = p.w;
		argGm.h = p.h;
		argGm.x = 0;
		argGm.y = 0;
		argGm.rngOut = p.rngOut;
		argGm.rngIn  = p.rngIn;
		argGm.cnt = 0;
		argGm.hitEnemy = [];
		argGm.viewEnemy = [];
		argGm.saveDat = null;
	}

	//= 화면표시

	//== 코드를 확인
	function chckCode() {
		// 초기화
		init($("#seed").val() * 1);

		// 취득하여 실행
		var src = $('#src').val();
		var fnc = codeToFnc(src);
		execBomb(fnc);
		var res = getPnt();

		$("#res").val(res);

		// 그리기
		rndr(p, bombPos, eneArr, holeArr);
	}

	//== "확인" 버튼
	$("#chck").click(chckCode);

	//== "시드를 1증가하여 확인" 버튼
	$("#chckPls1").click(function() {
		$("#seed").val($("#seed").val() * 1 + 1);
		chckCode();
	});

	//== "100번 확인" 버튼
	$("#chck100").click(function() {
		trySum(100);
	});

	//== "n번 확인" 버튼
	$("#chckN").click(function() {
		trySum($("#tryNo").val() * 1);
	});

	//== 여러번 실행
	function trySum(tryNo) {
		var tryCnt = 0;
		var rcrdArr = [];
		var rcrdSum = 0;
		var tmStrt = +new Date();

		(function() {
			$("#chckCodePlus1").click();
			var res = ~~$("#res").val();
			rcrdArr.push(res);
			rcrdSum += res;
			tryCnt ++;
			if (tryCnt < tryNo) {
				setTimeout(arguments.callee, 10);
				return;
			}

			var tmEnd = +new Date();
			var tmDifSec = ((tmEnd - tmStrt)/1000).toFixed(4);
			var rcrdStr = ""
				+ "Sum : " + rcrdSum + "\n"
				+ "Cnt : " + tryNo + "\n"
				+ "Avr : " + Math.floor(rcrdSum/tryNo) + "\n"
				+ "SumTime(sec) : " + tmDifSec + "\n"
				+ "--------------------\n"
			for (var i = 0; i < rcrdArr.length; i ++) {
				rcrdStr += i + " : " + rcrdArr[i] + "\n";
			}
			$("#res").val(rcrdStr);
		})();
	}

	//= 처음에만 실행
	vwCode();		// 원본 코드를 표시
	outPrmStr();	// 파라메터 출력
	chckCode();		// 작성자의 답안을 확인
});

