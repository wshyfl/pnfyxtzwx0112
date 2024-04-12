
cc.Class({
    extends: cc.Component,

    properties: {
        showNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.showNode.active = false;
    },
    btnCallBack(event, type) {
        switch (type) {
            case "是":
                this.showNode.active = true;
                this.node.active = false;
                cc.director.emit("停止bgm");
                setTimeout(() => {
                    cc.director.emit("显示死亡","死亡插图");
                }, 1500);
                break;
            case "否":
                this.node.active = false;
                break;
        }
    },

    // update (dt) {},
});
