
cc.Class({
    extends: cc.Component,

    properties: {
        emitContent: "事件内容",
        emitData1: "",
        emitData2: "",
        destroySelf: false,
        sfx: cc.AudioClip,
        isShiTi: true,
    },

    onLoad() {
        this.node.opacity = 0;
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
            if (this.emitData1 != "" && this.emitData2 != "")
                cc.director.emit(this.emitContent, this.emitData1, this.emitData2);
            else if (this.emitData1 != "") {
                if (window.gouYin)//是否已经降罪犯勾引进客厅?
                {
                    if (this.isShiTi)
                        cc.director.emit(this.emitContent, "刀子出现");
                    else
                        cc.director.emit("切换镜头", "左侧走廊右侧门", "左侧走廊");
                }
                else
                    cc.director.emit(this.emitContent, "被发现");
            }
            else {
                cc.director.emit(this.emitContent);
            }
            if (this.destroySelf)
                this.node.destroy();
            if (this.sfx)
                cc.audioEngine.play(this.sfx);
        }
    },
    // update (dt) {},
});
