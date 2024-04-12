cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scheduleOnce(function() {
            // 这里的 this 指向 component
            this.dh();
        }, 1);
    },

    dh(){
        cc.tween(this.node)
            .to(0.15,{scaleY:1})
            .delay(5)
            .to(0.15,{scaleY:0})
            .start();
    }

    // update (dt) {},
});
