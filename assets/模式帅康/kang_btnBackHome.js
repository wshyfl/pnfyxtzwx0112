
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
        cc.director.resume();
        cc.audioEngine.play(this.btn, false, 1);
        switch (type) {
            case "继续游戏":
                this.zheZhao.active = false;
                this.bg.active = false;
                break;
            case "返回主页":
                cc.director.emit("过场动画", "menuScene");
                break;
            case "重新开始":
                cc.director.emit("过场动画", "gameScene");
                break;
        }
    },

    // update (dt) {},
});
