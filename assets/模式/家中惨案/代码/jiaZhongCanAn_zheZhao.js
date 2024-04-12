
cc.Class({
    extends: cc.Component,

    properties: {
        delayTime:1,
        destroySelf:false,
    },
    // onLoad () {},

    start () {
     
    },
    onDisable(){
        this.node.scale = 1;
        this.node.opacity = 255;
    },
    onEnable(){
        this.node.scale = 1;
        this.node.opacity = 255;
        cc.director.emit("脚步声")
        cc.tween(this.node)
        .delay(this.delayTime)
        .to(1,{opacity:0})
        .call(()=>{
            this.node.scale = 0;
            if(this.destroySelf)
            this.node.destroy();
        })
        .start();
    },

    update (dt) {
    },
});
