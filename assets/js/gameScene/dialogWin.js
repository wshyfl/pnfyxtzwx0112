
cc.Class({
    extends: cc.Component,

    properties: {
        zheZhao: cc.Node,
        bg: cc.Node,
        btn: cc.AudioClip,
        win: cc.AudioClip,
        btnNext: cc.Node,
        liZi: cc.Node,
    },

    // onLoad () {},

    start() {
        this.node.zIndex = 1;

        this.zheZhao.active = false;
        this.bg.active = false;
        cc.director.on("游戏胜利", () => {

            AD.gameOver();
            window.gameOverNow = true;
            AD.chaPing(true);
            AD.showBanner(true);

            cc.audioEngine.stopMusic();
            cc.audioEngine.play(this.win, false, 1);

            this.resetDialog(this.node, true);

            cc.director.emit("游戏暂停");
            globalData.setUnlockState(window.modeName);
            this.scheduleOnce(() => {
                this.liZi.active = true;
                this.liZi.children[0].getComponent(cc.Animation).play();
                this.liZi.children[1].getComponent(cc.Animation).play();
                this.scheduleOnce(() => {
                    this.liZi.children[0].getComponent(cc.Animation).play();
                    this.liZi.children[1].getComponent(cc.Animation).play();
                    this.scheduleOnce(() => {
                        this.liZi.children[0].getComponent(cc.Animation).play();
                        this.liZi.children[1].getComponent(cc.Animation).play();
                    }, 1.2)
                }, 1.2)
            }, 0.3)
        }, this);
        this.nextLevel();
    },
    btnCallBack(event, type) {

        cc.audioEngine.play(this.btn, false, 1);
        switch (type) {
            case "下一关":
                if (!window.isLevelMode)//非关卡模式 会进入下一个模式
                    window.modeName = this.nextModeName;
                cc.director.emit("过场动画", "gameScene");
                break;
            case "返回主页":
                cc.director.emit("过场动画", "menuScene");
                break;
            case "重新开始":
                cc.director.emit("过场动画", "gameScene");
                break;
        }
    },

    nextLevel() {
        var _index = -1;
        for (var i = 0; i < globalData.modeArr.length; i++) {
            if (window.modeName == globalData.modeArr[i]) {
                _index = i;
                break;
            }
        }
        if (_index < globalData.modeArr.length - 1) {
            this.nextModeName = globalData.modeArr[_index + 1];
        }
        else
            this.nextModeName = null;
        if (this.nextModeName) {
            this.btnNext.active = true;
        }
        else
            this.btnNext.active = false;
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
