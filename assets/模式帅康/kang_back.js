

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on("touchstart",()=>{cc.director.emit("显示暂停界面")},this);
    },

    // update (dt) {},
});
