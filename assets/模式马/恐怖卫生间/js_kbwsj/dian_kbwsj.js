cc.Class({
    extends: cc.Component,

    properties: {
        zongfu:cc.Node,
        id:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.a = 0;
        this.b = 0;
        this.xz = false;
    },

    touchDown(even) {
        if (this.zongfu.getComponent("guiyiweishengjian").shuohua) {
            return;
        }
        this.a = 0;
        this.b = 0;
        this.xz = true
    },

    touchMove(even) {
        if (this.xz) {
            this.a += Math.abs(even.getDelta().x);
            this.b += Math.abs(even.getDelta().y);
        }

    },

    touchEnd(even) {
        if (this.xz == false) {
            return;
        }
        this.xz = false
        if (Math.abs(this.a) < 5 && Math.abs(this.b) < 5) {
            if(this.id==3){
                // this.zongfu.getComponent("guiyiweishengjian").shuohua=true;
                this.node.off(cc.Node.EventType.TOUCH_START, this.touchDown, this);
                this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
                this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
                this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
                cc.tween(this.zongfu.getComponent("guiyiweishengjian").fuzhi)
                    .to(0.4,{y:-255})
                    .call(()=>{
                        this.dian()
                    })
                    .start()
            }else if(this.id==11){
                this.zongfu.getComponent("guiyiweishengjian").suguan.parent.active=true;
                this.node.off(cc.Node.EventType.TOUCH_START, this.touchDown, this);
                this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
                this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
                this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
                console.log("111111")
                cc.tween(this.zongfu.getComponent("guiyiweishengjian").suguan)
                    .to(0.2,{y:0})
                    .delay(0.1)
                    .call(()=>{
                        this.dian()
                    })
                    .start()
            }
            else{
                this.dian()
            }
            
        }
    },

    dian(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        cc.tween(this.node.getChildByName("yuan").getComponent(cc.Sprite))
            .to(0.15,{fillRange:1})
            .call(()=>{

            })
            .start()

        this.zongfu.getComponent("guiyiweishengjian").dian(this.id)
    },

    // update (dt) {},
});
