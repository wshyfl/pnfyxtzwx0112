
cc.Class({
    extends: cc.Component,

    properties: {
        duration:1,
        targetAngle:360,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.tween(this.node)
        .repeatForever(
            cc.tween()
            .by(this.duration,{angle:this.targetAngle})
        )
        .start();
    },

    // update (dt) {},
});
