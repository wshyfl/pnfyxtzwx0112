cc.Class({
    extends: cc.Component,

    properties: {
        zongfu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    dian(event,id){
        var ide=parseInt(id);
        if(this.zongfu.getComponent("yushimian").shijie[0].active==false&&ide>3&&ide<8){
            return;
        }

        cc.tween(this.node.getChildByName("yuan").getComponent(cc.Sprite))
            .to(0.15,{fillRange:1})
            .start()
        if(this.node.getComponent(cc.Button)){
            this.node.getComponent(cc.Button).interactable=false;
        }

        this.zongfu.getComponent("yushimian").dian(0,ide)
    },

    // update (dt) {},
});
