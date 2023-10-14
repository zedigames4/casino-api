function CFicheBut(iIndex,iXPos,iYPos,iScale,oParentContainer){
    var _bSelected;
    var _bDisable;
    var _iIndex = iIndex;
    var _iCurScale = iScale;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    var _oTextValue;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init =function(iXPos,iYPos){
        var oSprite = s_oSpriteLibrary.getSprite("fiche_"+_iIndex);
        
        _bDisable = false;
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos; 
        _oContainer.regX = oSprite.width/2;
        _oContainer.regY = oSprite.height/2;
        _oParentContainer.addChild(_oContainer);
        
        _bSelected = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = createBitmap( oSprite);
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.cursor = "pointer";
        _oContainer.addChild(_oButton);
        _oContainer.scaleX = _oContainer.scaleY = _iCurScale;
       

        _oTextValue = new CTLText(_oContainer, 
                    -10, -10, 18, 18, 
                    20, "center",COLOR_FICHES[_iIndex] , PRIMARY_FONT, 1.1,
                    0, 0,
                    CHIP_VALUES[_iIndex],
                    true, true, false,
                    false );
       
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        

        
        
        
        this._initListener();
    };
    
    this.unload = function(){
       _oContainer.off("mousedown", this.buttonDown);
       _oContainer.off("pressup" , this.buttonRelease); 
       
       _oParentContainer.removeChild(_oContainer);
    };
    
    this.select = function(){
        _bSelected = true;

    };
    
    this.deselect = function(){
        _bSelected = false;

    };
    
    this.enable = function(){
        _bDisable = false;

    };
    
    this.disable = function(){
        _bDisable = true;

    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this._initListener = function(){
       _oContainer.on("mousedown", this.buttonDown);
       _oContainer.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        playSound("click",1,false);
        
        _oContainer.scaleX = _iCurScale;
        _oContainer.scaleY = _iCurScale;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
        
        _bSelected = !_bSelected;

    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        
        _oContainer.scaleX = _iCurScale*0.9;
        _oContainer.scaleY = _iCurScale*0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oContainer.x = iXPos;
         _oContainer.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oContainer.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oContainer.y = iYPos;
    };

    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };

    this._init(iXPos,iYPos);
}