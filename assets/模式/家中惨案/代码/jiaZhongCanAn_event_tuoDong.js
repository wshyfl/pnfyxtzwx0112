
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
    },

    start() {
        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchend, this);
        this.yuanPos = this.node.position;
    },
    touchmove(event) {
        this.node.x += event.getDelta().x;
        this.node.y += event.getDelta().y;
    },
    touchend() {
        this.node.position = this.yuanPos;
        
    },
    // update (dt) {},
});
