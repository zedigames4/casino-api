function CShowMenuPanel(){

    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;

    var _oHitArea;

    var _oLink;
    var _oListener;

    var _pStartPosExit;

    var _oContainer;

    function getButtons (){
        let main_div = document.createElement('div');
        main_div.style.color = 'red'

        let text = document.createTextNode("Text here");
        console.log("message " , text);
        main_div.appendChild(text);

        return new createjs.DOMElement(main_div)
    }
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(_oBg);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        _oContainer.addChild(_oHitArea);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: 815 , y: 284};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);

        _oMsgText = new createjs.Text(TEXT_NAVIGATE, "40px " + PRIMARY_FONT, "#fff");
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = CANVAS_HEIGHT/2 - 54;
        _oContainer.addChild(_oMsgText);


        let main_div = getButtons()
        _oContainer.setChildIndex(main_div, _oContainer.getNumChildren()-1)


    };


    this.unload = function(){
        _oHitArea.off("click", _oListener);

        _oButExit.unload();
        _oButExit = null;

        s_oStage.removeChild(_oContainer);

        s_oMenu.exitFromMenu();
    };

    this._onLogoButRelease = function(){
        window.open("https://www.google.com","_blank");
    };

    this._init();


};


