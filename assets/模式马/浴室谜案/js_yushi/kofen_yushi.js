cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    dian() {
        if(this.aa){
            this.aa.stop();
        }
        if(this.bb){
            this.bb.stop();
        }
        this.node.y = 490;
        this.node.opacity=0;
        this.aa=cc.tween(this.node)
            .to(0.1, { opacity: 255 })
        this.aa.start()
        this.bb=cc.tween(this.node)
            .to(0.5, { y: 505 })
            .to(0.2, { y: 510, opacity: 0 })
        this.bb.start()
    },

    // update (dt) {},
});
