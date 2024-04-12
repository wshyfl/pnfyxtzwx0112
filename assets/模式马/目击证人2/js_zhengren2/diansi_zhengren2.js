cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
        fu: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        cc.director.on("取消事件",(id)=>{
            if(this.id==id){
                this.node.off(cc.Node.EventType.TOUCH_START, this.touchDown, this);
                this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
                this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
                this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
            }
        },this);
        this.a = 0;
        this.b = 0;
        this.xz = false;
    },

    touchDown(even) {

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
            if(this.id==0){
                this.fu.getComponent("mujizhengren2").wangyuanjing();
            }
            else if(this.id>=1&&this.id<=6){
                this.fu.getComponent("mujizhengren2").dian1(this.id);

                cc.director.emit("取消事件",this.id);
                this.yuan();
            }else if(this.id>6&&this.id<=11){
                this.fu.getComponent("mujizhengren2").dian2(this.id);

                this.yuan();
            }else{
                this.fu.getComponent("mujizhengren2").dian3(this.id);

                this.yuan();
            }
        }
    },

    yuan(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        cc.tween(this.node.getChildByName("yuan").getComponent(cc.Sprite))
            .to(0.15, { fillRange: 1 })
            .delay(1)
            .call(()=>{
                this.node.getChildByName("yuan").active=false;
            })
            .start()
    },

    // update (dt) {},
});
