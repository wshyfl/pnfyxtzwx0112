
cc.Class({
    extends: cc.Component,

    properties: {
        showNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.showNode.active = false;
        this.scheduleOnce(() => {
            this.showNode.active = true;
            this.node.active = false;
        }, 1.5)
    },

    // update (dt) {},
});
