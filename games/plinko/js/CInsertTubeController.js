function CInsertTubeController(oParentContainer){

    var _aSlot;

    var _oController;

    this._init = function(oParentContainer){
        
        _oController = new createjs.Container();
        oParentContainer.addChild(_oController);
        
        var oSprite = s_oSpriteLibrary.getSprite('holes_occluder');
        var oBaseBoard = createBitmap(oSprite);
        oBaseBoard.regX = oSprite.width/2;
        oBaseBoard.regY = oSprite.height/2;
        oBaseBoard.x = CANVAS_WIDTH/2;
        oBaseBoard.y = 408;
        _oController.addChild(oBaseBoard);
        
        
        var oSprite = s_oSpriteLibrary.getSprite('hole_board_occluder');
        var aTubePos = new Array()
        for(var i=0; i<NUM_INSERT_TUBE; i++){
            
            aTubePos.push({x: 288+i*140, y:356});
            
            var oTube = createBitmap(oSprite);
            oTube.regX = oSprite.width/2;
            oTube.regY = oSprite.height/2;
            oTube.x = aTubePos[i].x;
            oTube.y = aTubePos[i].y;
            _oController.addChild(oTube);
        }
        
        _aSlot = new Array();
        var oSprite = s_oSpriteLibrary.getSprite('bg_number');
        for(var i=0; i<NUM_INSERT_TUBE; i++){
            
            var oSlot = new CSlot(aTubePos[i].x, aTubePos[i].y+ 20, 90, 100, _oController);
            oSlot.addEventListenerWithParams(ON_MOUSE_UP, this._onSlot, this, i);
            
            _aSlot.push(oSlot);

        }
        
        this.hideSlots();
        
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oController);
    };
    
    this.checkBallOverlap = function(oPos){
        var bOverlap = false;
        for(var i=0; i<NUM_INSERT_TUBE; i++){
            bOverlap = _aSlot[i].checkOverlap(oPos);
            if(bOverlap){
                return {pos: _aSlot[i].getPos(), index:i};
            }
        }
    };
    
    this.getSlotPos = function(iIndex){
        return _aSlot[iIndex].getPos();
    };
    
    this.hideSlots = function(){
        for(var i=0; i<NUM_INSERT_TUBE; i++){
            _aSlot[i].setVisible(false);
        }
    };
    
    this.showSlots = function(){
        for(var i=0; i<NUM_INSERT_TUBE; i++){
            _aSlot[i].setVisible(true);
        }
    };
    
    this._onSlot = function(iIndex){
        s_oGame.launch(iIndex)
    };
    
    this._init(oParentContainer);
}


