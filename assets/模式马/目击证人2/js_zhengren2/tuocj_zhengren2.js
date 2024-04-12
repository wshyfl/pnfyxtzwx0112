cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
        direction: 1,
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
        this.shu = [200, 100, 200];
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
            this.node.y += even.getDelta().y * this.direction;
            if (this.node.y > 285) {
                this.node.y = 285;
            } else if (this.node.y < -170) {
                this.node.y = -170;
            }
        }

    },

    touchEnd(even) {
        this.xz = false
    },

    // update (dt) {},
});
