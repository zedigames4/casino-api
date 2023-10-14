function CBasket(iX, iY, oParentContainer, oSpriteSheet, iWidth, iHeight, szText){
    var _iStartSize;
    
    var _oParent;
    var _oText;
    var _oBasket;
    var _oHighlight;
    
    this._init = function(iX, iY, oParentContainer, oSpriteSheet, iWidth, iHeight, szText){
        _oBasket = new createjs.Container();
        _oBasket.y = iY;
        _oBasket.x = iX;
        oParentContainer.addChild(_oBasket);
        
        var oBasketSprite = createSprite(oSpriteSheet, "state_off",iWidth/2, iHeight/2, iWidth, iHeight);
        _oBasket.addChild(oBasketSprite);
        
        _oHighlight = createSprite(oSpriteSheet, "state_on",iWidth/2, iHeight/2, iWidth, iHeight);
        _oHighlight.alpha = 0;
        _oBasket.addChild(_oHighlight);
        
        var szNewText = this._verticalizeText(szText);
        _iStartSize = 40;
        _oText = new createjs.Text(szNewText," "+_iStartSize+"px "+PRIMARY_FONT, "#ffffff");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.lineWidth = 200;
        _oBasket.addChild(_oText);

        this._setText(_iStartSize);
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oBasket);
    };
    
    this.refreshText = function(szText){
        var szNewText = this._verticalizeText(szText);
        _oText.text = szNewText;
        this._setText(_iStartSize);
    };
    
    this._setText = function(iSize){      

        var iNewSize = iSize;
        
        while(_oText.getBounds().height>iHeight-iSize){
            iNewSize--;
            _oText.font = " "+iNewSize+"px "+PRIMARY_FONT;

        };
        var iOffset = 10;
        
        _oText.y = -_oText.getBounds().height/2+iOffset;
    };
    
    this._verticalizeText = function(szText){
        var szNewText = "";
        for(var i=0; i<szText.length; i++){
            if(i !== szText.length-1){
                szNewText += szText[i]+"\n";
            } else {
                szNewText += szText[i];
            }
        };

        return szNewText;
    };
    
    this.lit = function(iProfit){
        if(iProfit < 1){
            _oHighlight.gotoAndPlay("state_red");
        }else if(iProfit <= 4) {
            _oHighlight.gotoAndPlay("state_yellow");
        }else {
            _oHighlight.gotoAndPlay("state_green");
        }
        
        _oParent._recursiveLit(BASKET_LIT_ITERATION);
    };
    
    this._recursiveLit = function(iLitIteration){
        iLitIteration--;
        if(iLitIteration<0){
            return;
        }

        createjs.Tween.get(_oHighlight).to({alpha:1}, 100).to({alpha:0}, 100).call(function(){
            _oParent._recursiveLit(iLitIteration);
        });
    };
    
    _oParent = this;
    this._init(iX, iY, oParentContainer, oSpriteSheet, iWidth, iHeight, szText);
    
}


