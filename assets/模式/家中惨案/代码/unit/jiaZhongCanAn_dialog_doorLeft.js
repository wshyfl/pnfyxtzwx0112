
cc.Class({
    extends: cc.Component,

    properties: {
        clickNode: cc.Node,
        sfx:cc.AudioClip,
    },

    // onLoad () {},

    onDisable(){
        cc.audioEngine.play(this.sfx)
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
        if (this.clickPos) {
            this.clickPos.x += event.getDelta().x;
            this.clickPos.y += event.getDelta().y;
        }
    },
    touchend() {
        if (this.clickPos) {
            if (Math.abs(this.clickPos.x) + Math.abs(this.clickPos.y) < 2) {
                console.log("点击事件达成");
                if (!window.getKey) {

                    cc.director.emit("说话2", "门锁住了,去找找钥匙", 2);
                }
                else {
                    cc.director.emit("切换镜头", "走廊", "左侧走廊");
                    this.clickNode.destroy();
                    this.node.destroy();
                }
            }
        }

    },
    // update (dt) {},
});
