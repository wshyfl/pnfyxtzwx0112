
cc.Class({
    extends: cc.Component,

    properties: {
        sfx: [cc.AudioClip],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    onEnable() {
        if (this.sfx.length <= 0) return;
        cc.audioEngine.play(this.sfx[0]);
    },

    // update (dt) {},
});
