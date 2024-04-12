// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        fu2: cc.Node,
        bg:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on("touchstart", this.touchDown, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
        this.node.on("touchcancel", this.touchEnd, this);
        this.xz = false;
        this.wu = false
        this.fu = this.node.parent;
        this.weix = this.node.x;
        this.weiy = this.node.y;

    },

    touchDown(event) {
        if (this.fu2.getComponent("dushiguaitan").tuo2 == false) {
            return
        }
        this.xz = true;
        var shi=this.fu.convertToWorldSpaceAR(this.node.position)
        var ju=this.bg.convertToNodeSpaceAR(shi)
        this.node.parent=this.bg;
        this.node.position=ju;
    },

    touchMove(event) {
        if (this.fu2.getComponent("dushiguaitan").tuo2 == false) {
            return
        }
        if (this.xz == false) {//未点击直接抬起
            return;
        }
        this.node.x += event.getDelta().x;
        this.node.y += event.getDelta().y;
    },

    touchEnd(event) {
        if (this.fu2.getComponent("dushiguaitan").tuo2 == false) {
            return
        }
        if (this.xz == false) {//未点击直接抬起
            return;
        }
        this.xz = false;
        
        if (this.wu) {
            this.fu2.getComponent("dushiguaitan").tuo2=false;
            this.node.x=230;
            this.node.y=-110;
            this.dh()
        } else {
            this.node.parent = this.fu
            cc.tween(this.node)
                .to(0.15, { x: this.weix, y: this.weiy })
                .start()
        }
    },

    dh(){
        this.a=cc.audioEngine.play(this.fu2.getComponent("dushiguaitan").yinxiao[9], true, 1);
        cc.tween(this.node)
            .to(0.4,{angle:30})
            .to(0.4,{angle:0})
            .to(0.4,{angle:30})
            .to(0.4,{angle:0})
            .call(()=>{
                this.fu2.getComponent("dushiguaitan").xiuli()
                cc.audioEngine.stop(this.a);
                this.node.destroy();
            })
            .start()
    },

    onCollisionEnter(other, self) {//普通碰撞开始
        this.wu = true;
    },

    onCollisionExit(other, self) {//普通碰撞结束
        this.wu = false;
    },

    // update (dt) {},
});
