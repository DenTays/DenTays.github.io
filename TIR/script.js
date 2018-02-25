
game.newLoop('menu', function () {
	game.fill('#555555')
	toOldLake.draw()
	goToShop.draw()
	explore.draw()
	gatherWood.draw()
	drawBullets()

	if (cannedFood > 0) {
	if (touch.isPeekObject(toOldLake) ) {
		cannedFood--
		createLocalLevel('background2', 'png', 6)
		game.setLoop('tir')
		scopeObject.setPosition(background.getPositionC())
	}
	} else if (cannedFood <= 0) {
		toForest.color = 'red'
		toOldLake.color = 'red'
	} else if (cannedFood > 0) {
		toForest.color = 'white'
		toOldLake.color = 'white'
	}
	if (touch.isPeekObject(goToShop)) {
		game.startLoop('shop')
	}


})

game.newLoop('shop', function () {
	game.fill('#555555')
	
	drawBullets()

	buyBullets.draw()
	goFromShop.draw()
	

	if (cannedFood >= 2) {
	if (touch.isPeekObject(buyBullets)) {
		if (cannedFood >= 2) {
		cannedFood -= 2
		bullet ++
		}
	}
	} else if (cannedFood <= 1) {
		buyBullets.color = 'red'
	}

	if (touch.isPeekObject(goFromShop)) {
		game.setLoop('menu')
	}
})


game.newLoop('tir', function () {
	game.fill('#E7E7E7');

	fire = false

	drawBackground()
	drawTop()
	drawInterface()

	if (fire) {
		fireTop()
	}
	
});

game.startLoop('menu');