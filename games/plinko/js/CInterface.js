function CInterface(oBgContainer){
    var _oAudioToggle;
    var _oMenuBtn;
    var _oButExit;
    var _oButFullscreen;
    var _oGUIExpandible;
    
    var _iCurHandPos;
    
    var _oBetNum;
    var _oButPlus;
    var _oButMin;
    var _oCreditNum;
    var _oHandAnim;

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;

    var _pStartPosMenu;
    var _oMenuButton;
    
    this._init = function(oBgContainer){      
        
        var oSprite = s_oSpriteLibrary.getSprite('hand_anim');
        var iWidth = oSprite.width/6;
        var iHeight = oSprite.height/4;
        var oData = {   framerate: 20,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        "frames": [
                                [1, 1, 256, 230, 0, 0, 0],
                                [259, 1, 256, 230, 0, 0, 0],
                                [517, 1, 256, 230, 0, 0, 0],
                                [775, 1, 256, 230, 0, 0, 0],
                                [1033, 1, 256, 230, 0, 0, 0],
                                [1291, 1, 256, 230, 0, 0, 0],
                                [1, 233, 256, 230, 0, 0, 0],
                                [259, 233, 256, 230, 0, 0, 0],
                                [517, 233, 256, 230, 0, 0, 0],
                                [775, 233, 256, 230, 0, 0, 0],
                                [1033, 233, 256, 230, 0, 0, 0],
                                [1291, 233, 256, 230, 0, 0, 0],
                                [1, 465, 256, 230, 0, 0, 0],
                                [259, 465, 256, 230, 0, 0, 0],
                                [517, 465, 256, 230, 0, 0, 0],
                                [775, 465, 256, 230, 0, 0, 0],
                                [1033, 465, 256, 230, 0, 0, 0],
                                [1291, 465, 256, 230, 0, 0, 0],
                                [1, 697, 256, 230, 0, 0, 0],
                                [259, 697, 256, 230, 0, 0, 0],
                                [517, 697, 256, 230, 0, 0, 0],
                                [775, 697, 256, 230, 0, 0, 0]
                            ],
                        animations:{"idle": [0,21]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _iCurHandPos = 0;
        _oHandAnim = createSprite(oSpriteSheet, "idle",iWidth/2,iHeight/2,iWidth,iHeight);
        var oPos = s_oGame.getSlotPosition(_iCurHandPos);
        _oHandAnim.x = oPos.x;
        _oHandAnim.y = oPos.y;
        _oHandAnim.regX = iWidth/2 - 30;
        _oHandAnim.regY = iHeight/2;
        _oHandAnim.on("animationend", this._moveHand);
        s_oStage.addChild(_oHandAnim);
            
            
        var oExitX;        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = _pStartPosExit.x - (oSprite.width) - 10;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
            
            oExitX = _pStartPosAudio.x - (oSprite.width/2) - 10;
        }
        /*menu icon*/
        try {
            var oSprite = s_oSpriteLibrary.getSprite('menu_icon');
            _pStartPosMenu = {x:CANVAS_WIDTH - oSprite.width/2 -15 ,y:(oSprite.height / 2) + 130};

            _oMenuButton = new CGfxButton(_pStartPosMenu.x, _pStartPosMenu.y, oSprite,s_oStage);
            _oMenuButton.addEventListener(ON_MOUSE_UP, this._onShowMenu, this);

            oExitX = _pStartPosMenu.x - (oSprite.width/2) - 10;
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
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x:oExitX,y:oSprite.height/2+10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }
        
        //////////////////////// BET CONTROLLER /////////////////////////
        var oControllerContainer = new createjs.Container();
        oControllerContainer.x = 854;
        oControllerContainer.y = 1650;
        oBgContainer.addChild(oControllerContainer);

        var oSprite = s_oSpriteLibrary.getSprite('bet_panel');
        var oBetBg = createBitmap(oSprite);
        oBetBg.regX = oSprite.width/2;
        oBetBg.regY = oSprite.height/2;
        oControllerContainer.addChild(oBetBg);

        var iX = oBetBg.x;
        var iY = oBetBg.y;
        var iWidth = oSprite.width - 100;
        var iHeight = 36;
        _oBetNum = new CTLText(oControllerContainer, 
                    iX - iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    iHeight, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    sprintf(TEXT_CURRENCY, START_BET.toFixed(2)),
                    true, true, false,
                    false );

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        _oButPlus = new CTextButton(160, 0, oSprite,TEXT_PLUS,PRIMARY_FONT,"#0083ea",80, false, oControllerContainer);
        _oButPlus.enable();
        _oButPlus.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
        _oButPlus.setTextPosition(1,26);
        _oButPlus.hideShadow();

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        _oButMin = new CTextButton(-160,0, oSprite,TEXT_MIN,PRIMARY_FONT,"#0083ea",80, false, oControllerContainer);
        _oButMin.enable();
        _oButMin.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
        _oButMin.setTextPosition(2,26);
        _oButMin.hideShadow();
        
        ///////////////////////CREDITS PANEL///////////////////////
        var oSprite = s_oSpriteLibrary.getSprite('credits_panel');
        var oCreditsBg = createBitmap(oSprite);
        oCreditsBg.regX = oSprite.width/2;
        oCreditsBg.regY = oSprite.height/2;
        oCreditsBg.x = 332;
        oCreditsBg.y = oControllerContainer.y;
        oBgContainer.addChild(oCreditsBg);
        
        var iX = oCreditsBg.x+10;
        var iY = oCreditsBg.y;
        var iWidth = oSprite.width - 90;
        var iHeight = 36;
        _oCreditNum = new CTLText(oBgContainer, 
                    iX - iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    iHeight, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    sprintf(TEXT_CURRENCY, START_CREDIT.toFixed(2)),
                    true, true, false,
                    false );

        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);
        _oGUIExpandible.addButton(_oAudioToggle);
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oGUIExpandible.addButton(_oButFullscreen);
        }
        _oGUIExpandible.addButton(_oMenuButton);
        
        
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    function toggleModal (){
        document.body.classList.toggle("open")
    }
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }        

        _oButMin.unload();
        _oButPlus.unload();

        _oGUIExpandible.unload();

        s_oInterface = null;
        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oGUIExpandible.refreshPos(iNewX,iNewY);
    };

    this.refreshBet = function(iValue){
        _oBetNum.refreshText( sprintf(TEXT_CURRENCY, iValue.toFixed(2)) );
    };
    
    this.refreshCredit = function(iValue){        
        _oCreditNum.refreshText( sprintf(TEXT_CURRENCY, iValue.toFixed(2)) );
    };
   
    this._onButPlusRelease = function(){
        s_oGame.modifyBonus("plus");
    };

    this._onButMinRelease = function(){
        s_oGame.modifyBonus("min");
    };
    
    this.hideControls = function(){
        _oButMin.setVisible(false);
        _oButPlus.setVisible(false);
        
        this.setHelpVisible(false);
    };
    
    this.showControls = function(){
        _oButMin.setVisible(true);
        _oButPlus.setVisible(true);
        
        this.setHelpVisible(true);
    };
    
    this.setHelpVisible = function(bVal){
       _oHandAnim.visible = bVal;
       if(bVal){
           _oHandAnim.gotoAndPlay("idle");
       }
    };
    
    this._moveHand = function(){
        _iCurHandPos++;
        if(_iCurHandPos === NUM_INSERT_TUBE){
            _iCurHandPos = 0;
        }
        var oPos = s_oGame.getSlotPosition(_iCurHandPos);
        _oHandAnim.x = oPos.x;
        _oHandAnim.y = oPos.y;

    };  
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        new CAreYouSurePanel(s_oGame.onExit);
    };
    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
    this._onShowMenu = function (){
        // _oShowMenuPanel = new CShowMenuPanel();
        toggleModal()
    }
        
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init(oBgContainer);
    
    return this;
}

var s_oInterface = null;