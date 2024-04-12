

cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.AudioClip,
        modeParent: cc.Node,
        iconADBig: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.isLevelMode = false;//是有关卡的模式吗?
    },

    start() {

        window.gameScene = this;
        window.stopAudio = true;
        window.gameOverNow = false;

        cc.audioEngine.stopAll();
        cc.director.on("按钮音效", () => {
            cc.audioEngine.play(this.btn, false, 1)
        }, this);
        this.loadMode();

        if (AD.chanelName != "touTiao")
            AD.showBanner();
        else
            AD.hideBanner();
        // this.autoChaPing(); //自动弹出插屏逻辑
    },
    //加载模式
    loadMode() {
        var self = this;
        window.RES.getPrefab("bundleMode", window.modeName, (_item) => {
            var _mode = cc.instantiate(_item);
            _mode.parent = self.modeParent;
            self.open();
        }, this);
    },
    open() {
        setTimeout(() => {
            cc.director.emit("打开过场动画")
        }, 100);
    },

    btnCallBack(event, type) {
        switch (type) {
            case "返回":

                break;
        }

    },
    //自动弹出插屏逻辑
    autoChaPing() {
        if (AD.wuDianRate <= 0) return;
        var _cousShowArr = ["other"];//那些渠道 "不"可以出现自动插屏
        this.couldShowChaPing = true;//可以弹出
        for (var i = 0; i < _cousShowArr.length; i++) {
            if (_cousShowArr[i].indexOf(AD.chanelName) > -1) {
                this.couldShowChaPing = false;//不能弹出
                break;
            }
        }
        if (!this.couldShowChaPing) return;


        this.schedule(() => {
            if (window.gameOverNow) return;
            AD.chaPing();
        }, 30)


    },



    // update (dt) {},
});
