////////////////////////////////////////////////////////////
// GAME v1.8
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var backgroundColour = "#fff"; //background colour
var textCredit = "CREDIT : [NUMBER]"; //credit text display
var textPaid = "PAID : [NUMBER]"; //paid text display
var textWin = "WIN : [NUMBER]"; //win text display

var gameCredit = 500; //game credit
var gameTimer = 300000; //game timer

var betAreaColour = "#A7CD2C"; //bet area colour
var betAreaHighlightColour = "#F7A21B"; //bet area highlight colour

//bet options
var area_arr = [{x:25, y:172, width:242, height:221, win:1, type:["BETWEEN[11,17]"]},
				{x:754, y:172, width:242, height:221, win:1, type:["BETWEEN[4,10]"]},
				
				{x:269, y:171, width:81, height:65, win:150, type:["MATCH[6,6,6]"]},
				{x:350, y:171, width:81, height:65, win:150, type:["MATCH[5,5,5]"]},
				{x:430, y:171, width:81, height:65, win:150, type:["MATCH[4,4,4]"]},
				{x:511, y:171, width:81, height:65, win:150, type:["MATCH[3,3,3]"]},
				{x:592, y:171, width:81, height:65, win:150, type:["MATCH[2,2,2]"]},
				{x:673, y:171, width:81, height:65, win:150, type:["MATCH[1,1,1]"]},
				
				{x:270, y:275, width:53, height:78, win:8, type:["MATCH[2,2]"]},
				{x:323, y:275, width:53, height:78, win:8, type:["MATCH[3,3]"]},
				{x:376, y:275, width:53, height:78, win:8, type:["MATCH[5,5]"]},
				{x:429, y:275, width:164, height:117, win:24, type:["MATCH[1,1,1]","MATCH[2,2,2]","MATCH[3,3,3]","MATCH[4,4,4]","MATCH[5,5,5]","MATCH[6,6,6]"]},
				{x:594, y:275, width:53, height:78, win:8, type:["MATCH[4,4]"]},
				{x:648, y:275, width:53, height:78, win:8, type:["MATCH[1,1]"]},
				{x:701, y:275, width:53, height:78, win:8, type:["MATCH[6,6]"]},
				
				{x:26, y:395, width:69, height:107, win:50, type:["TOTAL[17]"]},
				{x:95, y:395, width:69, height:107, win:18, type:["TOTAL[16]"]},
				{x:165, y:395, width:69, height:107, win:14, type:["TOTAL[15]"]},
				{x:234, y:395, width:69, height:107, win:12, type:["TOTAL[14]"]},
				{x:304, y:395, width:69, height:107, win:8, type:["TOTAL[13]"]},
				{x:373, y:395, width:69, height:107, win:6, type:["TOTAL[12]"]},
				{x:443, y:395, width:69, height:107, win:6, type:["TOTAL[11]"]},
				{x:512, y:395, width:69, height:107, win:6, type:["TOTAL[10]"]},
				{x:581, y:395, width:69, height:107, win:6, type:["TOTAL[9]"]},
				{x:651, y:395, width:69, height:107, win:6, type:["TOTAL[8]"]},
				{x:720, y:395, width:69, height:107, win:12, type:["TOTAL[7]"]},
				{x:790, y:395, width:69, height:107, win:14, type:["TOTAL[6]"]},
				{x:860, y:395, width:69, height:107, win:18, type:["TOTAL[5]"]},
				{x:929, y:395, width:69, height:107, win:50, type:["TOTAL[4]"]},
				
				{x:87, y:501, width:61, height:107, win:5, type:["MATCH[1,2]"]},
				{x:147, y:501, width:61, height:107, win:5, type:["MATCH[2,4]"]},
				{x:208, y:501, width:61, height:107, win:5, type:["MATCH[1,4]"]},
				{x:269, y:501, width:61, height:107, win:5, type:["MATCH[2,3]"]},
				{x:330, y:501, width:61, height:107, win:5, type:["MATCH[3,4]"]},
				{x:390, y:501, width:61, height:107, win:5, type:["MATCH[2,5]"]},
				{x:451, y:501, width:61, height:107, win:5, type:["MATCH[3,5]"]},
				{x:512, y:501, width:61, height:107, win:5, type:["MATCH[2,6]"]},
				{x:572, y:501, width:61, height:107, win:5, type:["MATCH[4,5]"]},
				{x:634, y:501, width:61, height:107, win:5, type:["MATCH[3,6]"]},
				{x:694, y:501, width:61, height:107, win:5, type:["MATCH[1,5]"]},
				{x:755, y:501, width:61, height:107, win:5, type:["MATCH[1,6]"]},
				{x:816, y:501, width:61, height:107, win:5, type:["MATCH[4,6]"]},
				{x:877, y:501, width:61, height:107, win:5, type:["MATCH[5,6]"]},
				{x:937, y:501, width:61, height:107, win:5, type:["MATCH[1,3]"]},
				
				
				{x:26, y:609, width:162, height:132, win:1, type:["MATCH[6]"]},
				{x:188, y:609, width:162, height:132, win:1, type:["MATCH[5]"]},
				{x:350, y:609, width:162, height:132, win:1, type:["MATCH[4]"]},
				{x:512, y:609, width:162, height:132, win:1, type:["MATCH[3]"]},
				{x:674, y:609, width:162, height:132, win:1, type:["MATCH[2]"]},
				{x:836, y:609, width:162, height:132, win:1, type:["MATCH[1]"]}
				];

//token list	
var token_arr = [{src:"assets/token_10.png", credit:10},
				{src:"assets/token_50.png", credit:50},
				{src:"assets/token_100.png", credit:100}];

var exitMessage = "Are you sure you want\nto quit the game?"; //quit game message

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = "Highscore on Dice Game is [SCORE]";//social share score title
var shareMessage = "[SCORE] is mine new highscore on Dice Game! Try it now!"; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
 
var playerData = {credit:gameCredit, creditSum:gameCredit, timer:0, paid:0, win:0, bet:0, newBet:0, slot:[]};
var gameData = {dice:[1,1,1], rollInterval:null, roll:false, betNumber:0, betNumberPlus:0, slotID:0, history:false};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	buttonHistory.cursor = "pointer";
	buttonHistory.addEventListener("click", function(evt) {
		playSound('soundButton');
		toggleHistory();
	});
	
	buttonRoll.cursor = "pointer";
	buttonRoll.addEventListener("click", function(evt) {
		playSound('soundDice');
		toggleRollDiceAnimation(true);
	});
	
	buttonMinus.cursor = "pointer";
	buttonMinus.addEventListener("mousedown", function(evt) {
		playSound('soundChips');
		toggleBetNumber('minus');
	});
	buttonMinus.addEventListener("pressup", function(evt) {
		toggleBetNumber();
	});
	
	buttonPlus.cursor = "pointer";
	buttonPlus.addEventListener("mousedown", function(evt) {
		playSound('soundChips');
		toggleBetNumber('plus');
	});
	buttonPlus.addEventListener("pressup", function(evt) {
		toggleBetNumber();
	});
	
	buttonBet.cursor = "pointer";
	buttonBet.addEventListener("click", function(evt) {
		toggleBetOption(false);
		setBetNumber();
	});
	
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	//confirm
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(false);
		stopGame(true);
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(false);
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	//options
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	try {
		buttonMenu.cursor = "pointer";
		buttonMenu.addEventListener('click', ()=> {
			toggleModal()
		})
	}catch (e){console.error(e)}
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		toggleConfirm(true);
		toggleOption();
	});
	
	buildBetAread();
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		playerData.credit = playerData.creditSum = 0;
		updateBetNumber();
	}
}

function buildBetAread(){
	for(n=0;n<area_arr.length;n++){
		$.areaBet['highlight'+n] = new createjs.Shape();	
		$.areaBet['highlight'+n].graphics.beginFill(betAreaHighlightColour).drawRect(area_arr[n].x,area_arr[n].y,area_arr[n].width,area_arr[n].height);
		$.areaBet['highlight'+n].alpha = 0;
		
		$.areaBet['area'+n] = new createjs.Shape();	
		$.areaBet['area'+n].graphics.beginFill(betAreaColour).drawRect(area_arr[n].x,area_arr[n].y,area_arr[n].width,area_arr[n].height);
		$.areaBet['area'+n].alpha = 0;
		
		$.areaBet['button'+n] = new createjs.Shape();
		$.areaBet['button'+n].id = n;
		$.areaBet['button'+n].cursor = "pointer";
		$.areaBet['button'+n].addEventListener("click", function(evt) {
			playSound('soundButton');
			
			//memberpayment
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				if(!checkMemberGameType()){
					goMemberPage('user');
				}else{
					toggleBetOption(true, evt.target.id);
				}
			}else{
				toggleBetOption(true, evt.target.id);
			}
		});
		
		$.areaBet['button'+n].hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(area_arr[n].x,area_arr[n].y,area_arr[n].width,area_arr[n].height));
		
		boardAreaContainer.addChild($.areaBet['area'+n], $.areaBet['highlight'+n]);
		boardHighlightContainer.addChild($.areaBet['button'+n]);
		playerData.slot.push({amount:0, tokens:0, update:false});
	}
}

function toggleBetButtons(con){
	for(n=0;n<area_arr.length;n++){
		$.areaBet['button'+n].visible = con;	
	}
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	toggleBetButtons(false);
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			updateStat();
			toggleRandomAnimation(true);
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startAllAnimation();
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			txtScore.text = playerData.win;
			stopGame();
			saveGame(playerData.win);
			playSound('soundResult');
		break;
	}
	
	targetContainer.visible=true;
	resizeCanvas();
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	playerData.credit = gameCredit;
	playerData.creditSum = gameCredit;
	playerData.paid = 0;
	playerData.win = 0;
	playerData.bet = 0;
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		playerData.credit = playerData.creditSum = memberData.point;
		if(!checkMemberGameType()){
			goMemberPage('user');
		}
	}
	
	toggleBetNumber();
	toggleBetOption(false);
	updateStat();
	clearHistory();
	toggleRollDiceButton('notready');
	toggleGameTimer(true);
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
	gameData.rollInterval = null;
	toggleGameTimer(false);
	resetBoard();
}

 /*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

 /*!
 * 
 * BET AREA SINGLE ANIMATION - This is the function that runs to animate bet area
 * 
 */
var animationSpeed = .3;
function toggleRandomAnimation(con, num){
	if(con){
		var randomBetNum = Math.floor(Math.random()*area_arr.length);
		TweenMax.to($.areaBet['area'+randomBetNum], animationSpeed, {alpha:1, overwrite:true, onComplete:toggleRandomAnimation, onCompleteParams:[false,randomBetNum]});
	}else{
		TweenMax.to($.areaBet['area'+num], animationSpeed, {alpha:0, overwrite:true, onComplete:toggleRandomAnimation, onCompleteParams:[true]});
	}
}

function killRandomAnimation(){
	for(n=0;n<area_arr.length;n++){
		TweenMax.killTweensOf($.areaBet['area'+n]);
		$.areaBet['area'+n].alpha = 0;
	}	
}

 /*!
 * 
 * BET AREA ALL ANIMATION - This is the function that runs to animate bet area
 * 
 */
function startAllAnimation(){
	killRandomAnimation();
	animationCount = 0;
	for(n=0;n<area_arr.length;n++){
		fadeArea(n, true);
	}
	
	setTimeout(function(){ playSound('soundTone'); }, 500);
}

var animationSpeedAll = .5;
var animationCount = 0;
function fadeArea(n, con){
	if(con){
		TweenMax.to($.areaBet['area'+n], animationSpeedAll, {delay:.5, alpha:1, overwrite:true, onComplete:fadeArea, onCompleteParams:[n,false]});	
	}else{
		TweenMax.to($.areaBet['area'+n], animationSpeedAll, {alpha:0, overwrite:true, onComplete:returnAnimation});
	}
}

function returnAnimation(){
	animationCount++;
	if(animationCount > area_arr.length-1){
		toggleBetButtons(true);
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval = null;
var gameTimerUpdate = false;
var nowDate;
var beforeDate;
var accumulateTimer = 0;
var elapsedTime = 0;

function toggleGameTimer(con){
	playerData.timer = 0;
	updateTimer();
		
	if(con){
		accumulateTimer = 0;
		elapsedTime = 0;
		beforeDate = new Date();
	}
	gameTimerUpdate = con;
}

function toggleGameTimerPause(con){
	if(con){
		gameTimerUpdate = false;
		accumulateTimer += elapsedTime;
	}else{
		gameTimerUpdate = true;
		beforeDate = new Date();	
	}
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(){
	if(gameTimerUpdate){
		nowDate = new Date();
		elapsedTime = (nowDate.getTime() - beforeDate.getTime());
		playerData.timer = (Number(gameTimer) - (elapsedTime+accumulateTimer));
		
		updateTimer();
		if(playerData.timer <= 0){
			goPage('result');
		}
	}
	
	if(gameData.roll){
		randomDice(diceAnimate1);
		randomDice(diceAnimate2);
		randomDice(diceAnimate3);
	}
}

 /*!
 * 
 * UPDATE GAME TIMER - This is the function that runs to update game timer
 * 
 */
function updateTimer(){
	txtTime.text = millisecondsToTime(playerData.timer);	
}


 /*!
 * 
 * TOGGLE ROLL DICE BUTTON - This is the function that runs to toggle roll button
 * 
 */
function toggleRollDiceButton(con){
	buttonRollDisabled.visible = buttonRoll.visible = false;
	
	if(con == 'ready'){
		buttonRoll.visible = true;
	}else if(con == 'notready'){
		//if(history_arr.length == 0)
			buttonRollDisabled.visible = true;
	}
}

 /*!
 * 
 * TOGGLE ROLL DICE ANIMATION - This is the function that runs to toggle roll animation
 * 
 */
function toggleRollDiceAnimation(con){
	toggleRollDiceButton();
	toggleBetOption(false);
	
	if(con){
		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			updateUserPoint();
		}
		
		gameData.roll = true;
		gameData.rollInterval = setInterval(function(){
			toggleRollDiceAnimation(false);
			toggleBetButtons(false);
			checkBetWinAnimation();
		}, 1000);
	}else{
		gameData.roll = false;
		clearInterval(gameData.rollInterval);
		gameData.rollInterval = null;
	}
}

function randomDice(obj){
	var diceNum = randomIntFromInterval(1,6);
	obj.gotoAndStop(diceNum);
}

 /*!
 * 
 * TOGGLE BET OPTION - This is the function that runs to toggle bet option
 * 
 */
var betNumberInterval = null;
var betNumberTimer = 0;
var betNumberTimerMax = 300;
var betNumberTimerMin = 10;
var thisSlotBet = 0;

function toggleBetOption(con, id){
	betContainer.visible = con;
	
	if(con){
		toggleBetButtons(false);
		gameData.betNumberPlus = 0;
		gameData.betNumber = 0;
	
		gameData.slotID = id;
		if(playerData.slot[id].amount != 0){
			gameData.betNumber = playerData.slot[id].amount;
			playerData.newBet = playerData.bet - gameData.betNumber;
			playerData.bet = playerData.newBet;
		}
		updateBetNumber();
	}else{
		toggleBetButtons(true);	
	}
}

 /*!
 * 
 * SET BET NUMBER - This is the function that runs to set bet number
 * 
 */
function setBetNumber(){
	var updateBet = false;
	var readyBet = false;
	
	playSound('soundChipsPlace');
	if(playerData.slot[gameData.slotID].amount != gameData.betNumber){
		playerData.slot[gameData.slotID].amount = gameData.betNumber;
		updateBet = true;
	}
	//tokenContainer.removeAllChildren();
	
	for(n=0;n<playerData.slot.length;n++){
		$.areaBet['area'+n].alpha = 0;
		if(playerData.slot[n].amount > 0){
			$.areaBet['area'+n].alpha = 1;
			readyBet = true;
			
			if(gameData.slotID == n){
				if(updateBet){
					placeToken(n, playerData.slot[n].amount);
				}
			}
		}
	}
	
	playerData.bet = playerData.newBet;
	playerData.creditSum = playerData.credit - playerData.bet;
	updateStat();
	
	if(readyBet){
		toggleRollDiceButton('ready');	
	}else {
		toggleRollDiceButton('notready');	
	}
}


 /*!
 * 
 * PLACE TOKEN - This is the function that runs place token
 * 
 */
var totalTokenNum = 0;
function placeToken(slot, betNumber, anime){
	var tokenTotal_arr = [];
	var checkBetNumber = betNumber;
	
	//remove old tokens
	for(t=0;t<playerData.slot[slot].tokens.length;t++){
		tokenContainer.removeChild($.token[slot+'-'+t]);
	}
	playerData.slot[slot].tokens = 0;
	
	for(t=token_arr.length-1;t>=0;t--){
		if(checkBetNumber >= token_arr[t].credit){
			tokenTotal_arr.push(t);
			checkBetNumber -= token_arr[t].credit;
			t++;
		}
	}
	
	var playSoundOnce = false;
	for(t=0;t<tokenTotal_arr.length;t++){
		playerData.slot[slot].tokens++;
		
		var rangeX = area_arr[slot].width / 100 * 10;
		var rangeY = area_arr[slot].height / 100 * 10;
		var randomX = Math.random()*rangeX-(rangeX/2);
		var randomY = Math.random()*rangeX-(rangeX/2);
		$.token[slot+'-'+t] = $.token['token'+tokenTotal_arr[t]].clone();
		$.token[slot+'-'+t].x = area_arr[slot].x + (area_arr[slot].width/2) + randomX;
		$.token[slot+'-'+t].y = area_arr[slot].y + (area_arr[slot].height/2) + randomY;
		$.token[slot+'-'+t].slot = slot;
		
		tokenContainer.addChild($.token[slot+'-'+t]);
		
		if(anime){
			if(!playSoundOnce){
				playSoundOnce = true;
				setTimeout(function(){ playSound('soundChipsCollect'); }, 600);
			}
			TweenMax.from($.token[slot+'-'+t], .5, {delay:.6, x:canvasW/2, y:-100, overwrite:true});	
		}
		
		totalTokenNum++;
	}
}

 /*!
 * 
 * ADD/DEDUCT BET NUMBER - This is the function that runs to add or deduct bet number
 * 
 */
function toggleBetNumber(con){
	if(con == 'plus'){
		gameData.betNumberPlus = token_arr[0].credit;
	}else if(con == 'minus'){
		gameData.betNumberPlus = -(token_arr[0].credit);
	}else{
		gameData.betNumberPlus = 0;	
	}
	
	if(con != undefined){
		betNumberTimer = betNumberTimerMax;
		loopBetNumber();
	}else{
		clearInterval(betNumberInterval);	
		betNumberInterval = null;
	}
}

function loopBetNumber(){
	clearInterval(betNumberInterval);
	betNumberInterval = setInterval(loopBetNumber, betNumberTimer);
	betNumberTimer-=100;
	betNumberTimer=betNumberTimer<betNumberTimerMin?betNumberTimerMin:betNumberTimer;
	
	updateBetNumber();
}

function updateBetNumber(){
	var availableCredit = playerData.credit - playerData.bet;
	gameData.betNumber += gameData.betNumberPlus;
	gameData.betNumber = gameData.betNumber <= 0 ? 0 : gameData.betNumber;
	gameData.betNumber = gameData.betNumber >= availableCredit ? availableCredit : gameData.betNumber;
	txtBetNumber.text = gameData.betNumber;
	
	playerData.newBet = playerData.bet + gameData.betNumber;
	playerData.creditSum = playerData.credit - playerData.newBet;
	
	updateStat();
}

 /*!
 * 
 * UPDATE STAT - This is the function that runs to update stat
 * 
 */
 
function updateStat(){
	txtCredit.text = textCredit.replace('[NUMBER]', playerData.creditSum);	
	txtPaid.text = textPaid.replace('[NUMBER]', playerData.paid);
	txtWin.text = textWin.replace('[NUMBER]', playerData.win);
}

 /*!
 * 
 * CHECK BET WIN - This is the function that runs to check bet win
 * 
 */
var playWinSound = false;
var winslot_arr = [];
function checkBetWinAnimation(){
	gameData.dice[0] = Number(diceAnimate1.currentFrame + 1);
	gameData.dice[1] = Number(diceAnimate2.currentFrame + 1);
	gameData.dice[2] = Number(diceAnimate3.currentFrame + 1);
	
	var paid = 0;
	var win = 0;
	var winRemain = 0;
	animationCompleteReady = false;
	animateChipsOnce = false;
	
	playWinSound = false;
	winslot_arr = [];
	for(n=0;n<playerData.slot.length;n++){
		if(playerData.slot[n].amount > 0){
			paid += playerData.slot[n].amount;
			if(checkWinType(area_arr[n].type)){
				winRemain += playerData.slot[n].amount;
				win += playerData.slot[n].amount * area_arr[n].win;
				
				winslot_arr.push({slot:n, amount:playerData.slot[n].amount * area_arr[n].win});
				playWinSound = true;
			};
		}
		
		if(checkWinType(area_arr[n].type)){
			$.areaBet['highlight'+n].animateType = 0;
			animateWinArea($.areaBet['highlight'+n], n);
		}else{
			$.areaBet['highlight'+n].alpha = 0;	
		};
	}
	
	//memberpayment
	if(typeof memberData == 'undefined'){
		playerData.credit -= paid;	
	}
	
	playerData.credit += win;
	playerData.credit += winRemain;
	playerData.paid += paid;
	playerData.win += win;
	playerData.bet = 0;
	
	playerData.creditSum = playerData.credit - playerData.bet;
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		updateUserPoint();
	}
}

var animationCompleteReady = false;
var animateChipsOnce = false;
function animateWinArea(obj, n){
	var alphaNum = 0;
	var delayNum = 0;
	var tweenFunc = animateWinArea;
	
	if(obj.animateType == 0){
		alphaNum = 0;
		delayNum = .5;
	}if(obj.animateType == 1){
		alphaNum = 1;
		playSound('soundTone');
	}else if(obj.animateType == 2){
		alphaNum = 0;
	}else if(obj.animateType == 3){
		alphaNum = 1;
		playSound('soundTone');
	}else if(obj.animateType == 4){
		alphaNum = 1;
		delayNum = 2;
		tweenFunc = animateWinAreComplete;
		
		if(!animateChipsOnce){
			if(playWinSound){
				playSound('soundWin1');
			}
			
			animateChipsOnce = true;
			animateWinChips();
		}
	}
	
	obj.animateType++;
	TweenMax.to(obj, .3, {delay:delayNum, alpha:alphaNum, overwrite:true, onComplete:tweenFunc, onCompleteParams:[obj, n]});
}

function animateWinAreComplete(){
	if(!animationCompleteReady){
		if(winslot_arr.length > 0){
			playSound('soundChipsCollect');
		}
		animationCompleteReady = true;
		insertHistory();
		
		if(playerData.credit <= 0){
			playerData.creditSum = 0;
			goPage('result');
		}else{
			toggleBetButtons(true);	
		}
		updateStat();
	}
	resetBoard();
}

function animateWinChips(){
	var playSoundOnce = false;
	for(n=0;n<area_arr.length;n++){
		if(playerData.slot[n].amount > 0){
			var exist = false;
			for(w=0;w<winslot_arr.length;w++){
				if(winslot_arr[w].slot == n){
					exist = true;
				}
			}
			
			if(!exist){
				if(!playSoundOnce){
					playSoundOnce = true;
					playSound('soundChipsCollect');
				}
				for(t=0;t<playerData.slot[n].tokens;t++){
					TweenMax.to($.token[n+'-'+t], .5, {x:canvasW/2, y:-100, overwrite:true});
				}
			}
		}
	}
	
	for(w=0;w<winslot_arr.length;w++){
		placeToken(winslot_arr[w].slot, winslot_arr[w].amount, true);
	}
}

/*!
 * 
 * RESET BOARD - This is the function that runs to reset board
 * 
 */
function resetBoard(){
	playerData.bet = 0;
	tokenContainer.removeAllChildren();
	
	var readyBet = false;
	for(n=0;n<area_arr.length;n++){
		playerData.slot[n].amount = 0;
		playerData.slot[n].tokens = 0;
		
		TweenMax.killTweensOf($.areaBet['area'+n]);
		TweenMax.killTweensOf($.areaBet['highlight'+n]);
		
		$.areaBet['area'+n].alpha = 0;
		$.areaBet['highlight'+n].alpha = 0;
	}
}

/*!
 * 
 * CHECK WIN TYPE - This is the function that runs to check win type
 * 
 */
function checkWinType(type){
	var dice_arr = [];
	var match_arr = [];
	var totalNum = 0;
	var totalDiceNum = 0;
	
	for(d=0;d<gameData.dice.length;d++){
		dice_arr.push(gameData.dice[d]);
	}
	
	for(w=0;w<type.length;w++){
		if(type[w].substring(0,5) == 'MATCH'){
			match_arr = type[w].substring(6,type[w].length-1).split(',');
			
			var matchNum = 0;
			for(m=0;m<match_arr.length;m++){
				var matchDiceNum = dice_arr.indexOf(Number(match_arr[m]));
				if(matchDiceNum != -1){
					dice_arr.splice(matchDiceNum,1);
					matchNum++;	
				}
			}
			
			if(matchNum == match_arr.length){
				return true;	
			}
		}else if(type[w].substring(0,5) == 'TOTAL'){
			totalNum = Number(type[w].substring(6,type[w].length-1));
			totalDiceNum = Number(gameData.dice[0])+Number(gameData.dice[1])+Number(gameData.dice[2]);
			
			if(totalNum == totalDiceNum){
				return true;	
			}
		}else if(type[w].substring(0,7) == 'BETWEEN'){
			match_arr = type[w].substring(8,type[w].length-1).split(',');
			totalDiceNum = Number(gameData.dice[0])+Number(gameData.dice[1])+Number(gameData.dice[2]);
			
			if(totalDiceNum >= match_arr[0] && totalDiceNum <= match_arr[1]){
				return true;
			}
		}
	}
	
	return false;
}

/*!
 * 
 * TOGGLE HISTORY PANEL - This is the function that runs to toggle history panel
 * 
 */
function toggleHistory(){
	var moveX = 0;
	if(gameData.history){
		gameData.history = false;
		moveX = canvasW;
	}else{
		gameData.history = true;
		moveX = canvasW/100*76;
	}
	TweenMax.to(historyContainer, .3, {x:moveX, overwrite:true});
}

/*!
 * 
 * DICE HISTORY - This is the function that runs to insert/remove dice history list
 * 
 */
var history_arr = [];
function insertHistory(){
	if(history_arr.length >= 24){
		history_arr.splice(history_arr.length-3, 3);
	}
	
	history_arr.unshift(gameData.dice[2]);
	history_arr.unshift(gameData.dice[1]);
	history_arr.unshift(gameData.dice[0]);
	
	var startHistoryNum = (history_arr.length-1)-3;
	for(n=0;n<24;n++){
		$.historyDice[n].visible = false;
		if(n < history_arr.length){
			$.historyDice[n].gotoAndStop(Number(history_arr[n])-1);
			$.historyDice[n].visible = true;
		}
	}
	buttonHistory.visible=true;
}

function clearHistory(){
	buttonHistory.visible=false;
	history_arr = [];
	for(n=0;n<24;n++){
		$.historyDice[n].visible = false;
	}	
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
	  
	  if(seconds<10){
		seconds = '0'+seconds;  
	  }
	  
	  if(minutes<10){
		minutes = '0'+minutes;  
	  }
	  
	  return minutes +':'+ seconds;
}

/*!
 * 
 * CONFIRM - This is the function that runs to toggle confirm
 * 
 */
function toggleConfirm(con){
	confirmContainer.visible = con;
	toggleGameTimerPause(con);
	
	if(con){
		TweenMax.pauseAll(true, true);
	}else{
		TweenMax.resumeAll(true, true);
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */
function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", playerData.win);
	text = shareMessage.replace("[SCORE]", playerData.win);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}