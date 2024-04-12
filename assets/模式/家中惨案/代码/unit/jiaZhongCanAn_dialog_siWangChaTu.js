

cc.Class({
    extends: cc.Component,

    properties: {
        left:cc.Node,
        right:cc.Node,
        showNode:cc.Node,
        sfxXiu:cc.AudioClip,
    },

    onLoad () {
        this.showNode.active = false;
    },

    start () {
        cc.director.emit("停止bgm");
        this.left.x = -720;
        this.right.x = 720;
        this.scheduleOnce(()=>{
            this.act();
        },0.5)
    },
    act(){
        
        cc.tween(this.left)
        .call(()=>{
            cc.audioEngine.play(this.sfxXiu);
        })
        .to(0.2,{x:0})
        .delay(0.3)
        .call(()=>{
            cc.tween(this.right)
            .call(()=>{
                cc.audioEngine.play(this.sfxXiu);
            })
            .to(0.2,{x:0})
            .delay(1.5)
            .call(()=>{
                this.showNode.active = true;
            })
            .start();
        })
        .start();
    },

    // update (dt) {},
});
