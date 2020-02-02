//= 원본 코드
function originalCode(arg) {
	// 인수를 전개
	var w = arg.w;
	var h = arg.h;
	var cnt = arg.cnt;
	var rngOut = arg.rngOut;	// 포탄 투하에 의해 보이게 되는 시야범위
	var rngIn = arg.rngIn;		// 포탄의 파괴 범위
	var saveDat   = arg.saveDat;
	var hitEnemy  = arg.hitEnemy;
	var viewEnemy = arg.viewEnemy;
		// hitEnemy, viewEnemy는 배열
		// {x: num, y: num, hit: boolen}형식의 오브젝트가 저장

	// 다음 포격시에 이어받을 보존용 데이터
	if (arg.saveDat == null) {arg.saveDat = [];}

	// 수색 범위 안에서 쓰러지지 않은 적들의 평균 위치를 계산
	var arr = [];
	var sumX = 0, sumY = 0;
	for (var i = 0; i < viewEnemy.length; i ++) {
		var ene = viewEnemy[i];
		if (! ene.hit) {
			arr.push(ene);
			sumX += ene.x;
			sumY += ene.y;
		}
	}

	// 포격 위치
	var x, y;
	if (arr.length <= 80) {
		x = ((Math.random() * (w - rngIn * 2))|0) + rngIn;
		y = ((Math.random() * (h - rngIn * 2))|0) + rngIn;
	} else {
		x = arg.x;
		y = arg.y;
		var avrX = sumX / arr.length;
		var avrY = sumY / arr.length;
		var r = Math.atan2(avrY - y, avrX - x);

		// 평균이 높은 쪽으로 이동
		x += (rngIn * 2 * Math.cos(r))|0;
		y += (rngIn * 2 * Math.sin(r))|0;
	}

	// 포격 위치
	arg.x = x;
	arg.y = y;
	arg.saveDat.push({x: x, y: y});

	// 마지막으로 포격시의 내역을 출력
	if (cnt == 19) {
		for (var i = 0; i < arg.saveDat.length; i ++) {
			var dat = arg.saveDat[i];
			console.log(i + " " + dat.x + " " + dat.y);
		}
	}

	// 배열을 돌려주고 종료
	return arg;
}

