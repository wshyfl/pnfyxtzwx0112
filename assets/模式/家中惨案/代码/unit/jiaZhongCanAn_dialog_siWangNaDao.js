

cc.Class({
    extends: cc.Component,

    properties: {
        sfxJianJiao:cc.AudioClip,
    },
    // onLoad () {},

    start () {
        cc.director.emit("停止bgm");
        this.anim = this.node.children[0].getComponent(sp.Skeleton);
        this.anim.setAnimation(0,"animation",false);
        this.scheduleOnce(()=>{
            cc.audioEngine.play(this.sfxJianJiao);
        },0.5)
        this.scheduleOnce(()=>{
            console.log("游戏失败")
            cc.director.emit("游戏失败");
        },3)
    },

    // update (dt) {},
});
