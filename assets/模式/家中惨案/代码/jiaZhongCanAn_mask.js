
cc.Class({
    extends: cc.Component,

    properties: {
        sizeNode:cc.Node,
        scaleMax: 2,
        scaleMin: 1,
        maskNode:cc.Node,
        couldMove:true,
    },

    onLoad() {
        this.node.on("touchstart", this.touchstart, this);
        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchcancel, this);
        window.checkRight = false;
        this.pIndex1 = null;
        this.pIndex2 = null;
        this.pos1 = null;
        this.pos2 = null;
        this.startDis = 0;
        this.yuanPos = this.node.position;
        this.maxX = this.yuanPos.x + this.maskNode.width / 2;
        this.minX = this.yuanPos.x - this.maskNode.width / 2;
        this.maxY = this.yuanPos.y + this.maskNode.height / 2;
        this.minY = this.yuanPos.y - this.maskNode.height / 2;
        this.yuanScale = this.node.scale;
        this.couldCheck = true;
        this.node.width = this.node.children[0].width = this.sizeNode.width;
        this.node.height = this.node.children[0].height = this.sizeNode.height;
    },

    start() {
    },
    touchstart(event) {
        if(!this.couldMove)return;
        cc.director.emit("重置检查答案")
        this.couldCheck = true;
        if (this.pIndex1 == null) {
            this.pIndex1 = event.getTouches()[0]._id;
            this.pos1 = event.getTouches()[0]._point;

        }
        else if (this.pIndex2 == null) {
            this.pIndex2 = event.getTouches()[0]._id;
            this.pos2 = event.getTouches()[0]._point;
        }
        if (this.pos1 != null && this.pos2 != null) {
            this.startDis = this.getDistance(this.pos1, this.pos2);
            this.couldCheck = false;
        }
        else {
            this.startPos = this.node.position;
            this.moveDis = 0;
        }
        this.node.scale = this.yuanScale;
    },
    touchmove(event) {
        if(!this.couldMove)return;
        this.touchIds = event.getTouches();
        for (var i = 0; i < this.touchIds.length; i++) {
            if (this.touchIds[i]._id == this.pIndex1) {
                this.pos1 = cc.v2(this.touchIds[i]._point.x, this.touchIds[i]._point.y);
            }
            else if (this.touchIds[i]._id == this.pIndex2) {
                this.pos2 = cc.v2(this.touchIds[i]._point.x, this.touchIds[i]._point.y);
            }
        }
        if (this.pos1 != null && this.pos2 != null) {
            var _dis = this.getDistance(this.pos1, this.pos2);
            if (this.startDis) {
                var _scale = _dis / this.startDis;
                this.node.scale = this.yuanScale * _scale;
                if (this.node.scale > this.scaleMax)
                    this.node.scale = this.scaleMax;
                else if (this.node.scale < this.scaleMin)
                    this.node.scale = this.scaleMin;
            }
        }
        else {
            this.node.x += event.getDelta().x;
            this.node.y += event.getDelta().y;
            var _pos = this.node.position;
            this.moveDis = this.getDistance(_pos, this.startPos);
            if(this.moveDis>10)
            this.couldCheck = false;
        }
    },
    touchend(event) {

        if(!this.couldMove)return;
        this.yuanScale = this.node.scale;
        this.pIndex1 = null;
        this.pIndex2 = null;
        this.pos1 = null;
        this.pos2 = null;
        if (this.couldCheck) {
            if (this.moveDis < 10) {
                if (window.checkRight) //点到了答案
                {
                    window.checkRight = false;
                    cc.director.emit("检查答案");
                }
                else
                    cc.director.emit("点错了")
            }
        }

    },
    touchcancel(event) {
        this.pIndex1 = null;
        this.pIndex2 = null;
        this.pos1 = null;
        this.pos2 = null;
        this.couldCheck = true;

        this.checkBianJie();
    },
    checkBianJie() {
        if (this.node.x + this.node.width / 2 * this.node.scale < this.maxX)//右
            this.node.x = this.maxX - (this.node.width / 2 * this.node.scale);
        else if (this.node.x - this.node.width / 2 * this.node.scale > this.minX)//右
            this.node.x = this.minX + (this.node.width / 2 * this.node.scale);

        if (this.node.y + this.node.height / 2 * this.node.scale < this.maxY)//右
            this.node.y = this.maxY - (this.node.height / 2 * this.node.scale);
        else if (this.node.y - this.node.height / 2 * this.node.scale > this.minY)//右
            this.node.y = this.minY + (this.node.height / 2 * this.node.scale);
    },
    //获得两点之间的距离
    getDistance(pos, pos2) {
        var distance = Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2));
        return distance;
    },
    update (dt) {
        
        this.checkBianJie();
    },
});
