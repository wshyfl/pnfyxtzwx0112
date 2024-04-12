cc.Class({
    extends: cc.Component,

    properties: {
        fu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on("touchstart", this.touchDown, this);
        this.node.on("touchend", this.touchEnd, this);
        this.node.on("touchcancel", this.touchEnd, this);
        this.xz=false;
    },

    touchDown(event){
        this.xz=true;
    },

    touchEnd(event) {
        if(this.xz==false){//未点击直接抬起
            return;
        }
        cc.audioEngine.play(this.fu.getComponent("dushiguaitan").yinxiao[3], false, 1);
        this.fu.getComponent("dushiguaitan").dianshoukuan();

        this.xz=false;
    },

    // update (dt) {},
});
