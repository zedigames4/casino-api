function CLosePanel(oParentContainer){
    var _iWidthBib;
    var _iHeightBib;
    var _aBibs;
    var _oSpriteSheetBib;
    var _oListener;
    
    var _oButSkip;
    var _oWinText;
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oListener = _oContainer.on("click",function(){});
        _oParentContainer.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("lose_panel"));
        _oContainer.addChild(oBg);
        
        var oText =  new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-200, 260, 400, 50, 
                    50, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_NO_WIN,
                    true, true, false,
                    false );

        
        
        var oSprite = s_oSpriteLibrary.getSprite("bibs");
        _iWidthBib = oSprite.width/4;
        _iHeightBib = oSprite.height/2;
        
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: _iWidthBib, height: _iHeightBib},
            animations: {bib_0: [0], bib_1: [1],bib_2:[2],bib_3:[3],bib_4:[4],bib_5:[5],bib_6:[6],bib_7:[7]}
        };

        _oSpriteSheetBib = new createjs.SpriteSheet(oData);
        
        _aBibs = new Array();
        var oBib1 = createSprite(_oSpriteSheetBib,"bib_0",0,0,_iWidthBib,_iHeightBib);
        oBib1.x = CANVAS_WIDTH/2 - 100 - _iWidthBib/2;
        oBib1.y = 360;
        _oContainer.addChild(oBib1);
        
        _aBibs.push(oBib1);
        
        var oBib2 = createSprite(_oSpriteSheetBib,"bib_0",0,0,_iWidthBib,_iHeightBib);
        oBib2.x = CANVAS_WIDTH/2 - _iWidthBib/2;
        oBib2.y = 360;
        _oContainer.addChild(oBib2);
        
        _aBibs.push(oBib2);
        
        var oBib3 = createSprite(_oSpriteSheetBib,"bib_0",0,0,_iWidthBib,_iHeightBib);
        oBib3.x = CANVAS_WIDTH/2 + 100 - _iWidthBib/2;
        oBib3.y = 360;
        _oContainer.addChild(oBib3);
        
        _aBibs.push(oBib3);
        
        _oWinText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-120, 450, 240, 30, 
                    30, "center", "#fff", PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_WIN + ": 0.00 " + TEXT_CURRENCY,
                    true, true, false,
                    false );

        
        _oButSkip = new CGfxButton(800,510,s_oSpriteLibrary.getSprite("but_skip"),_oContainer);
        _oButSkip.addEventListener(ON_MOUSE_UP,this.onSkip,this);
    };
    
    this.unload = function(){
        _oContainer.off("click",_oListener);
        _oButSkip.unload();
    };
    
    this.show = function(aRank){
        for(var j=0;j<3;j++){
             _aBibs[j].gotoAndStop("bib_"+aRank[j]);
        }
         
        _oContainer.visible = true;
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).wait(1000).to({alpha: 1}, 500,createjs.Ease.cubicOut);
    };

    this.onSkip = function(){   
        s_oGame.returnInBetPanel();
    };
    
    _oParentContainer = oParentContainer;
    this._init();
}