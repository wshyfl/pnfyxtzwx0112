cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
        fu: cc.Node,
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
        this.xz = false;
    },

    touchDown(even) {

        this.a = 0;
        this.b = 0;
        this.xz = true
    },

    touchMove(even) {
        if (this.xz) {
            this.a += Math.abs(even.getDelta().x);
            this.b += Math.abs(even.getDelta().y);
        }

    },

    touchEnd(even) {
        if (this.xz == false) {
            return;
        }
        this.xz = false
        if (Math.abs(this.a) < 5 && Math.abs(this.b) < 5) {
            if(this.id == -2){
                this.fu.getComponent("maigehaozhai").kaideng();
                return
            }else if(this.id==-3){
                this.fu.getComponent("maigehaozhai").guandeng();
                return
            }else if(this.id == 9){
                return;
            }
            if (this.id == 0) {
                this.fu.getComponent("maigehaozhai").baozhikai();
                this.quan();
            }
            else {
                this.fu.getComponent("maigehaozhai").dianji(this.id);
                this.quan();
            }

        }
    },

    quan() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        cc.tween(this.node.getChildByName("yuan").getComponent(cc.Sprite))
            .to(0.15, { fillRange: 1 })
            .start()
    },


    // update (dt) {},
});
