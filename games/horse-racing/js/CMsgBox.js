function CMsgBox(){
    
    var _oBg;
    var _oMsgText;

    var _oGroup;
    var _oButRecharge;
    var _oButExit;
    
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oGroup.addChild(_oBg);

        
        _oMsgText =  new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-200, (CANVAS_HEIGHT/2)-100, 400, 130, 
                    34, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, true,
                    false );

        
        _oButRecharge = new CTextButton(CANVAS_WIDTH/2, 500, s_oSpriteLibrary.getSprite("fiche_panel"), TEXT_RECHARGE, PRIMARY_FONT, "#fff", 30,_oGroup);
        _oButRecharge.setVisible(false);
        _oButRecharge.addEventListener(ON_MOUSE_UP,this._onRecharge,this);
        
        _oButExit = new CGfxButton(CANVAS_WIDTH/2 + 205,CANVAS_HEIGHT/2 - 130,s_oSpriteLibrary.getSprite("but_exit"),_oGroup);
        _oButExit.addEventListener(ON_MOUSE_UP,this._onExit,this);
    };
    
    this.unload = function(){
        _oButRecharge.unload();
        _oButExit.unload();
    };

    
    this.show = function(szMsg,bRecharge){
        _oMsgText.refreshText(szMsg);

        _oGroup.visible = true;
        

        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);
        
        if(bRecharge){
            _oButRecharge.setVisible(true);
        }else{
            _oButRecharge.setVisible(false);
        }
        
        
    };
    
    this._onExit = function(){
        _oGroup.visible = false;  
    };
    
    this._onRecharge = function(){
        $(s_oMain).trigger("recharge");
        _oGroup.visible = false;
    };
    
    this._init();
    
    return this;
}