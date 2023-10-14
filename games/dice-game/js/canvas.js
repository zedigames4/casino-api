////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, gameContainer, boardAreaContainer, boardHighlightContainer, tokenContainer, betContainer, historyContainer, resultContainer;
var bg, board, buttonStart, buttonRoll, buttonRollDisabled, buttonHistory, diceAnimate1, diceAnimate2, diceAnimate3, diceData, overlayBetBg, overlayBet, buttonMinus, buttonPlus, buttonBet, txtCredit, txtPaid, txtWin, txtTime, txtBetNumber, overlayHistory, overlayResultBg, result, buttonReplay, txtScore, buttonFacebook, buttonTwitter, buttonWhatsapp;

$.token={};
$.areaBet={};
$.history={};
$.historyDice={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	boardAreaContainer = new createjs.Container();
	boardHighlightContainer = new createjs.Container();
	tokenContainer = new createjs.Container();
	betContainer = new createjs.Container();
	historyContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Shape();
	bg.graphics.beginFill(backgroundColour).drawRect(0, 0, canvasW, canvasH);
	board = new createjs.Bitmap(loader.getResult('board'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100*11;
	
	buttonRoll = new createjs.Bitmap(loader.getResult('buttonRoll'));
	buttonRollDisabled = new createjs.Bitmap(loader.getResult('buttonRollDisabled'));
	buttonHistory = new createjs.Bitmap(loader.getResult('buttonHistory'));
	overlayHistory = new createjs.Bitmap(loader.getResult('overlayHistory'));
	
	centerReg(buttonRoll);
	centerReg(buttonRollDisabled);
	centerReg(buttonHistory);
	
	buttonRoll.x = buttonRollDisabled.x = canvasW/2;
	buttonRoll.y = buttonRollDisabled.y = canvasH/100*11;
	
	buttonHistory.x = canvasW/100*82;
	buttonHistory.y = canvasH/100*16;
	
	historyContainer.x = canvasW;
	historyContainer.y = canvasH/100*21.5;
	historyContainer.addChild(overlayHistory);
	
	var _frameW=130;
	var _frameH=130;
	var _frame = {"regX": (_frameW/2), "regY": (_frameH/2), "height": _frameH, "count": 7, "width": _frameW};
	var _animations = {static:{frames: [0]}};
						
	diceData = new createjs.SpriteSheet({
		"images": [loader.getResult("dice").src],
		"frames": _frame,
		"animations": _animations
	});
	
	diceAnimate1 = new createjs.Sprite(diceData, "static");
	diceAnimate1.framerate = 20;
	
	diceAnimate2 = new createjs.Sprite(diceData, "static");
	diceAnimate2.framerate = 20;
	
	diceAnimate3 = new createjs.Sprite(diceData, "static");
	diceAnimate3.framerate = 20;
	
	diceAnimate1.x = canvasW/100 * 36.5;
	diceAnimate2.x = canvasW/2;
	diceAnimate3.x = canvasW/100 * 63.5;
	diceAnimate1.y = diceAnimate2.y = diceAnimate3.y = canvasH/100 * 11;
	
	var diceSpaceX = 62;
	var diceSpaceY = 70;
	var diceStartX = 50;
	var diceX = diceStartX;
	var diceY = 48;
	var column = 1;
	
	for(n=0;n<24;n++){
		$.historyDice[n] = new createjs.Sprite(diceData, "static");
		$.historyDice[n].framerate = 20;
		
		$.historyDice[n].x = diceX;
		$.historyDice[n].y = diceY;
		$.historyDice[n].scaleX = $.historyDice[n].scaleY = .45;
		
		diceX += diceSpaceX;
		column++;
		if(column > 3){
			column = 1;
			diceX = diceStartX;
			diceY += diceSpaceY;	
		}
		historyContainer.addChild($.historyDice[n]);
	}

	overlayBetBg = new createjs.Shape();	
	overlayBetBg.graphics.beginFill('#ffffff').drawRect(0,canvasH/100 * 20, canvasW, canvasH);
	overlayBetBg.alpha = .8;
	
	overlayBet = new createjs.Bitmap(loader.getResult('overlayBet'));
	buttonMinus = new createjs.Bitmap(loader.getResult('buttonMinus'));
	buttonPlus = new createjs.Bitmap(loader.getResult('buttonPlus'));
	buttonBet = new createjs.Bitmap(loader.getResult('buttonBet'));
	centerReg(buttonMinus);
	centerReg(buttonPlus);
	centerReg(buttonBet);
	
	buttonMinus.x = canvasW/100 * 27;
	buttonPlus.x = canvasW/100 * 73;
	buttonMinus.y = buttonPlus.y = canvasH/100 * 53;
	
	buttonBet.x = canvasW/2;
	buttonBet.y = canvasH/100 * 72;
	
	txtCredit = new createjs.Text();
	txtCredit.font = "50px built_titlingbold";
	txtCredit.color = "#000000";
	txtCredit.text = 0;
	txtCredit.textAlign = "left";
	txtCredit.textBaseline='alphabetic';
	
	txtPaid = new createjs.Text();
	txtPaid.font = "50px built_titlingbold";
	txtPaid.color = "#000000";
	txtPaid.text = 0;
	txtPaid.textAlign = "left";
	txtPaid.textBaseline='alphabetic';
	
	txtWin = new createjs.Text();
	txtWin.font = "50px built_titlingbold";
	txtWin.color = "#000000";
	txtWin.text = 0;
	txtWin.textAlign = "left";
	txtWin.textBaseline='alphabetic';
	
	txtCredit.x = txtPaid.x = txtWin.x = canvasW/100 * 3;
	txtCredit.y = canvasH/100 * 7;
	txtPaid.y = canvasH/100 * 13;
	txtWin.y = canvasH/100 * 19;
	
	//memberpayment
	if(typeof memberData != 'undefined'){
		txtCredit.font = "30px built_titlingbold";
		txtWin.font = "30px built_titlingbold";
		txtPaid.font = "30px built_titlingbold";
		
		txtCredit.x = txtPaid.x = txtWin.x = canvasW/100 * 3;
		txtCredit.y = canvasH/100 * 13;
		txtPaid.y = canvasH/100 * 17;
		txtWin.y = canvasH/100 * 21;
	}
	
	txtTime = new createjs.Text();
	txtTime.font = "70px built_titlingbold";
	txtTime.color = "#000000";
	txtTime.text = '00:00';
	txtTime.textAlign = "center";
	txtTime.textBaseline='alphabetic';
	txtTime.x = canvasW/100 * 82;
	txtTime.y = canvasH/100 * 10;
	
	txtBetNumber = new createjs.Text();
	txtBetNumber.font = "120px built_titlingbold";
	txtBetNumber.color = "#ffffff";
	txtBetNumber.text = 0;
	txtBetNumber.textAlign = "center";
	txtBetNumber.textBaseline='alphabetic';
	txtBetNumber.x = canvasW/2;
	txtBetNumber.y = canvasH/100 * 59;
	
	for(n=0;n<token_arr.length;n++){
		$.token['token'+n] = new createjs.Bitmap(loader.getResult('token'+n));
		centerReg($.token['token'+n]);
		$.token['token'+n].y = -100;
		gameContainer.addChild($.token['token'+n]);
	}
	
	overlayResultBg = new createjs.Shape();	
	overlayResultBg.graphics.beginFill('#ffffff').drawRect(0,canvasH/100 * 20, canvasW, canvasH);
	overlayResultBg.alpha = .9;
	
	result = new createjs.Bitmap(loader.getResult('result'));
	buttonReplay = new createjs.Bitmap(loader.getResult('buttonReplay'));
	centerReg(buttonReplay);
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100*11;
	
	txtScore = new createjs.Text();
	txtScore.font = "100px built_titlingbold";
	txtScore.color = "#000";
	txtScore.text = 0;
	txtScore.textAlign = "center";
	txtScore.textBaseline='alphabetic';
	txtScore.x = canvasW/2;
	txtScore.y = canvasH/100 * 61;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	//buttonFacebook.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(354,622,106,119));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	//buttonTwitter.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(463,622,106,119));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	//buttonWhatsapp.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(572,622,106,119));
	
	centerReg(buttonFacebook);
	centerReg(buttonTwitter);
	centerReg(buttonWhatsapp);
	
	buttonFacebook.x = canvasW/100 * 40;
	buttonTwitter.x = canvasW/2;
	buttonWhatsapp.x = canvasW/100 * 61;
	buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH/100 * 88;
	
	
	confirmContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonMenu = new createjs.Bitmap(loader.getResult('buttonMenu'));
	centerReg(buttonMenu)
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonMenu)
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer.addChild(buttonFullscreen, buttonMenu, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	centerReg(itemExit);
	itemExit.x = canvasW/2;
	itemExit.y = canvasH/2;
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	createHitarea(buttonConfirm)
	buttonConfirm.x = canvasW/100* 35;
	buttonConfirm.y = canvasH/100 * 63;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	createHitarea(buttonCancel)
	buttonCancel.x = canvasW/100 * 65;
	buttonCancel.y = canvasH/100 * 63;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "50px built_titlingbold";
	confirmMessageTxt.lineHeight = 65;
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *40;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;
	
	mainContainer.addChild(buttonStart);
	boardHighlightContainer.addChild(board);
	betContainer.addChild(overlayBetBg, overlayBet, buttonMinus, buttonPlus, buttonBet, txtBetNumber);
	gameContainer.addChild(diceAnimate1, diceAnimate2, diceAnimate3, tokenContainer, historyContainer, betContainer, buttonRollDisabled, buttonRoll, buttonHistory);
	resultContainer.addChild(overlayResultBg, result, buttonReplay, txtScore);
	if(shareEnable){
		resultContainer.addChild(buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	canvasContainer.addChild(bg, boardAreaContainer, boardHighlightContainer, mainContainer, gameContainer, resultContainer, txtCredit, txtPaid, txtWin, txtTime, confirmContainer, optionsContainer, buttonSettings);
	stage.addChild(canvasContainer);
	
	canvasContainer.alpha = 0;
	$(canvasContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 60;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);

			buttonMenu.x = buttonSettings.x;
			buttonMenu.y = buttonSettings.y + (distanceNum*3)
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);

			buttonMenu.x = buttonSettings.x;
			buttonMenu.y = buttonSettings.y + (distanceNum*3)

			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*4);
		}
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	//bgResize.graphics.clear();
	//bgResize.graphics.beginFill('#ff0000').drawRect(0,0,windowW,windowH);
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}