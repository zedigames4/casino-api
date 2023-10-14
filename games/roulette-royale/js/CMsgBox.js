function CMsgBox(){
    
    var _oBg;
    var _oMsgText;
    var _oGroup;
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oBg.on("click",function(){});
        _oGroup.addChild(_oBg);

        
        _oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2 -250, 230, 500, 280, 
                    40, "center", "#fff", FONT1, 1,
                    2, 2,
                    "",
                    true, true, true,
                    false );

        
    };
    
    this.unload = function(){
        _oBg.off("click",function(){});
    };
    
    this.show = function(szMsg){
        _oMsgText.refreshText(szMsg);

        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);
        setTimeout(function(){oParent._onExit();},2000);
    };
    
    this._onExit = function(){
        if(_oGroup.visible){
            _oGroup.off("mousedown");
            _oGroup.visible = false;
        }
        
    };
    
    this._init();
    
    return this;
}