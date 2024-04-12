
cc.Class({
    extends: cc.Component,

    properties: {
        
        btn: cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    

    btnCallBack(event, type) {
        cc.audioEngine.play(this.btn, false, 1);
        switch (type) {
            case "返回":
                cc.director.loadScene("firstScene");
                break;
        }
    },
    btnCallBackMode(event, type) {
        cc.audioEngine.play(this.btn, false, 1);
        window.modeBigIndex = parseInt(event.target.name)
        cc.director.loadScene("menuScene");
    },
    // update (dt) {},
});
