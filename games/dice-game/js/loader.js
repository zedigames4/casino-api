////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/board.png', id:'board'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_roll.png', id:'buttonRoll'},
			{src:'assets/button_roll_disabled.png', id:'buttonRollDisabled'},
			{src:'assets/button_history.png', id:'buttonHistory'},
			{src:'assets/overlayHistory.png', id:'overlayHistory'},
			{src:'assets/dice_Spritesheet6x1.png', id:'dice'},
			{src:'assets/overlayBet.png', id:'overlayBet'},
			{src:'assets/button_bet.png', id:'buttonBet'},
			{src:'assets/button_plus.png', id:'buttonPlus'},
			{src:'assets/button_minus.png', id:'buttonMinus'},
			{src:'assets/button_replay.png', id:'buttonReplay'},
			{src:'assets/result.png', id:'result'},
			
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			  {src:'assets/button_twitter.png', id:'buttonTwitter'},
			  {src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			  
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
				{src:'assets/button_cancel.png', id:'buttonCancel'},
				{src:'assets/item_exit.png', id:'itemExit'},
				{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
				{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
				{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
				{src:'assets/button_exit.png', id:'buttonExit'},
				{src:'assets/button_settings.png', id:'buttonSettings'},
				{src:'../assets/images/icons8-menu-64.png', id:'buttonMenu'},
				];

	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		addMemberRewardAssets();
	}
	
	sortOnObject(token_arr, 'credit');
	
	for(n=0;n<token_arr.length;n++){
		manifest.push({src:token_arr[n].src, id:'token'+n})
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/button.ogg', id:'soundButton'})
		manifest.push({src:'assets/sounds/chips.ogg', id:'soundChips'})
		manifest.push({src:'assets/sounds/chips_collect.ogg', id:'soundChipsCollect'})
		manifest.push({src:'assets/sounds/chips_place.ogg', id:'soundChipsPlace'})
		manifest.push({src:'assets/sounds/dice.ogg', id:'soundDice'})
		manifest.push({src:'assets/sounds/music.ogg', id:'music'})
		manifest.push({src:'assets/sounds/win1.ogg', id:'soundWin1'})
		manifest.push({src:'assets/sounds/win2.ogg', id:'soundWin2'})
		manifest.push({src:'assets/sounds/start.ogg', id:'soundStart'})
		manifest.push({src:'assets/sounds/result.ogg', id:'soundResult'})
		manifest.push({src:'assets/sounds/tone.ogg', id:'soundTone'})
		manifest.push({src:'assets/sounds/tone2.ogg', id:'soundTone2'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}