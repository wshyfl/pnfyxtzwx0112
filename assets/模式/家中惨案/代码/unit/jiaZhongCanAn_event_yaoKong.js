
cc.Class({
    extends: cc.Component,

    properties: {
        showNode:cc.Node,
    },

    onLoad() {
    },

    start() {
        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchend, this);
        this.yuanPos = this.node.position;
        this.node.getComponent(cc.BoxCollider).enabled = false;
    },
    touchmove(event) {
        this.node.x += event.getDelta().x;
        this.node.y += event.getDelta().y;
    },
    touchend() {

        this.node.getComponent(cc.BoxCollider).enabled = true;
        this.scheduleOnce(() => {
            this.node.position = this.yuanPos;
            this.node.getComponent(cc.BoxCollider).enabled = false;
        }, 0.1)

    },
    onCollisionEnter(other, self) {
        other.node.active = false;
        var _TV = cc.find("电视", other.node.parent);
        _TV.active = true;
        _TV.opacity = 0;
        setTimeout(() => {
            if (window.gouYin == false) {//是否已经降罪犯勾引进客厅/已经躲进了窗帘?
                cc.director.emit("显示死亡", "死亡插图");
                console.log("游戏失败 打开电视 并且没有躲进去窗帘");
            }
        }, 3500);
        cc.tween(_TV)
            .to(0.5, { opacity: 255 })
            .call(()=>{
                this.showNode.active= true;
            })
            .start();
    },
    // update (dt) {},
});
