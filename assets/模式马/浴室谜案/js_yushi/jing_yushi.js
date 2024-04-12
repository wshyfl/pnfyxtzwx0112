cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.xz=false;
    },

    touchDown(event) {
        this.xz = true;
    },

    touchEnd(event) {
        if(this.xz){
            this.node.parent.getComponent("tuofdj_yushi").dian();
        }
        this.xz = false;
    },

    // update (dt) {},
});
