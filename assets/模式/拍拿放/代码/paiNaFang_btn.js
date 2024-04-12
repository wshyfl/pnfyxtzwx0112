

cc.Class({
    extends: cc.Component,

    properties: {
        index:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on("touchstart",()=>{
            this.node.children[1].active = false;
            cc.director.emit("拍拿放按钮按下", this.index);
        },this);
        this.node.on("touchend",()=>{
            this.node.children[1].active = true;
        },this);
        this.node.on("touchcancel",()=>{
            this.node.children[1].active = true;
        },this);
    },

    // update (dt) {},
});
