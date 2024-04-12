
cc.Class({
    extends: cc.Component,

    properties: {
        showNode: cc.Node,
        anim: sp.Skeleton,
        sfxHuXi: cc.AudioClip,
        sfxHanJiao: cc.AudioClip,
        mouth_close: cc.Node,
        mouth_open: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.showNode.active = false;
        this.scheduleOnce(() => {
            this.showNode.active = true;
        }, 0.5);
        this.mouth_close.active = this.mouth_open.active = false;
    },
    btnCallBack(event, type) {
        switch (type) {
            case "否":
                this.showNode.active = false;
                cc.director.emit("停止bgm");
                cc.tween(this.node)
                    .call(() => {
                        this.mouth_close.active = true;
                    })
                    .delay(0.4)
                    .call(() => {
                        this.mouth_open.active = true;
                        cc.audioEngine.play(this.sfxHanJiao, false, 1);
                    })
                    .delay(0.8)
                    .call(() => {
                        cc.director.emit("显示死亡", "死亡插图");
                    })
                    .start();

                break;
            case "是":
                this.showNode.active = false;
                this.anim.setAnimation(0, "深呼吸", true);
                cc.audioEngine.play(this.sfxHuXi, false, 1);
                this.scheduleOnce(() => {
                    this.node.active = false;
                }, 4)
                break;
        }
    },

    // update (dt) {},
});
