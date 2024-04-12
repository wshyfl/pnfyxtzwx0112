cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.node.on("touchstart", this.touchDown, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
        this.node.on("touchcancel", this.touchEnd, this);
        this.a = 0;
        this.b = 0;
    },

    touchDown(event) {
        this.a = 0;
        this.b = 0;
    },

    touchMove(event) {
        this.a += event.getDelta().x;
        this.b += event.getDelta().y;

        if(this.node.width>cc.winSize.width){
            this.node.x += event.getDelta().x;
            if (this.node.x >= (this.node.width/2-cc.winSize.width/2)) {
                this.node.x = (this.node.width/2-cc.winSize.width/2);
            } else if (this.node.x <= -(this.node.width/2-cc.winSize.width/2)) {
                this.node.x = -(this.node.width/2-cc.winSize.width/2);
            }
        }
    },

    touchEnd(event) {

    },

    // update (dt) {},
});
