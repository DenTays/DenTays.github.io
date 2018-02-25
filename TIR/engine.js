
var pjs = new PointJS('2D', 720, 480);
pjs.system.initFullPage();
var log = pjs.system.log;
var game = pjs.game;
var OOP = pjs.OOP;
var point = pjs.vector.point;
var size = pjs.vector.size;
var brush = pjs.brush;
var vector = pjs.vector
var camera = pjs.camera
var random = pjs.math.random

var touch = pjs.touchControl.initTouchControl();

var width = game.getWH().w
var height = game.getWH().h

var gameWidth = width
var gameHeight = height

var fire

var bullet = 8
var cannedFood = 5
