
cc.Class({
    extends: cc.Component,

    properties: {
        sfx:cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.emit("停止bgm");
        this.scheduleOnce(()=>{
            cc.audioEngine.play(this.sfx);
        },0.8)
        setTimeout(() => {
            cc.director.emit("显示死亡","死亡插图");
        }, 1700);
    },

    // update (dt) {},
});
