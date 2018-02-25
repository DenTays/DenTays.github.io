
var arrTop = []
var createLevel =  function (object) {
	arrTop = []

	var animDuck = pjs.tiles.newAnimation(object.topFile, 75, 62, 4)

	background = game.newImageObject({
	file : object.backgroundFile,
	scale : del * 6,
	onload : function () {
		scopeObject.setPosition(background.getPositionC())
	}
	});

	scope = game.newImageObject({
	file : object.scopeFile,
	w : joyRadius * 1.5, h : joyRadius * 1.5
	})

	OOP.forInt(object.topCount, function () {
		var obj = game.newAnimationObject({
			y : random(20, gameHeight), x : random(0, gameWidth *2),
			w : 75*5*del, h : 55*5*del,
			animation : animDuck,
			userData : {
				dx : random(-7, 7, true),
				dy : 0
			}
		})

		obj.setDelay(10-Math.abs(obj.dx))

		if (obj.dx < 0)
			obj.setFlip(1, 0)

		arrTop.push(obj)
	})

}

var createLocalLevel = function (background, file, topCount) {
	createLevel({
	backgroundFile : 'img/'+background+'/background.'+file,
	topCount : topCount,
	topFile : 'img/duck.png',
	scopeFile : 'img/scope.png'
	})
}

var drawTop = function () {
	OOP.forArr(arrTop, function (el, i, arr) {
		if (!el) return

		if (!el.dy) {
			el.drawFrames(0, 1, 2)
		} else {
			el.drawFrame(3)
			el.turn(el.dx)
		}

		if (el.x < -el.w && el.dx < 0)
			el.x = background.w + el.w

		if (el.x > background.w && el.dx > 0)
			el.x = -el.w

		el.move(point(el.dx, el.dy))

		if (el.y > background.h && background.loaded) {
			arr.splice(i, 1)
		}

	})
}

var fireTop = function () {
	OOP.forArr(arrTop, function (el, i, arr) {
		if (!fire) return true;
		if (scopeObject.isDynamicInside(el.getDynamicBox())) {
			cannedFood += 1
			el.dy = 5
			fire = false
			fireRect.fillColor = '#FF5C5C'

		}
	})
}