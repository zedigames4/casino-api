////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////
var enableMobileSound = true;
var soundOn;

function playSound(target, loop){
	if(soundOn){
		var isLoop;
		if(loop){
			isLoop = -1;
			createjs.Sound.stop();
			var props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_NONE, loop: isLoop})
			musicLoop = createjs.Sound.play(target, props);
			if (musicLoop == null || musicLoop.playState == createjs.Sound.PLAY_FAILED) {
				return;
			}else{
				musicLoop.removeAllEventListeners();
				musicLoop.addEventListener ("complete", function(musicLoop) {
					
				});
			}
		}else{
			isLoop = 0;
			createjs.Sound.play(target);
		}
	}
}

function stopSound(){
	createjs.Sound.stop();
}

/*!
 * 
 * PLAY AUDIO - This is the function that runs to play description and answer audio
 * 
 */
$.sound = {};
function playKittySound(audio){
	if($.sound[audio]==null){
		$.sound[audio] = createjs.Sound.play(audio);
		$.sound[audio].removeAllEventListeners();
		$.sound[audio].addEventListener ("complete", function(event) {
			$.sound[audio] = null;
		});
	}
}

function updateKittySound(audio, volume){
	if($.sound[audio]!=null){
		$.sound[audio].volume = volume;
	}
}

/*!
 * 
 * TOGGLE MUTE - This is the function that runs to toggle mute
 * 
 */
function toggleMute(con){
	createjs.Sound.muted = con;	
}
