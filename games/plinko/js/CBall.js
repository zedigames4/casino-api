function CBall(oPos, oParentContainer){
    
    var _iDiameter;
    var _iStartAnimTime;

    var _oBall;
    var _oBallSprite;
    var _oParent;
    
    this._init = function(oPos, oParentContainer){
        
        _oBall = new createjs.Container();
        _oBall.x = oPos.x;
        _oBall.y = oPos.y;
        oParentContainer.addChild(_oBall);
        
        var oSprite = s_oSpriteLibrary.getSprite('ball');
        _oBallSprite = createBitmap(oSprite);
        _oBallSprite.regX = oSprite.width/2;
        _oBallSprite.regY = oSprite.height/2;
        _oBall.addChild(_oBallSprite);

        _iDiameter = oSprite.height;
        
    };
    
    this.unload = function(){
        _oBall.parent.removeChild(_oBall);
    };
   
    this.getPos = function(){
        return {x: _oBall.x, y: _oBall.y};
    };
    
    this.getSprite = function(){
        return _oBall;
    };
    
    this.resetPos = function(){
        _oBall.x = oPos.x;
        _oBall.y = oPos.y;
    };
    
    this.setPos = function(oPos){
        _oBall.x = oPos.x;
        _oBall.y = oPos.y;
    };
    
    this.setPosToPivot = function(){
        _oBall.regY = _iDiameter/2;
    };
    
    this._getFallParams = function(aPath, iTime){
        var oPos = s_oGame.getBallPivotCellPos(aPath[0].row, aPath[0].col);
        
        ////IF iAngleShift IS 0, BALL WILL FALL OFF TO THE CENTER OF THE NEXT PIVOT... ELSE WILL FALL ON THE SIDE BASED ON iAngleShift RADIANS
        var iAngleShift;
        var szNextDir;
        if(aPath.length > 1){
            var oNextCell = s_oGame.getBallPivotCellPos(aPath[1].row, aPath[1].col);
            if(oNextCell.x>oPos.x){
                ///////GO RIGHT
                iAngleShift = Math.random()*BALL_FALL_MAX_ANGLE;
                szNextDir = "right";
            } else {
                //////GO LEFT
                iAngleShift = -Math.random()*BALL_FALL_MAX_ANGLE;
                szNextDir = "left";
            }
        } else {
            iAngleShift = -BALL_FALL_MAX_ANGLE + Math.random()*BALL_FALL_MAX_ANGLE*2;
            szNextDir = "right";
        }

        var vShift = new CVector2(0, -BALL_RADIUS);
        rotateVector2D(iAngleShift, vShift);
        
        vShift.subtract(new CVector2(0, -BALL_RADIUS));

        var oShiftedPos = {x: oPos.x - vShift.getX(), y: oPos.y+ vShift.getY()};
        
        /////MORE FAR THE BALL WILL FALL FROM THE CENTER, LESS SHOULD BE THE ROTATION TAKEN
        var iRotation;
        var iRotAttenuation = iAngleShift*BALL_FALL_ROTATION_ATTENUATION_FACTOR;
        if(oPos.x > _oBall.x){
            iRotation = _oBallSprite.rotation + BALL_FALL_MAX_ROTATION - iRotAttenuation;
        }else {
            iRotation = _oBallSprite.rotation -BALL_FALL_MAX_ROTATION - iRotAttenuation;
        }
        
        ////CHECK IF BALL SHOULD GO FASTER WITH ANIMATION
        var iNewTime;
        var szCurDir;
        if(_oBall.x < oShiftedPos.x){
            szCurDir = "right";
        }else {
            szCurDir = "left";
        }
        if(szCurDir === szNextDir){
            iNewTime = iTime*BALL_FALL_SPEED_INCREASE;
            if(iNewTime < BALL_FALL_MAX_SPEED_LIMIT){
                iNewTime = BALL_FALL_MAX_SPEED_LIMIT;
            }
        } else {
            iNewTime = _iStartAnimTime;
        }

        return {rotation: iRotation, posx: oShiftedPos.x, posy: oShiftedPos.y, newtime:iNewTime};
        
    };
    
    this.launchAnim = function(oPos){
        var iTime = 1000;
        
        createjs.Tween.get(_oBall).to({x:oPos.x}, iTime, createjs.Ease.sineOut);
        createjs.Tween.get(_oBall).to({y:oPos.y-400}, iTime/2, createjs.Ease.cubicOut).to({y:oPos.y}, iTime/2, createjs.Ease.cubicIn).call(function(){
            s_oGame.getFallPath();
        });
    };
    
    this.startPathAnim = function(aPath, iStartTime){
        _iStartAnimTime = iStartTime;
        
        this._jumpBall(aPath, iStartTime);
    };
    
    this._jumpBall = function(aPath, iTime){
        playSound('ball_collision', 1, false);
        
        var aCurCell = aPath.splice(0,1);
        
        if(aPath.length === 1){
            _oParent._lastJumpBallAnim(aPath, iTime);
            return;
        }
        
        var oCurPos = s_oGame.getBallPivotCellPos(aCurCell[0].row, aCurCell[0].col);
        var oNextPos = s_oGame.getBallPivotCellPos(aPath[0].row, aPath[0].col);
        
        createjs.Tween.get(_oBall).to({x:oNextPos.x}, iTime/*, createjs.Ease.cubicOut*/)
        createjs.Tween.get(_oBall).to({y:oCurPos.y-10}, iTime/4, createjs.Ease.cubicOut).to({y:oNextPos.y}, iTime*3/4, createjs.Ease.cubicIn).call(function(){
            _oParent._jumpBall(aPath, iTime);
        });

    };
    
    this._fallBall = function(aPath, iTime){
        aPath.splice(0,1);
        
        if(aPath.length === 1){
            _oParent._lastFallBallAnim(aPath, iTime);
            return;
        }

        var oParams = this._getFallParams(aPath, iTime);
        
        
        createjs.Tween.get(_oBallSprite).to({rotation:oParams.rotation}, iTime, createjs.Ease.sineIn);
        createjs.Tween.get(_oBall, {override:true}).to({x:oParams.posx}, iTime, createjs.Ease.sineIn);
        createjs.Tween.get(_oBall).to({y:oParams.posy}, iTime, createjs.Ease.cubicIn).call(function(){
                _oParent._fallBall(aPath, oParams.newtime);
                
        });
    };

    this.releaseBallAnim = function(iCol){
        var pEndPos = s_oGame.getBoard()[0][iCol].getCenterOfBallOnPivot();
        
        createjs.Tween.get(_oBall).to({y:pEndPos.y}, 500, createjs.Ease.sineIn).call(function(){
            s_oGame.launchBall(iCol)
        });
    };
    
    this._lastFallBallAnim = function(aPath, iTime){
        var oParams = this._getFallParams(aPath, iTime);
        
        var iFloor = oParams.posy + 170;
        
        createjs.Tween.get(_oBallSprite).to({rotation:oParams.rotation}, iTime, createjs.Ease.sineIn);
        createjs.Tween.get(_oBall, {override:true}).to({x:oParams.posx}, iTime, createjs.Ease.sineIn);
        createjs.Tween.get(_oBall).to({y:iFloor}, iTime, createjs.Ease.cubicIn).call(function(){
                
                createjs.Tween.get(_oBall).to({y:iFloor - 100}, iTime/2, createjs.Ease.cubicOut).to({y:iFloor}, iTime, createjs.Ease.bounceOut);

                s_oGame.ballArrived(aPath[0].col);
        });
    };
    
    this._lastJumpBallAnim = function(aPath, iTime){
        var oNextPos = s_oGame.getBallPivotCellPos(aPath[0].row, aPath[0].col);
        var iFloor = oNextPos.y + 220;
        
        createjs.Tween.get(_oBall, {override:true}).to({x:oNextPos.x}, iTime, createjs.Ease.sineIn);
        createjs.Tween.get(_oBall).to({y:_oBall.y-10}, iTime/4, createjs.Ease.cubicOut).to({y:iFloor}, iTime*3/4, createjs.Ease.cubicIn).call(function(){
                s_oGame.ballArrived(aPath[0].col);
                
                createjs.Tween.get(_oBall).to({y:iFloor - 100}, iTime/2, createjs.Ease.cubicOut).to({y:iFloor}, iTime, createjs.Ease.bounceOut).call(function(){
                    createjs.Tween.get(_oBall).to({alpha:0}, 3000, createjs.Ease.cubicIn).call(function(){
                        _oParent.unload();
                    });
                });
                
        });
    };
    
    _oParent = this;
    this._init(oPos, oParentContainer);
}


