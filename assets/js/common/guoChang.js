

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
    },

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        cc.director.on("过场动画", (_nextScene) => {
            this._nextScene = _nextScene;
            this.close();
        }, this)
        this.node.position = cc.v2(360, cc.winSize.height / 2);
        this.bg.active = false;
        cc.director.on("打开过场动画", this.openFunc,this);
        // this.zheZhao.active = false;
    },

    close() {
        var self = this;
        this.bg.active = true;
        this.bg.opacity = 0;
        cc.tween(this.bg)
            .to(0.2, { opacity: 255 })
            .call(() => {
                cc.director.loadScene(this._nextScene, () => {
                    if (self._nextScene != "gameScene")
                        self.openFunc();
                });
            })
            .start();

    },
    openFunc() {
        console.log("open");
        cc.tween(this.bg)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this.bg.active = false;
            })
            .start();
    },

    // update (dt) {},
});
