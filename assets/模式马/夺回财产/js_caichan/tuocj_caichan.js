cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.xz=false;
    },

    touchDown(even) {
        this.xz=true
    },

    touchMove(even) {
        if(this.xz){
            this.node.x += even.getDelta().x;
            this.node.y += even.getDelta().y;
            if(this.node.x>110){
                this.node.x=110;
            }else if(this.node.x<-110){
                this.node.x=-110;
            }
            if(this.node.y>50){
                this.node.y=50;
            }else if(this.node.y<-50){
                this.node.y=-50;
            }
        }

    },

    touchEnd(even) {
        this.xz=false
    },

    // update (dt) {},
});
