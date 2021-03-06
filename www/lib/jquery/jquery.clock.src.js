!function(a) {
    var b = function(a, b) {
        this._clientWidth = a.clientWidth,
        this._clientHeight = a.clientHeight,
        this._container = a,
        this._x = this._y = 1,
        this._mrX = this._mrY = this._mrRadian = this._radian = 0,
        this._container = a,
        this.time = b.time || "",
        this.changeDOM = b.changeDOM || function() {}
        ,
        this.bt = b.bt || "0:00-10:00",
        this.lt = b.lt || "10:00-16:00",
        this.dt = b.dt || "16:00-0:00",
        this.eatTime = b.eatTime || "bt",
        this.isRoot= b.isRoot,
        this._init()
        
    }
    ;
    b.prototype = {
        constructor: b,
        _init: function() {
            this._initCvs(0, 30,'rgb(92, 158, 214)'),
            this.touchEvents.initTouchEvents(this),
            this._initEvent()
        },
        _initEvent: function() {
            var b = this;
	          if(!b.isRoot){
	        	  return;
	          }
            a(this._container).bind(this.touchEvents.touchstart, function(c) {
                b.start(c),
                a(b._container).bind(b.touchEvents.touchmove, function(a) {
                    b.move(a)
                }),
                a(b._container).bind(b.touchEvents.touchend, function(a) {
                    b.stop(a)
                }),
                a(window).bind("blur", function(a) {
                    b.stop(a)
                })
            }),
            a(this._container).bind("click", function(a) {
                b.start(a),
                b.move(a)
            })
        },
        _initCvs: function(b, c, f) {
            a(this._container).css({
                position: "absolute",
                left: "50%",
                "margin-left": "-99px",
                "margin-top": "1px"
            });
            
            this._drawCvs(b,c,f)
        },
        _drawCvs:function (b,c,f){
        	var d = document.getElementById(a(this._container).attr("id")).getContext("2d")
              , e = Math.PI / 180;
            d.sector(107, 107, 107, b * e, c * e,f).fill();
            
            d.beginPath();
            d.arc(195,155,10,0,2*Math.PI,true);
            d.fillStyle = 'rgb(255, 255, 255)';
            d.fill();  
            
            d.beginPath();
            d.arc(195,155,5,0,2*Math.PI,true);
            d.fillStyle = f;
            d.fill();  
            
            d.beginPath();
            d.arc(205,105,10,0,2*Math.PI,true);
            d.fillStyle = 'rgb(255, 255, 255)';
            d.fill();  
            
            d.beginPath();
            d.arc(205,105,5,0,2*Math.PI,true);
            d.fillStyle = f;
            d.fill(); 
        },
        _clean: function() {
            var a = document.getElementById("cvs")
              , b = a.getContext("2d");
            b.clearRect(0, 0, a.width, a.height),
            b.beginPath()
        },
        changeColor:function(color){
        	this._clean();
        	this._drawCvs(0, 30,color);
        },
        start: function(a) {
            var b = this._clientRect(this._container);
            this._mrX = b.left + this._clientWidth / 2,
            this._mrY = b.top + this._clientHeight / 2,
            this._mrRadian = Math.atan2(this._getClientY(a) - this._mrY, this._getClientX(a) - this._mrX) - this._radian,
            a.preventDefault()
        },
        setEatTime: function(a) {
            this.eatTime = a
        },
        getTime: function() {
            return this.time
        },
        setTime: function(b) {
            "12:00-1:00" == b ? (m11 = -.021943,
            m21 = -.999759,
            m12 = .999759,
            m22 = -.021943) : "12:30-1:30" == b ? (m11 = .26172,
            m21 = -.965144,
            m12 = .965144,
            m22 = .26172) : "1:00-2:00" == b ? (m11 = .477092,
            m21 = -.878853,
            m12 = .878853,
            m22 = .477092) : "1:30-2:30" == b ? (m11 = .703144,
            m21 = -.711048,
            m12 = .711048,
            m22 = .703144) : "2:00-3:00" == b ? (m11 = .871711,
            m21 = -.49002,
            m12 = .49002,
            m22 = .871711) : "2:30-3:30" == b ? (m11 = .96509,
            m21 = -.261918,
            m12 = .261918,
            m22 = .96509) : "3:00-4:00" == b ? (m11 = .999999,
            m21 = -.00163947,
            m12 = .00163947,
            m22 = .999999) : "3:30-4:30" == b ? (m11 = .965614,
            m21 = .25998,
            m12 = -.25998,
            m22 = .965614) : "4:00-5:00" == b ? (m11 = .856411,
            m21 = .516295,
            m12 = -.516295,
            m22 = .856411) : "4:30-5:30" == b ? (m11 = .709508,
            m21 = .704698,
            m12 = -.704698,
            m22 = .709508) : "5:00-6:00" == b ? (m11 = .493824,
            m21 = .869562,
            m12 = -.869562,
            m22 = .493824) : "5:30-6:30" == b ? (m11 = .256609,
            m21 = .966515,
            m12 = -.966515,
            m22 = .256609) : "6:00-7:00" == b ? (m11 = -.00295164,
            m21 = .999996,
            m12 = -.999996,
            m22 = -.00295164) : "6:30-7:30" == b ? (m11 = -.280097,
            m21 = .959972,
            m12 = -.959972,
            m22 = -.280097) : "7:00-8:00" == b ? (m11 = -.491215,
            m21 = .871038,
            m12 = -.871038,
            m22 = -.491215) : "7:30-8:30" == b ? (m11 = -.714524,
            m21 = .699611,
            m12 = -.699611,
            m22 = -.714524) : "8:00-9:00" == b ? (m11 = -.872336,
            m21 = .488907,
            m12 = -.488907,
            m22 = -.872336) : "8:30-9:30" == b ? (m11 = -.96647,
            m21 = .256778,
            m12 = -.256778,
            m22 = -.96647) : "9:00-10:00" == b ? (m11 = -.999537,
            m21 = .0304407,
            m12 = -.0304407,
            m22 = -.999537) : "9:30-10:30" == b ? (m11 = -.968745,
            m21 = -.24806,
            m12 = .24806,
            m22 = -.968745) : "10:00-11:00" == b ? (m11 = -.878092,
            m21 = -.478492,
            m12 = .478492,
            m22 = -.878092) : "10:30-11:30" == b ? (m11 = -.721657,
            m21 = -.69225,
            m12 = .69225,
            m22 = -.721657) : "11:00-12:00" == b ? (m11 = -.515643,
            m21 = -.856803,
            m12 = .856803,
            m22 = -.515643) : "11:30-12:30" == b ? (m11 = -.252352,
            m21 = -.967635,
            m12 = .967635,
            m22 = -.252352) : "24:00-1:00" == b || "0:00-1:00" == b || "12:00-13:00" == b ? (m11 = -.021943,
            m21 = -.999759,
            m12 = .999759,
            m22 = -.021943) : "24:30-1:30" == b || "0:30-1:30" == b || "12:30-13:30" == b ? (m11 = .26172,
            m21 = -.965144,
            m12 = .965144,
            m22 = .26172) : "13:00-14:00" == b ? (m11 = .477092,
            m21 = -.878853,
            m12 = .878853,
            m22 = .477092) : "13:30-14:30" == b ? (m11 = .703144,
            m21 = -.711048,
            m12 = .711048,
            m22 = .703144) : "14:00-15:00" == b ? (m11 = .871711,
            m21 = -.49002,
            m12 = .49002,
            m22 = .871711) : "14:30-15:30" == b ? (m11 = .96509,
            m21 = -.261918,
            m12 = .261918,
            m22 = .96509) : "15:00-16:00" == b ? (m11 = .999999,
            m21 = -.00163947,
            m12 = .00163947,
            m22 = .999999) : "15:30-16:30" == b ? (m11 = .965614,
            m21 = .25998,
            m12 = -.25998,
            m22 = .965614) : "16:00-17:00" == b ? (m11 = .856411,
            m21 = .516295,
            m12 = -.516295,
            m22 = .856411) : "16:30-17:30" == b ? (m11 = .709508,
            m21 = .704698,
            m12 = -.704698,
            m22 = .709508) : "17:00-18:00" == b ? (m11 = .493824,
            m21 = .869562,
            m12 = -.869562,
            m22 = .493824) : "17:30-18:30" == b ? (m11 = .256609,
            m21 = .966515,
            m12 = -.966515,
            m22 = .256609) : "18:00-19:00" == b ? (m11 = -.00295164,
            m21 = .999996,
            m12 = -.999996,
            m22 = -.00295164) : "18:30-19:30" == b ? (m11 = -.280097,
            m21 = .959972,
            m12 = -.959972,
            m22 = -.280097) : "19:00-20:00" == b ? (m11 = -.491215,
            m21 = .871038,
            m12 = -.871038,
            m22 = -.491215) : "19:30-20:30" == b ? (m11 = -.714524,
            m21 = .699611,
            m12 = -.699611,
            m22 = -.714524) : "20:00-21:00" == b ? (m11 = -.872336,
            m21 = .488907,
            m12 = -.488907,
            m22 = -.872336) : "20:30-21:30" == b ? (m11 = -.96647,
            m21 = .256778,
            m12 = -.256778,
            m22 = -.96647) : "21:00-22:00" == b ? (m11 = -.999537,
            m21 = .0304407,
            m12 = -.0304407,
            m22 = -.999537) : "21:30-22:30" == b ? (m11 = -.968745,
            m21 = -.24806,
            m12 = .24806,
            m22 = -.968745) : "22:00-23:00" == b ? (m11 = -.878092,
            m21 = -.478492,
            m12 = .478492,
            m22 = -.878092) : "22:30-23:30" == b ? (m11 = -.721657,
            m21 = -.69225,
            m12 = .69225,
            m22 = -.721657) : "23:00-24:00" == b || "23:00-0:00" == b ? (m11 = -.515643,
            m21 = -.856803,
            m12 = .856803,
            m22 = -.515643) : ("23:30-24:30" == b || "23:30-0:30" == b) && (m11 = -.252352,
            m21 = -.967635,
            m12 = .967635,
            m22 = -.252352),
            this.time = b;
            var c = "matrix(" + m11 + "," + m21 + "," + m12 + "," + m22 + ", 0, 0)";
            a(this._container).css({
                "-webkit-transform": c,
                transform: c
            }),
            m11 > 0 && m21 < 0 ? this._radian = Math.asin(m21) : m11 < 0 && m21 < 0 ? this._radian = -1 * Math.asin(m21) + Math.PI : m11 < 0 && m21 > 0 ? this._radian = -1 * Math.asin(m21) + Math.PI : m11 > 0 && m21 > 0 && (this._radian = -1 * Math.asin(m21)),
            this.changeDOM && this.changeDOM(b)
        },
        move: function(a) {
            this._radian = Math.atan2(this._getClientY(a) - this._mrY, this._getClientX(a) - this._mrX) - this._mrRadian;
            var b = this._getMatrix(this._radian, this._y, this._x)
              , c = Math.asin(b.M12.toFixed(16)) / Math.PI * 180
              , d = b.M11.toFixed(16);
            this._correctClock(c, d),
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        },
        stop: function() {
            a(this._container).unbind(this.touchEvents.touchmove),
            a(this._container).unbind(this.touchEvents.touchend),
            a(window).unbind("blur")
        },
        _correctClock: function(b, c) {
            var d = b
              , e = m21 = m12 = m22 = 0
              , f = "";
            c > 0 ? 90 >= d && d >= 75 ? (e = -.021943,
            m21 = -.999759,
            m12 = .999759,
            m22 = -.021943,
            f = "12:00-1:00") : 75 >= d && d >= 60 ? (e = .26172,
            m21 = -.965144,
            m12 = .965144,
            m22 = .26172,
            f = "12:30-1:30") : 60 >= d && d >= 45 ? (e = .477092,
            m21 = -.878853,
            m12 = .878853,
            m22 = .477092,
            f = "1:00-2:00") : 45 >= d && d >= 30 ? (e = .703144,
            m21 = -.711048,
            m12 = .711048,
            m22 = .703144,
            f = "1:30-2:30") : 30 >= d && d >= 15 ? (e = .871711,
            m21 = -.49002,
            m12 = .49002,
            m22 = .871711,
            f = "2:00-3:00") : 15 >= d && d >= 0 ? (e = .96509,
            m21 = -.261918,
            m12 = .261918,
            m22 = .96509,
            f = "2:30-3:30") : 0 >= d && d >= -15 ? (e = .999999,
            m21 = -.00163947,
            m12 = .00163947,
            m22 = .999999,
            f = "3:00-4:00") : -15 >= d && d >= -30 ? (e = .965614,
            m21 = .25998,
            m12 = -.25998,
            m22 = .965614,
            f = "3:30-4:30") : -30 >= d && d >= -45 ? (e = .856411,
            m21 = .516295,
            m12 = -.516295,
            m22 = .856411,
            f = "4:00-5:00") : -45 >= d && d >= -60 ? (e = .709508,
            m21 = .704698,
            m12 = -.704698,
            m22 = .709508,
            f = "4:30-5:30") : -60 >= d && d >= -75 ? (e = .493824,
            m21 = .869562,
            m12 = -.869562,
            m22 = .493824,
            f = "5:00-6:00") : -75 >= d && d >= -90 && (e = .256609,
            m21 = .966515,
            m12 = -.966515,
            m22 = .256609,
            f = "5:30-6:30") : -75 >= d && d >= -90 ? (e = -.00295164,
            m21 = .999996,
            m12 = -.999996,
            m22 = -.00295164,
            f = "6:00-7:00") : -60 >= d && d >= -75 ? (e = -.280097,
            m21 = .959972,
            m12 = -.959972,
            m22 = -.280097,
            f = "6:30-7:30") : -45 >= d && d >= -60 ? (e = -.491215,
            m21 = .871038,
            m12 = -.871038,
            m22 = -.491215,
            f = "7:00-8:00") : -30 >= d && d >= -45 ? (e = -.714524,
            m21 = .699611,
            m12 = -.699611,
            m22 = -.714524,
            f = "7:30-8:30") : -15 >= d && d >= -30 ? (e = -.872336,
            m21 = .488907,
            m12 = -.488907,
            m22 = -.872336,
            f = "8:00-9:00") : 0 >= d && d >= -15 ? (e = -.96647,
            m21 = .256778,
            m12 = -.256778,
            m22 = -.96647,
            f = "8:30-9:30") : 15 >= d && d >= 0 ? (e = -.999537,
            m21 = .0304407,
            m12 = -.0304407,
            m22 = -.999537,
            f = "9:00-10:00") : 30 >= d && d >= 15 ? (e = -.968745,
            m21 = -.24806,
            m12 = .24806,
            m22 = -.968745,
            f = "9:30-10:30") : 45 >= d && d >= 30 ? (e = -.878092,
            m21 = -.478492,
            m12 = .478492,
            m22 = -.878092,
            f = "10:00-11:00") : 60 >= d && d >= 45 ? (e = -.721657,
            m21 = -.69225,
            m12 = .69225,
            m22 = -.721657,
            f = "10:30-11:30") : 75 >= d && d >= 60 ? (e = -.515643,
            m21 = -.856803,
            m12 = .856803,
            m22 = -.515643,
            f = "11:00-12:00") : 90 >= d && d >= 75 && (e = -.252352,
            m21 = -.967635,
            m12 = .967635,
            m22 = -.252352,
            f = "11:30-12:30");
            var g = this.conEatTime(f);
            if (g.flag) {
                this.time = g.time,
                this.changeDOM && this.changeDOM(g.time);
                var h = this._container
                  , i = "matrix(" + e + "," + m21 + "," + m12 + "," + m22 + ", 0, 0)";
                a(h).css({
                    "-webkit-transform": i,
                    transform: i
                })
            }
        },
        conEatTime: function(a) {
            var b = {}
              , c = this.getFormatTime(a)
              , d = new Date("2000/01/01 " + c.st)
              , e = new Date("2000/01/01 " + c.et);
            if ("bt" == this.eatTime) {
                var f = this.getFormatTime(this.bt)
                  , g = new Date("2000/01/01 " + f.st)
                  , h = new Date("2000/01/01 " + f.et);
                12 == d.getHours() && d.setHours(0),
                b.time = this.formatDate(d, "h:mm") + "-" + this.formatDate(e, "h:mm"),
                d >= g && h >= e ? b.flag = !0 : b.flag = !1
            } else if ("lt" == this.eatTime) {
                var f = this.getFormatTime(this.lt)
                  , g = new Date("2000/01/01 " + f.st)
                  , h = new Date("2000/01/01 " + f.et);
                9 == d.getHours() || 10 == d.getHours() || 11 == d.getHours() || 12 == d.getHours() || d.setHours(d.getHours() + 12),
                10 == e.getHours() || 11 == e.getHours() || 12 == e.getHours() || e.setHours(e.getHours() + 12),
                b.time = this.formatDate(d, "h:mm") + "-" + this.formatDate(e, "h:mm"),
                d >= g && h >= e ? b.flag = !0 : b.flag = !1
            } else if ("dt" == this.eatTime) {
                var f = this.getFormatTime(this.dt)
                  , g = new Date("2000/01/01 " + f.st)
                  , h = new Date("2000/01/02 " + f.et);
                d.setHours(d.getHours() + 12),
                e.setHours(e.getHours() + 12),
                b.time = this.formatDate(d, "h:mm") + "-" + this.formatDate(e, "h:mm"),
                0 != d.getHours() && d >= g && h >= e ? b.flag = !0 : b.flag = !1
            }
            return b
        },
        formatDate: function(a, b) {
            a = new Date(a);
            var c = {
                M: a.getMonth() + 1,
                d: a.getDate(),
                h: a.getHours(),
                m: a.getMinutes(),
                s: a.getSeconds(),
                q: Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            };
            return b = b.replace(/([yMdhmsqS])+/g, function(b, d) {
                var e = c[d];
                return void 0 !== e ? (b.length > 1 && (e = "0" + e,
                e = e.substr(e.length - 2)),
                e) : "y" === d ? (a.getFullYear() + "").substr(4 - b.length) : b
            })
        },
        getFormatTime: function(a) {
            return {
                st: a.substring(0, a.indexOf("-")),
                et: a.substring(a.indexOf("-") + 1, a.length)
            }
        },
        _getClientX: function(a) {
            return "pc" == this.touchEvents.flag ? a.clientX : a.originalEvent.touches[0].clientX
        },
        _getClientY: function(a) {
            return "pc" == this.touchEvents.flag ? a.clientY : a.originalEvent.touches[0].clientY
        },
        _getScrollTop: function(a) {
            var b = a ? a.ownerDocument : document;
            return b.documentElement.scrollTop || b.body.scrollTop
        },
        _getScrollLeft: function(a) {
            var b = a ? a.ownerDocument : document;
            return b.documentElement.scrollLeft || b.body.scrollLeft
        },
        _rect: function(a) {
            var b = 0
              , c = 0
              , d = 0
              , e = 0
              , f = a.getBoundingClientRect();
            return b = d = this._getScrollLeft(a),
            c = e = this._getScrollTop(a),
            b += f.left,
            d += f.right,
            c += f.top,
            e += f.bottom,
            {
                left: b,
                top: c,
                right: d,
                bottom: e
            }
        },
        _clientRect: function(a) {
            var b = this._rect(a)
              , c = this._getScrollLeft(a)
              , d = this._getScrollTop(a);
            return b.left -= c,
            b.right -= c,
            b.top -= d,
            b.bottom -= d,
            b
        },
        _getMatrix: function(a, b, c) {
            var d = Math.cos(a)
              , e = Math.sin(a);
            return {
                M11: d * b,
                M12: -e * c,
                M21: e * b,
                M22: d * c
            }
        },
        _isMobile: function() {
            var a = navigator.userAgent.toLowerCase()
              , b = "ipad" == a.match(/ipad/i)
              , c = "iphone os" == a.match(/iphone os/i)
              , d = "midp" == a.match(/midp/i)
              , e = "rv:1.2.3.4" == a.match(/rv:1.2.3.4/i)
              , f = "ucweb" == a.match(/ucweb/i)
              , g = "android" == a.match(/android/i)
              , h = "windows ce" == a.match(/windows ce/i)
              , i = "windows mobile" == a.match(/windows mobile/i);
            "webview" == a.match(/webview/i);
            return b || c || d || e || f || g || h || i
        },
        touchEvents: {
            touchstart: "touchstart",
            touchmove: "touchmove",
            touchend: "touchend",
            flag: "mobile",
            initTouchEvents: function(a) {
                a._isMobile() || (this.touchstart = "mousedown",
                this.touchmove = "mousemove",
                this.touchend = "mouseup",
                this.flag = "pc")
            }
        }
    },
    a.fn.clock = function(c) {
        var d = Array.apply(null , arguments);
        d.shift();
        var e;
        return this.each(function() {
            var f = a(this)
              , g = f.data("clock")
              , h = "object" == typeof c && c;
            return g || f.data("clock", g = new b(this,a.extend({}, a.fn.clock.defaults, h))),
            "string" == typeof c && "function" == typeof g[c] && (e = g[c].apply(g, d),
            void 0 !== e) ? !1 : void 0
        }),
        void 0 !== e ? e : this
    }
    ,
    a.fn.clock.defaults = {}
}(jQuery),
CanvasRenderingContext2D.prototype.sector = function(a, b, c, d, e, f) {
     this.save(),
    this.translate(a, b),
    this.beginPath(),
    this.arc(0, 0, c, d, e),
    this.save(),
    this.rotate(e),
    this.moveTo(c, 0),
    this.lineTo(0, 0),
    this.restore(),
    this.rotate(d),
    this.lineTo(c, 0),
    this.closePath(),
    this.restore();
    var f1="rgba(92, 158, 214,0.5)"
    if(f){
    	f1="rgba("+f.substring(f.indexOf('(')+1,f.length-1)+",0.5)";
    }
    this.fillStyle = f1;
    
    return this;
}
;
