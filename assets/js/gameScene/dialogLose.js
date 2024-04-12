
cc.Class({
    extends: cc.Component,

    properties: {
        zheZhao: cc.Node,
        bg: cc.Node,
        btn: cc.AudioClip,
        win: cc.AudioClip,
    },

    // onLoad () {},

    start() {
        this.node.zIndex = 1;
        this.zheZhao.active = false;
        this.bg.active = false;
        cc.director.on("游戏失败", () => {
            window.gameOverNow = true;
            AD.gameOver();
            AD.chaPing(true);
            AD.showBanner(true);
            this.resetDialog(this.node, true);
            cc.director.emit("游戏暂停");
            cc.audioEngine.play(this.win, false, 1);
        }, this);
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


    resetDialog(_dialog, _show) {
        var _zheZhao = _dialog.getChildByName("zheZhao");
        var _bg = _dialog.getChildByName("bg");
        if (_show) {
            _zheZhao.active = true;
            _bg.active = true;
            _zheZhao.opacity = 0;
            _bg.scale = 1;

            cc.tween(_zheZhao)
                .to(0.2, { opacity: 180 })
                .start();

            cc.tween(_bg)
                .to(0.2, { scale: 1 })
                .start();

        }
        else {
            cc.tween(_zheZhao)
                .to(0.2, { opacity: 0 })
                .start();

            cc.tween(_bg)
                .to(0.2, { scale: 0 })
                .call(() => {
                    _zheZhao.active = false;
                    _bg.active = false;
                })
                .start();
        }
    },

    // update (dt) {},
});
