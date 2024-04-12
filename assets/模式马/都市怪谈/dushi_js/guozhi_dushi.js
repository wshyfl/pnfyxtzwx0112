cc.Class({
    extends: cc.Component,

    properties: {
        fu: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on("touchstart", this.touchDown, this);
        this.node.on("touchend", this.touchEnd, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchcancel", this.touchEnd, this);
        this.xz = false;
        this.a = 0;
        this.b = 0;
        this.weix = this.node.x;
        this.weiy = this.node.y;
    },

    touchDown(event) {
        if (this.fu.getComponent("dushiguaitan").jindu != 12) {
            return;
        }
        this.xz = true;
    },

    touchMove(event) {
        if (this.fu.getComponent("dushiguaitan").jindu != 12) {
            return;
        }
        if (this.xz == false) {//未点击直接抬起
            return;
        }
        this.a += event.getDelta().x;
        this.b += event.getDelta().y;
        this.node.x+=event.getDelta().x;
        this.node.y+=event.getDelta().y;
    },

    touchEnd(event) {
        if (this.fu.getComponent("dushiguaitan").jindu != 12) {
            return;
        }
        if (this.xz == false) {//未点击直接抬起
            return;
        }

        if (Math.abs(this.a) > 10 || Math.abs(this.b) > 10) {
            this.fu.getComponent("dushiguaitan").tuo2 = true;
            this.node.destroy();
        } else {
            cc.tween(this.node)
                .to(0.1, { x: this.weix, y: this.weiy })
                .start()
        }

        this.xz = false;
    },

    // update (dt) {},
});
