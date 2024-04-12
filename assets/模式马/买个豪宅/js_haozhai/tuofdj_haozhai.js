cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        fu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable() {

    },

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.xz = false;
        this.wu=null
        this.a=0;
        this.b=0;
        // this.wei=this.node.position;
        // this.wei2=this.bg.position;
    },

    touchDown(event) {
        this.xz = true;
        this.a=0;
        this.b=0;
    },

    touchMove(event) {
        if (this.xz) {
            this.node.x += event.getDelta().x;
            this.node.y += event.getDelta().y;
            this.a += event.getDelta().x;
            this.b += event.getDelta().y;

            this.bg.x -= event.getDelta().x;
            this.bg.y -= event.getDelta().y;
        }
    },

    touchEnd(event) {
        this.xz = false;
    },

    onCollisionEnter(other, self) {//普通碰撞开始
        // this.wu=other;
        console.log(other.tag)
        if(other.tag==50){
            this.fu.getComponent("maigehaozhai").xiong()
        }
    },

    onCollisionExit(other, self) {//普通碰撞结束
        // this.wu=null;
    },

    dian(){
        // if(Math.abs(this.a)>=5||Math.abs(this.b)>=5){
        //     return;
        // }
        // if(this.wu){
        //     if(this.wu.node.getChildByName("yuan").getComponent(cc.Sprite).fillRange==0){
        //         this.wu.node.getComponent("dian_yushi").dian(0,this.wu.tag)
        //     }

        // }else{
        //     this.fu.getComponent("yushimian").kofen();
        // }
    },

    update (dt) {

    },
});
