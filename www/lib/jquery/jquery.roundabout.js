$144.extend({roundabout_shape:{def:"lazySusan",lazySusan:function(a,b,c){return{x:Math.sin(a+b),y:Math.sin(a+3*Math.PI/2+b)/8*c,z:(Math.cos(a+b)+1)/2,scale:Math.sin(a+Math.PI/2+b)/2+.5}}}}),$144.fn.roundabout=function(){var a="object"!=typeof arguments[0]?{}:arguments[0];if(a={bearing:"undefined"==typeof a.bearing?0:$144.roundabout_toFloat(a.bearing%360),tilt:"undefined"==typeof a.tilt?0:$144.roundabout_toFloat(a.tilt),minZ:"undefined"==typeof a.minZ?100:parseInt(a.minZ,10),maxZ:"undefined"==typeof a.maxZ?400:parseInt(a.maxZ,10),minOpacity:"undefined"==typeof a.minOpacity?.4:$144.roundabout_toFloat(a.minOpacity),maxOpacity:"undefined"==typeof a.maxOpacity?1:$144.roundabout_toFloat(a.maxOpacity),minScale:"undefined"==typeof a.minScale?.4:$144.roundabout_toFloat(a.minScale),maxScale:"undefined"==typeof a.maxScale?1:$144.roundabout_toFloat(a.maxScale),duration:"undefined"==typeof a.duration?600:parseInt(a.duration,10),btnNext:a.btnNext||null,btnPrev:a.btnPrev||null,easing:a.easing||"swing",clickToFocus:a.clickToFocus!==!1,focusBearing:"undefined"==typeof a.focusBearing?0:$144.roundabout_toFloat(a.focusBearing%360),shape:a.shape||"lazySusan",debug:a.debug||!1,childSelector:a.childSelector||"li",startingChild:"undefined"==typeof a.startingChild?null:parseInt(a.startingChild,10),reflect:"undefined"==typeof a.reflect||a.reflect===!1?!1:!0},this.each(function(b){var c=$144(this),d=$144.roundabout_toFloat(360/c.children(a.childSelector).length),e=null===a.startingChild?a.bearing:a.startingChild*d;c.addClass("roundabout-holder").css("padding",0).css("position","relative").css("z-index",a.minZ),c.data("roundabout",{bearing:e,tilt:a.tilt,minZ:a.minZ,maxZ:a.maxZ,minOpacity:a.minOpacity,maxOpacity:a.maxOpacity,minScale:a.minScale,maxScale:a.maxScale,duration:a.duration,easing:a.easing,clickToFocus:a.clickToFocus,focusBearing:a.focusBearing,animating:0,childInFocus:-1,shape:a.shape,period:d,debug:a.debug,childSelector:a.childSelector,reflect:a.reflect}),a.clickToFocus===!0&&c.children(a.childSelector).each(function(b){$144(this).click(function(e){var f=a.reflect===!0?360-d*b:d*b;return f=$144.roundabout_toFloat(f),$144.roundabout_isInFocus(c,f)?void 0:(e.preventDefault(),0===c.data("roundabout").animating&&c.roundabout_animateAngleToFocus(f),!1)})}),a.btnNext&&$144(a.btnNext).bind("click.roundabout",function(a){return a.preventDefault(),0===c.data("roundabout").animating&&c.roundabout_animateToNextChild(),!1}),a.btnPrev&&$144(a.btnPrev).bind("click.roundabout",function(a){return a.preventDefault(),0===c.data("roundabout").animating&&c.roundabout_animateToPreviousChild(),!1})}),this.roundabout_startChildren(),"function"==typeof arguments[1]){var b=arguments[1],c=this;setTimeout(function(){b(c)},0)}return this},$144.fn.roundabout_startChildren=function(){return this.each(function(a){var b=$144(this),c=b.data("roundabout"),d=b.children(c.childSelector);d.each(function(a){var b=c.reflect===!0?360-c.period*a:c.period*a;$144(this).addClass("roundabout-moveable-item").css("position","absolute"),$144(this).data("roundabout",{startWidth:$144(this).width(),startHeight:$144(this).height(),startFontSize:parseInt($144(this).css("font-size"),10),degrees:b})}),b.roundabout_updateChildPositions()}),this},$144.fn.roundabout_setTilt=function(a){if(this.each(function(b){$144(this).data("roundabout").tilt=a,$144(this).roundabout_updateChildPositions()}),"function"==typeof arguments[1]){var b=arguments[1],c=this;setTimeout(function(){b(c)},0)}return this},$144.fn.roundabout_setBearing=function(a){if(this.each(function(b){$144(this).data("roundabout").bearing=$144.roundabout_toFloat(a%360,2),$144(this).roundabout_updateChildPositions()}),"function"==typeof arguments[1]){var b=arguments[1],c=this;setTimeout(function(){b(c)},0)}return this},$144.fn.roundabout_adjustBearing=function(a){if(a=$144.roundabout_toFloat(a),0!==a&&this.each(function(b){$144(this).data("roundabout").bearing=$144.roundabout_getBearing($144(this))+a,$144(this).roundabout_updateChildPositions()}),"function"==typeof arguments[1]){var b=arguments[1],c=this;setTimeout(function(){b(c)},0)}return this},$144.fn.roundabout_adjustTilt=function(a){if(a=$144.roundabout_toFloat(a),0!==a&&this.each(function(b){$144(this).data("roundabout").tilt=$144.roundabout_toFloat($144(this).roundabout_get("tilt")+a),$144(this).roundabout_updateChildPositions()}),"function"==typeof arguments[1]){var b=arguments[1],c=this;setTimeout(function(){b(c)},0)}return this},$144.fn.roundabout_animateToBearing=function(a){a=$144.roundabout_toFloat(a);var b=new Date,c="undefined"==typeof arguments[1]?null:arguments[1],d="undefined"==typeof arguments[2]?null:arguments[2],e="object"!=typeof arguments[3]?null:arguments[3];return this.each(function(f){var g,h,i,j=$144(this),k=j.data("roundabout"),l=null===c?k.duration:c,m=null!==d?d:k.easing||"swing";null===e&&(e={timerStart:b,start:$144.roundabout_getBearing(j),totalTime:l}),g=b-e.timerStart,l>g?(k.animating=1,"string"==typeof $144.easing.def?(h=$144.easing[m]||$144.easing[$144.easing.def],i=h(null,g,e.start,a-e.start,e.totalTime)):i=$144.easing[m](g/e.totalTime,g,e.start,a-e.start,e.totalTime),j.roundabout_setBearing(i,function(){j.roundabout_animateToBearing(a,l,m,e)})):(a=0>a?a+360:a%360,k.animating=0,j.roundabout_setBearing(a))}),this},$144.fn.roundabout_animateToDelta=function(a){var b=arguments[1],c=arguments[2];return this.each(function(d){a=$144.roundabout_getBearing($144(this))+$144.roundabout_toFloat(a),$144(this).roundabout_animateToBearing(a,b,c)}),this},$144.fn.roundabout_animateToChild=function(a){var b=arguments[1],c=arguments[2];return this.each(function(d){var e=$144(this),f=e.data("roundabout");if(f.childInFocus!==a&&0===f.animating){var g=$144(e.children(f.childSelector)[a]);e.roundabout_animateAngleToFocus(g.data("roundabout").degrees,b,c)}}),this},$144.fn.roundabout_animateToNearbyChild=function(a,b){var c=a[0],d=a[1];return this.each(function(a){var e,f=$144(this).data("roundabout"),g=$144.roundabout_toFloat(360-$144.roundabout_getBearing($144(this))),h=f.period,i=0,j=f.reflect,k=$144(this).children(f.childSelector).length;if(g=j===!0?g%360:g,0===f.animating)if(j===!1&&"next"===b||j===!0&&"next"!==b)for(g=0===g?360:g;k>i;){if(e={lower:$144.roundabout_toFloat(h*i),upper:$144.roundabout_toFloat(h*(i+1))},e.upper=i==k-1?360:e.upper,g<=e.upper&&g>e.lower){$144(this).roundabout_animateToDelta(g-e.lower,c,d);break}i++}else for(;;){if(e={lower:$144.roundabout_toFloat(h*i),upper:$144.roundabout_toFloat(h*(i+1))},e.upper=i==k-1?360:e.upper,g>=e.lower&&g<e.upper){$144(this).roundabout_animateToDelta(g-e.upper,c,d);break}i++}}),this},$144.fn.roundabout_animateToNextChild=function(){return this.roundabout_animateToNearbyChild(arguments,"next")},$144.fn.roundabout_animateToPreviousChild=function(){return this.roundabout_animateToNearbyChild(arguments,"previous")},$144.fn.roundabout_animateAngleToFocus=function(a){var b=arguments[1],c=arguments[2];return this.each(function(d){var e=$144.roundabout_getBearing($144(this))-a;e=Math.abs(360-e)<Math.abs(0-e)?360-e:0-e,e=e>180?-(360-e):e,0!==e&&$144(this).roundabout_animateToDelta(e,b,c)}),this},$144.fn.roundabout_updateChildPositions=function(){return this.each(function(a){var b=$144(this),c=b.data("roundabout"),d=-1,e={bearing:$144.roundabout_getBearing(b),tilt:c.tilt,stage:{width:Math.floor(.9*b.width()),height:Math.floor(.9*b.height())},animating:c.animating,inFocus:c.childInFocus,focusBearingRad:$144.roundabout_degToRad(c.focusBearing),shape:$144.roundabout_shape[c.shape]||$144.roundabout_shape[$144.roundabout_shape.def]};e.midStage={width:e.stage.width/2,height:e.stage.height/2},e.nudge={width:e.midStage.width+.05*e.stage.width,height:e.midStage.height+.05*e.stage.height},e.zValues={min:c.minZ,max:c.maxZ,diff:c.maxZ-c.minZ},e.opacity={min:c.minOpacity,max:c.maxOpacity,diff:c.maxOpacity-c.minOpacity},e.scale={min:c.minScale,max:c.maxScale,diff:c.maxScale-c.minScale},b.children(c.childSelector).each(function(a){$144.roundabout_updateChildPosition($144(this),b,e,a)&&0===e.animating?(d=a,$144(this).addClass("roundabout-in-focus")):$144(this).removeClass("roundabout-in-focus")}),d!==e.inFocus&&($144.roundabout_triggerEvent(b,e.inFocus,"blur"),-1!==d&&$144.roundabout_triggerEvent(b,d,"focus"),c.childInFocus=d)}),this},$144.roundabout_getBearing=function(a){return $144.roundabout_toFloat(a.data("roundabout").bearing)%360},$144.roundabout_degToRad=function(a){return a%360*Math.PI/180},$144.roundabout_isInFocus=function(a,b){return $144.roundabout_getBearing(a)%360===b%360},$144.roundabout_triggerEvent=function(a,b,c){return 0>b?this:$144(a.children(a.data("roundabout").childSelector)[b]).trigger(c)},$144.roundabout_toFloat=function(a){return a=Math.round(1e3*parseFloat(a))/1e3,parseFloat(a.toFixed(2))},$144.roundabout_updateChildPosition=function(a,b,c,d){for(var e=$144(a),f=e.data("roundabout"),g=[],h=$144.roundabout_degToRad(360-e.data("roundabout").degrees+c.bearing);0>h;)h+=2*Math.PI;for(;h>2*Math.PI;)h-=2*Math.PI;var i=c.shape(h,c.focusBearingRad,c.tilt);return i.scale=i.scale>1?1:i.scale,i.adjustedScale=(c.scale.min+c.scale.diff*i.scale).toFixed(4),i.width=(i.adjustedScale*f.startWidth).toFixed(4),i.height=(i.adjustedScale*f.startHeight).toFixed(4),e.css("left",(i.x*c.midStage.width+c.nudge.width-i.width/2).toFixed(1)+"px").css("top",(i.y*c.midStage.height+c.nudge.height-i.height/2).toFixed(1)+"px").css("width",i.width+"px").css("height",i.height+"px").css("opacity",(c.opacity.min+c.opacity.diff*i.scale).toFixed(2)).css("z-index",Math.round(c.zValues.min+c.zValues.diff*i.z)).css("font-size",(i.adjustedScale*f.startFontSize).toFixed(2)+"px").attr("current-scale",i.adjustedScale),b.data("roundabout").debug===!0&&(g.push('<div style="font-weight: normal; font-size: 10px; padding: 2px; width: '+e.css("width")+'; background-color: #ffc;">'),g.push('<strong style="font-size: 12px; white-space: nowrap;">Child '+d+"</strong><br />"),g.push("<strong>left:</strong> "+e.css("left")+"<br /><strong>top:</strong> "+e.css("top")+"<br />"),g.push("<strong>width:</strong> "+e.css("width")+"<br /><strong>opacity:</strong> "+e.css("opacity")+"<br />"),g.push("<strong>z-index:</strong> "+e.css("z-index")+"<br /><strong>font-size:</strong> "+e.css("font-size")+"<br />"),g.push("<strong>scale:</strong> "+e.attr("current-scale")),g.push("</div>"),e.html(g.join(""))),$144.roundabout_isInFocus(b,e.data("roundabout").degrees)};