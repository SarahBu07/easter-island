var $wing = $('#wing');
var $chickBody = $('#chick-body');
var $fish = $('#fish');
var $egg = $('#egg');
var $fish = $('#fish');
var $mouthDown = $("#fish-mouth-down");
var $mouthUp = $("#fish-mouth-up");
var $chickHeadGroup =  $('#chickHead-group');
var $chickHeadFirst = $('#chickHead-first');
var $chickHeadInside = $('#chickHead-inside');
var $cutNeckMask = $('#cutNeck-mask');

TweenMax.set(["#leg-frt-bottom", "#leg-bck-bottom", $chickBody], {transformOrigin:"50% 100%"});
TweenMax.set(["#leg-frt-top", "#leg-bck-top"], {transformOrigin:"100% 50%"});
TweenMax.set("#egg", {transformOrigin:"50% 50%"});
TweenMax.set($wing, {transformOrigin:"100% 30%"});
TweenMax.set($fish, {transformOrigin:"50% 50%", y:10});
TweenMax.set($mouthUp, {transformOrigin:"100% 100%"});
TweenMax.set($mouthDown, {transformOrigin:"0% 50%"});
TweenMax.set("#nage-arm", {transformOrigin:"0% 20%"});
TweenMax.set($chickHeadGroup, {transformOrigin:"100% 100%"});
TweenMax.set($chickHeadInside, {transformOrigin:"50% 50%"});

//start
function startScene() {
var tlStart = new TimelineMax();
tlStart.add("timeStart");
tlStart.to(["#leg-frt-bottom", "#leg-bck-bottom"], 0.6, {
  rotation:-10, repeat:1, yoyo:true, repeatDelay:0.2, yoyoEase:Power3.easeIn
}, "timeStart");
tlStart.to(["#leg-frt-top", "#leg-bck-top"], 0.6, {
  rotation:10, yPercent:"8%", xPercent:"-50%", repeat:1, yoyo:true, repeatDelay:0.2, yoyoEase:Power3.easeIn
}, "timeStart");
tlStart.to($chickBody, 0.6, {rotation:10, yPercent:"3%", repeat:1, yoyo:true, repeatDelay:0.2, yoyoEase:Power3.easeIn}, "timeStart");
tlStart.to($wing, 0.6,{rotation:5, xPercent:"10%", yPercent:"15%"}, "timeStart+=0.05");
tlStart.add("eggComing");
tlStart.to($wing, 0.08, {rotation:10, repeat:5, yoyo:true, yoyoEase: Linear.easeNone  }, "eggComing-=0.8")
.to($wing, 0.6, {rotation:0, xPercent:"0%", yPercent:"0%", ease: Power1.easeOut}, "-=0.2");

return tlStart; 
}

//Egg falling
function eggComing() {
var timeEgg = new TimelineMax();
timeEgg.to($egg, 1.8, {bezier: {curviness:1, values:[{x:0, y:0}, {x:-75, y:95}, {x:-85, y:280}], autoRotate:["x","y","rotation",-125,false]}, ease:Power1.easeOut} );

timeEgg.to($egg, 0.3, {opacity:0}, "-=0.3");
timeEgg.add("eggEaten"); 
//fish eats the egg
timeEgg.to($fish, 0.6, {bezier: {curviness:3, values:[{x:0, y:10}, {x:30, y:-60}, {x:62, y:-140}], autoRotate:["x","y","rotation",15,true]}, ease: Expo.easeOut}, "eggEaten-=1.4");
timeEgg.from($mouthDown, 0.4, {rotation:-30, xPercent:"-5%", repeat:1, yoyo:true}, "eggEaten-=1.3");
timeEgg.from($mouthUp, 0.4, {rotation:25, xPercent:"-1%", yPercent:"1.5%", repeat:1, yoyo:true}, "eggEaten-=1.3");
timeEgg.to("#nage-arm", 0.6,{rotation:25, repeat:1, repeatDelay:0.1, yoyo:true, yoyoEase:Back.easeOut}, "eggEaten-=1.3");
timeEgg.to($fish, 0.8 ,{bezier: {curviness:2, values:[{x:70, y:-100}, {x:75, y:-60}, {x:80, y:5}]}, ease: Power1.easeIn}, "-=0.6");  

timeEgg.timeScale(1.2);
return timeEgg;
}

function chickHeadMove() {
var timeHead = new TimelineMax();
timeHead.add("headHead");
timeHead.to($chickHeadGroup, 0.4, {rotation:110, yPercent:"-1%", xPercent:"1%", ease:Power1.easeIn});
timeHead.to($chickHeadGroup, 0.8, {bezier: {curviness:2, values:[{x:2, y:5}, {x:40, y:55}, {x:80, y:280}] /*autoRotate:["x","y","rotation",0,true]*/}, rotation:175, ease: Linear.easeNone});
timeHead.to($chickHeadFirst, 0.4, {y:-120, ease:Power0.easeOut});
//new head from inside
timeHead.from($chickHeadInside, 1, {scale:0.5, x:-10}, "headHead+=0.3");
timeHead.from($chickHeadInside, 1.2, {y:45, ease:Elastic.easeOut.config(1, 1)}, "headHead+=0.2");
timeHead.to($cutNeckMask, 0.3, {opacity:0}, "-=0.7");

return timeHead;
}


//master timeline
var master = new TimelineMax({repeat:-1});
master.add( startScene() );
master.add( eggComing(), "-=1.3" );
master.add( chickHeadMove(), "-=0.5");



