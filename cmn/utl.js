//== 원본 코드를 표시
function vwCode(code) {
	if (typeof code === "undefined") code = originalCode;
	var s = code.toString()
		.replace(/^(function )\S+?(\()/, "$1yourCode$2");
	$("#src").val(s);
}

//== 문자열의 바이트 수를 계산
function getByteLen(s) {
	// 함수부분을 제거
	s = s
		.replace(/\r/g, "")
		.replace(/^.+?{|}\n*?$/g, "")
		.replace(/^\n+|\n+$/g, "");

	// 문자열의 바이트 수를 계산
	var len = 0;
	for (var i = 0; i < s.length; i ++) {
		len += (s.charCodeAt(i) > 255) ? 2 : 1;
	}
	return len;
}

//= 코드 실행
function execCode(code, args) {
	// 코드 실행 확인
	var res = "";
	try {
		eval(code);
		if (! (args instanceof Array)) args = [];
		res = yourCode.apply(this, args);
	} catch(e) {
		alert(e);
	}
	return res;
}

//= 함수 취득
function codeToFnc(code) {
	var res = "";
	try {
		eval(code);
		res = yourCode;
	} catch(e) {
		alert(e);
	}
	return res;
}

