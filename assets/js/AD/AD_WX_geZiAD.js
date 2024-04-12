
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
  
        cc.tween(this.node)
        .repeatForever(
            cc.tween()
            .by(0.3,{scale:0.1})
            .by(0.3,{scale:-0.1})
        )
        .start();
        this.node.on("touchend",()=>{
            AD_WX.geZi();
        },this);
        if(AD.chanelName!=AD.chanelName1 || AD.chanelName!="WX")
        this.node.active=false;
    },

    start() {

    },

    // update (dt) {},
});
