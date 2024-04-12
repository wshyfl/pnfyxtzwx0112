

cc.Class({
    extends: cc.Component,

    properties: {
        up:cc.Node,
        down:cc.Node,
        showNode:cc.Node,
        sfxXiu:cc.AudioClip,
        sfxFoot:cc.AudioClip,
    },

    onLoad () {
        this.showNode.active = false;
    },

    start () {
        window.gouYin = true;//是否已经降罪犯勾引进客厅?
        // cc.director.emit("停止bgm");
        this.up.y = 840;
        this.down.y = -840;
        this.scheduleOnce(()=>{
            this.act();
        },0.5);
        this.anim = this.down.getComponent(sp.Skeleton);
      
    },
    act(){
        
        cc.tween(this.up)
        .call(()=>{
            cc.audioEngine.play(this.sfxXiu);
        })
        .to(0.2,{y:0})
        .delay(0.3)
        .call(()=>{
            cc.tween(this.down)
            .call(()=>{
                cc.audioEngine.play(this.sfxXiu);
            })
            .to(0.2,{y:0})
            .call(()=>{
                cc.audioEngine.play(this.sfxFoot);
                this.anim.setAnimation(0,"animation",false);
            })
            .delay(1.5)
            .call(()=>{
                this.showNode.active = true;
                this.scheduleOnce(()=>{
                    cc.director.emit("显示死亡","被发现");
                },3)
            })
            .start();
        })
        .start();
    },

    // update (dt) {},
});
