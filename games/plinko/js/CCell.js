function CCell(iX, iY, oParentContainer, iRow, iCol, oStakeContainer){
    
    var _oParent;
    var _oCell;
    var _oDebugHighlight;
    var _oStake;
    
    this._init = function(iX, iY, oParentContainer, iRow, iCol, oStakeContainer){
        
        _oCell = new createjs.Container();
        _oCell.x = iX;
        _oCell.y = iY;
        _oCell.alpha = 0;
        oParentContainer.addChild(_oCell);

        var iWidth = 100;
        var iHeight = 100;
        _oDebugHighlight = new createjs.Shape();
        _oDebugHighlight.graphics.beginFill("rgba(255,255,255,0.51)").drawRect(-iWidth/2, -iHeight/2, iWidth, iHeight);
        _oDebugHighlight.visible = false;
        _oDebugHighlight.rotation = 45;
        _oCell.addChild(_oDebugHighlight);
        
        var oSprite = s_oSpriteLibrary.getSprite('stake');
        _oStake = createBitmap(oSprite);
        _oStake.regX = oSprite.width/2;
        _oStake.x = iX;
        _oStake.y = iY + 60;
        oParentContainer.addChild(_oStake);
        
        /////////ACTIVATE THIS FUNCTION TO CHECK BALL PATH
        //this._debug();
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oCell);
    };
    
    this.getCenterPos = function(){
        return {x: iX, y:iY};
    };
    
    this.getPivotPos = function(){
        return {x: iX, y:iY + CELL_PIVOT_FROM_CENTER};
    };
    
    this.getCenterOfBallOnPivot = function(){
        return {x: iX, y:iY + CELL_PIVOT_FROM_CENTER - BALL_RADIUS};
    };
    
    this.checkBallOverlap = function(oPos){
        var iXDiff = oPos.x - iX;
        var iYDiff = oPos.y - iY;
        var iBallRad = BALL_RADIUS*BALL_RADIUS;
        
        return (iXDiff*iXDiff + iYDiff*iYDiff < iBallRad);
        //return _oCell.hitTest(oPos.x, oPos.y);
    };
    
    this.removeStake = function(){
        _oStake.visible = false;
    };
    
    this.highlight = function(bVal){
        _oDebugHighlight.visible = bVal;
    };
    
    this._debug = function(){
        _oCell.alpha = 1;
        
        var szFormat = "bold 30px Arial";
        var oDebugTextStroke = new createjs.Text(iRow +","+iCol,szFormat, "#000000");
        oDebugTextStroke.textAlign = "center";
        oDebugTextStroke.textBaseline = "middle";
        oDebugTextStroke.lineWidth = 200;
        oDebugTextStroke.outline = 4;
        _oCell.addChild(oDebugTextStroke);
        
        var oDebugText = new createjs.Text(oDebugTextStroke.text,szFormat, "#ffffff");
        oDebugText.textAlign = oDebugTextStroke.textAlign;
        oDebugText.textBaseline = oDebugTextStroke.textBaseline;
        oDebugText.lineWidth = oDebugTextStroke.lineWidth;
        _oCell.addChild(oDebugText);
    };
    
    _oParent = this;
    this._init(iX, iY, oParentContainer, iRow, iCol, oStakeContainer);
}


