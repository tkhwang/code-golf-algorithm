//= 색 계산용 함수들
/***********************************************************
http://crocro.com/
2011-11-06
색 계산용 함수들
(C) Masakazu Yanai (C) Chronus Crown
MIT License
http://www.opensource.org/licenses/mit-license.php
http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
***********************************************************/
var ColUtl = {
	// 숫자의 범위
	numRange: function(min, i, max) {
		return Math.min(Math.max(parseInt(i), min), max);
	}

	// RGB -> HSV 변환
	,rgb2hsv: function(rgb) {
		return this.rgbPrm2hsv(rgb.r, rgb.g, rgb.b);
	}
	,rgbPrm2hsv: function(r, g, b) {
		r = this.numRange(r, 0, 255);
		g = this.numRange(g, 0, 255);
		b = this.numRange(b, 0, 255);

		var h, s, v;	// h : 0~360、s, v : 0~255
		var max = Math.max(Math.max(r, g), b);
		var min = Math.min(Math.min(r, g), b);
		var dif = max - min;

		if (max == min) {h = 0;} else
		if (max == r)	{h =  60 * (g - b) / dif  +   0;} else
		if (max == g)	{h = (60 * (b - r) / dif) + 120;} else
						{h = (60 * (r - g) / dif) + 240;}
	 	while (h < 0) {h += 360;}
		s = (max == 0) ? 0 : dif / max * 255;
		v = max;
		return {"h": h, "s": s, "v": v};
	}

	// HSV ~ RGB 변환
	,hsv2rgb: function(hsv) {
		return this.hsvPrm2rgb(hsv.h, hsv.s, hsv.v);
	}
	,hsvPrm2rgb: function(h, s, v) {
		s = this.numRange(s, 0, 255);
		v = this.numRange(v, 0, 255);

		var r, g, b;	// 0~255
		while (h < 0) h += 360;
		h = h % 360;

		if (s == 0) return {"r": v = v|0, "g": v, "b": v};
		s = s / 255;

		var i = Math.floor(h / 60) % 6,
			f = (h / 60) - i,
			p = v * (1 - s),
			q = v * (1 - f * s),
			t = v * (1 - (1 - f) * s);
		switch (i) {
		case 0: r = v;	g = t;	b = p;	break;
		case 1: r = q;	g = v;	b = p;	break;
		case 2: r = p;	g = v;	b = t;	break;
		case 3: r = p;	g = q;	b = v;	break;
		case 4: r = t;	g = p;	b = v;	break;
		case 5: r = v;	g = p;	b = q;	break;
		}
		return {"r": r|0, "g": g|0, "b": b|0};
	}

	// 숫자를 16진수의 256형식（00～ff）으로 변환
	,nTo256: function(n) {
		var s = parseInt(n).toString(16);
		return s.length == 1 ? "0" + s : s;
	}

	// rgb해쉬를 HTML형식의 색으로 변환（예：#ff0f00）
	,rgb2html: function(rgb) {
		return "#" + this.nTo256(rgb.r) + this.nTo256(rgb.g)
			+ this.nTo256(rgb.b);
	}

	// hsv해쉬를 HTML형식의 색으로 변환（예：#ff0f00）
	,hsv2html: function(hsv) {
		return this.rgb2html(this.hsv2rgb(hsv));
	}
};

