function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    var _oMenuButton;
    var _oCreditsBut;
    var _oButFullscreen;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosCredits;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosMenu;

    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('logo_menu');
        var oLogo = createBitmap(oSprite);
        oLogo.regX = oSprite.width/2;
        oLogo.regY = oSprite.height/2;
        oLogo.x = CANVAS_WIDTH/2
        oLogo.y = 500;
        s_oStage.addChild(oLogo);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -540,oSprite,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        _oButPlay.pulseAnimation();
     
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        var pFirstPos = {x:oSprite.width/2 + 10,y:oSprite.height/2 + 10};
        var pSecondPos = {x:pFirstPos.x + oSprite.width + 10,y:oSprite.height/2 + 10};
        _pStartPosCredits = {x: pFirstPos.x, y: pFirstPos.y};
        if(ENABLE_CREDITS){
            _oCreditsBut = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite, s_oStage);
            _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        }
     
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width/4)- 10, y: (oSprite.height/2) + 10};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        /*menu icon*/
        try {
            var oSprite = s_oSpriteLibrary.getSprite('menu_icon');
            _pStartPosMenu = {x:CANVAS_WIDTH - oSprite.width/2 -15 ,y:(oSprite.height / 2) + 130};

            _oMenuButton = new CGfxButton(_pStartPosMenu.x, _pStartPosMenu.y, oSprite,s_oStage);
            _oMenuButton.addEventListener(ON_MOUSE_UP, this._onShowMenu, this);
        }catch (e) {
            console.error(e)
        }
        
        /*end of menu icon*/

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled){
            
            if(ENABLE_CREDITS){
                _pStartPosFullscreen = pSecondPos;
            } else {
                _pStartPosFullscreen = pFirstPos;
            }
            
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            //_pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:(oSprite.height/2) + 10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    function toggleModal (){
        document.body.classList.toggle("open")
    }
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        _oFade.visible = false;
        
        if(ENABLE_CREDITS){
            _oCreditsBut.unload();
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.unload();
        }
        
        s_oStage.removeAllChildren();
        _oBg = null;
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(ENABLE_CREDITS){
            _oCreditsBut.setPosition(_pStartPosCredits.x + iNewX,iNewY + _pStartPosCredits.y);
        }
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
        _oMenuButton.setPosition(_pStartPosMenu.x - iNewX, iNewY+_pStartPosMenu.y)

    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onCreditsBut = function(){
        new CCreditsPanel();
    };
    this._onShowMenu = function (){
        // _oShowMenuPanel = new CShowMenuPanel();
        toggleModal()
    }
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
        
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this._onButPlayRelease = function(){
        
        this.unload();

        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
        
    };
	
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;