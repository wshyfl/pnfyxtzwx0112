
cc.Class({
    extends: cc.Component,

    properties: {
        delayTime:0,
        duration:0.5,
        targetOpacity:255,
        targetScale:1,
        targetAngle:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.tween(this.node)
        .delay(this.delayTime)
        .to(this.duration,{scale:this.targetScale,opacity:this.targetOpacity,angle:this.targetAngle},{easing:"sineIn"})
        .start();
    },

    // update (dt) {},
});
