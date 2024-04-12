

cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.AudioClip,
        bgm: cc.AudioClip,

    },

    // onLoad () {},

    start() {
        window.stopAudio = false;
        cc.audioEngine.playMusic(this.bgm, true);

        if(window.hadShowTips){

        }
        else {
            // window.hadShowTips = true;
            // window.RES.getPrefab("bundleMode", "温馨提示", (_item) => {
            //     var _mode = cc.instantiate(_item);
            //     _mode.parent = cc.find("Canvas/dialogMng");
            // }, this);
        }
    },
    begin() {

        cc.audioEngine.play(this.btn, false, 1);
        cc.director.loadScene("menuScene")
    },
    // update (dt) {},
});
