
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.node.children[1].active = false;
        if (window.showBigADIcon){//显示 摄像机图标
            this.node.children[0].active = false;
            this.node.children[1].active = true;
        }
    },

    start () {

    },

    // update (dt) {},
});
