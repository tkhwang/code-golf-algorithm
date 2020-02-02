//== Xorshift
var Xors = function(n) {
	var x, y, z, w;

	// 시드
	this.seed = function(s) {
		x = 123456789
		if (typeof s !== "undefined") x = s; 
		y = 362436069; z = 521288629; w = 88675123;
	}

	// 랜덤
	this.rand = function() {
		var t;
		t = x ^ (x << 11);
		x = y; y = z; z = w;
		return w = (w^(w>>19))^(t^(t>>8));
	}

	// 첫회 실행
	this.seed(n);
};

