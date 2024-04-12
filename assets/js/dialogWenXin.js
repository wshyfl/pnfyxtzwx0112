

cc.Class({
    extends: cc.Component,

    properties: {

        btn: cc.AudioClip,
    },

    onLoad() {
        
    },

    start() {
        Tools.resetDialog2(this.node, true);
    },
    btnCallBack() {
        cc.audioEngine.play(this.btn, false, 1);
        Tools.resetDialog2(this.node, false);

    },

    // update (dt) {},
});
