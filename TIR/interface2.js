var joyRadius = gameHeight / 5
var del = gameHeight /2000

var scopeObject = game.newBaseObject({
	x : (gameWidth) / 2, y : gameHeight / 2,

})
var scopeObject2 = game.newBaseObject({
	x : (gameWidth) / 2, y : gameHeight / 2,
})

var scope = game.newImageObject({
	file : 'img/scope.png',
	w : joyRadius * 1.5, h : joyRadius * 1.5
})
var joy = game.newCircleObject({
	x : gameWidth + 17, y : 92,
	radius : joyRadius,
	fillColor : 'black',
	alpha : 0.2
})
var joystick = game.newCircleObject({
	x : gameWidth + 17, y : 92,
	radius : joyRadius / 2,
	fillColor : pjs.colors.hex2rgba('#FFFFFF', 0.7)
})

var fireRect = game.newRectObject({
	x : 0, y : 0,
	w : gameWidth, h : gameHeight,
	fillColor : 'white'
})
var exit = game.newImageObject({
	file : 'img/exit.jpg',
	scale : 0.7,
	alpha : 0.9
})

var background;
var pressTime = 0

var drawBackground = function () {
	background.draw()
}

var drawBullets = function () {
	OOP.forInt(cannedFood, function (i) {
		brush.drawImageS({
			x : 10 + (35 + 112 * del) * i, y : 10,
			w : 256* del, h : 256 * del,
			file : 'https://d30y9cdsu7xlg0.cloudfront.net/png/416296-200.png'
		})
	})
	OOP.forInt(bullet, function (i) {
		brush.drawImageS({
			x : 10 + (20 + 112 *del) * i, y : gameHeight - 584 *del - 10,
			w : 112 *del+10, h : 584 *del,
			file : 'img/bullet.png'
		})
	})
}

var drawInterface = function () {

	joy.setPositionS({
		x : gameWidth - joy.w - 10, 
		y : gameHeight - joy.h - 10
	})

	fireRect.setPositionS(point(0, 0))

	
	var dist = joystick.getDistanceC(joy.getPositionC())

	if (touch.isDown() && touch.isInStatic(joy.getStaticBox())) {
		joystick.moveTimeC(touch.getPosition(), 20)	
		if (joy.alpha < 0.5)
			joy.alpha += 0.05
	} else {
	  joystick.moveTimeC(joy.getPositionC(), 5)
	  if (joy.alpha > 0.2)
			joy.alpha -= 0.05
	}

	

	var angle = vector.getAngle2Points(joy.getPositionC(), joystick.getPositionC());
	scopeObject.setAngle(angle)
	scopeObject.moveAngle(dist/20)

	joy.draw()
	joystick.draw()
	scope.draw()
	

	scopeObject2.moveTimeC(scopeObject.getPosition(), 10)
	scope.moveTimeC(scopeObject2.getPosition(), 1)
	

	OOP.forInt(cannedFood, function (i) {
		brush.drawImageS({
			x : 10 + (35 + 112 * del) * i, y : 10,
			w : 256* del, h : 256 * del,
			file : 'https://d30y9cdsu7xlg0.cloudfront.net/png/416296-200.png'
		})
	})
	OOP.forInt(bullet, function (i) {
		brush.drawImageS({
			x : 10 + (20 + 112 *del) * i, y : gameHeight - 584 *del - 10,
			w : 112 *del+10, h : 584 *del,
			file : 'img/bullet.png'
		})
	})



	if (touch.isPress())
		pressTime = game.getTime()

	if (touch.isUp())
		if (game.getTime() - pressTime < 180 && bullet) {
			fire = true
			bullet -= 1
			fireRect.fillColor = 'white'
			fireRect.setAlpha(1)
			scopeObject2.move(point(0, -40))
			scopeObject.move(point(random(-8, 8), random(-8, 8)))
		}
	if(fireRect.getAlpha() > 0)
		fireRect.setAlpha(fireRect.getAlpha()-0.05)
	fireRect.draw()


	exit.setPositionS(point(width-exit.w-10, 10))
	exit.draw()


	camera.moveTime(vector.pointMinus(scope.getPositionC(), point(gameWidth / 2, gameHeight / 2)), 10)

	if (scopeObject.x < gameWidth/2) {
		camera.setPosition(point(0, 'none'))
	}
	if (scopeObject.y < gameHeight/2) {
		camera.setPosition(point('none', 0))
	}
	if (scopeObject.x > background.w - gameWidth/2) {
		camera.setPosition(point(background.w - gameWidth, 'none'))
	}
	if (scopeObject.y > background.h - gameHeight/2) {
		camera.setPosition(point('none', background.h - gameHeight))
	}

	if (touch.isPeekObject(exit)) {
		game.setLoop('menu')
		return;
	}


}