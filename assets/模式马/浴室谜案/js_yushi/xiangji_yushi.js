cc.Class({
    extends: cc.Component,

    properties: {
        shanbai:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable(){
        this.shanbai.active=true;
        this.shanbai.opacity=0;
        cc.audioEngine.play(this.node.parent.parent.getComponent("yushimian").yin[2], false, 1);
        cc.tween(this.shanbai)
            .to(0.15,{opacity:255})
            .to(0.15,{opacity:0})
            .call(()=>{
                this.shanbai.active=false;
            })
            .start()
    },

    onDisable(){
        // this.shanbai.active=true;
        // this.shanbai.opacity=0;
        // cc.audioEngine.play(this.node.parent.parent.getComponent("yushimian").yin[2], false, 1);
        // cc.tween(this.shanbai)
        //     .to(0.15,{opacity:255})
        //     .to(0.15,{opacity:0})
        //     .call(()=>{
        //         this.shanbai.active=false;
        //     })
        //     .start()
    },

    // update (dt) {},
});
