

cc.Class({
    extends: cc.Component,

    properties: {
        sfx: cc.AudioClip,
        sfxJianJiao: cc.AudioClip,
    },

    // onLoad () {},

    start() {
        cc.director.emit("停止bgm");
        this.scheduleOnce(() => {
            console.log("游戏失败")
            cc.director.emit("游戏失败");
        }, 4);
        this.scheduleOnce(() => {
            cc.audioEngine.play(this.sfx);
            cc.audioEngine.play(this.sfxJianJiao);
        }, 2)
    },

    // update (dt) {},
});
