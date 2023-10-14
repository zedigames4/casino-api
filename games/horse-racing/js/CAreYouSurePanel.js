function CAreYouSurePanel(oParentContainer){
    var _oListener;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oListener = _oContainer.on("click",function(){});
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);
        
        var oText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-200, 290, 400, 100, 
                    50, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_ARE_YOU_SURE,
                    true, true, true,
                    false );



        
        _oButYes = new CGfxButton(CANVAS_WIDTH/2 + 180,500,s_oSpriteLibrary.getSprite("but_yes"),_oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP,this._onReleaseYes,this);
        
        _oButNo = new CGfxButton(CANVAS_WIDTH/2 - 180,500,s_oSpriteLibrary.getSprite("but_no"),_oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP,this._onReleaseNo,this);
    };
    
    this.unload = function(){
        _oContainer.off("click",_oListener);
        _oButNo.unload();
        _oButYes.unload();
    };
    
    this.show = function(){
        _oContainer.visible = true;
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({alpha: 1}, 500,createjs.Ease.cubicOut);
    };
    
    this._onReleaseYes = function(){
        s_oGame.onExit();
    };
    
    this._onReleaseNo = function(){
        _oContainer.visible = false;
        s_oGame.unpause();
    };
    
    _oParentContainer = oParentContainer;
    this._init(oParentContainer);
}