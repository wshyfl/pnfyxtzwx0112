

cc.Class({
    extends: cc.Component,

    properties: {
        ADNode: cc.Node,
        nameParent: cc.Node,
        jianTuParent: cc.Node,
        indexLabel: cc.Label,
        stars: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchend", this.touchEnd, this);
        this.node.on("touchcancel", this.touchCancel, this);
        if (window.showBigADIcon) {//显示 摄像机图标
            if (this.ADNode) {
                this.ADNode.getComponent(cc.Sprite).spriteFrame = window.menu.iconADBig;
            }
        }
    },
    reset(_modeName, _index) {
        console.log(_modeName)
        this._modeName = _modeName;
        this.indexLabel.string = (_index + 1)
        for (var i = 0; i < this.nameParent.children.length; i++) {
            this.nameParent.children[i].active = (this.nameParent.children[i].name == _modeName)
        }
        for (var i = 0; i < this.jianTuParent.children.length; i++) {
            this.jianTuParent.children[i].active = (this.jianTuParent.children[i].name == _modeName)
        }
        var _unlockState = globalData.getUnlockState(_modeName);
        this.ADNode.active = !_unlockState;
        this.starArr = this.stars.children;
        for (var i = 0; i < 5; i++) {
            this.starArr[i].active = (i < globalData.starArr[_index]);
        }
    },
    touchStart() {
        cc.tween(this.node)
            .to(0.1, { scale: 0.9 })
            .start();
    },
    touchEnd() {
        cc.audioEngine.play(window.menu.btn, false, 1);
        cc.tween(this.node)
            .to(0.1, { scale: 1 })
            .call(() => {
                if (!this.ADNode.active) {
                    window.modeName = this._modeName;
                    cc.director.emit("过场动画", "gameScene");
                }
                else {
                    AD.showAD(this.unlockSucess, this);
                }
            })
            .start();
    },
    touchCancel() {


        cc.tween(this.node)
            .to(0.1, { scale: 1 })
            .start();
    },

    unlockSucess() {
        globalData.setUnlockState(this._modeName, true);
        this.ADNode.active = false;

    },
    // update (dt) {},
});
