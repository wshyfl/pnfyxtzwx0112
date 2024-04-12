
cc.Class({
    extends: cc.Component,

    properties: {
        showNode:cc.Node,
    },

    onLoad() {
        this.showNode.active = false;
    },

    start() {
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchend, this);
    },
    touchStart(event) {
        this.clickPos = cc.v2(0, 0);
    },
    touchmove(event) {
        this.clickPos.x += event.getDelta().x;
        this.clickPos.y += event.getDelta().y;
    },
    touchend() {

        if (Math.abs(this.clickPos.x) + Math.abs(this.clickPos.y) < 2) {
            console.log("点击事件达成");
            this.showNode.active = true;
        }
    },
    // update (dt) {},
});
