cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.a = 0;
        this.b = 0;
        this.xz=false;
        this.shu=[200,100,185];
    },

    touchDown(even) {
        this.a = 0;
        this.b = 0;
        this.xz=true
    },

    touchMove(even) {
        if(this.xz){
            this.a += Math.abs(even.getDelta().x);
            this.b += Math.abs(even.getDelta().y);
            this.node.x += even.getDelta().x;
            if(this.node.x>this.shu[this.id]){
                this.node.x=this.shu[this.id];
            }else if(this.node.x<-this.shu[this.id]){
                this.node.x=-this.shu[this.id];
            }
        }

    },

    touchEnd(even) {
        this.xz=false
    },

    // update (dt) {},
});
