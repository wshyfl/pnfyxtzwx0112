cc.Class({
    extends: cc.Component,

    properties: {
        id: -1,
        jingzi: cc.Node,
        jingshi:cc.Node,
        liandong:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.a = 0;
        this.b = 0;
        this.xz = false;
        this.shu = [137, 100, 185];

    },

    touchDown(even) {
        this.liandong.getComponent("tuocj_haozhai").ddd();
        this.a = 0;
        this.b = 0;
        this.xz = true;
        this.wei = this.node.position;
        this.wei2 = this.jingzi.position;
    },

    touchMove(even) {
        if (this.xz) {
            this.liandong.getComponent("tuocj_haozhai").yyy(even);
            this.a += Math.abs(even.getDelta().x);
            this.b += Math.abs(even.getDelta().y);

            this.node.x += even.getDelta().x;
            if (this.node.x > this.shu[this.id]) {
                this.node.x = this.shu[this.id];
            } else if (this.node.x < -this.shu[this.id]) {
                this.node.x = -this.shu[this.id];
            }
            
            var weix = this.node.x - this.wei.x;
            var weiy = this.node.y - this.wei.y;
            this.jingzi.x = this.wei2.x - weix;
            this.jingzi.y = this.wei2.y - weiy;
            this.jingshi.x=-this.jingzi.x+(35.5)
        }

    },

    touchEnd(even) {
        this.liandong.getComponent("tuocj_haozhai").ttt();
        this.xz = false
    },

    ddd(){
        this.a = 0;
        this.b = 0;
        this.xz = true;
        this.wei = this.node.position;
        this.wei2 = this.jingzi.position;
    },

    yyy(even){
        if (this.xz) {
            this.a += Math.abs(even.getDelta().x);
            this.b += Math.abs(even.getDelta().y);

            this.node.x += even.getDelta().x;
            if (this.node.x > 137) {
                this.node.x = 137;
            } else if (this.node.x < -137) {
                this.node.x = -137;
            }
            
            var weix = this.node.x - this.wei.x;
            var weiy = this.node.y - this.wei.y;
            this.jingzi.x = this.wei2.x - weix;
            this.jingzi.y = this.wei2.y - weiy;
            this.jingshi.x=-this.jingzi.x+(35.5)
        }
    },

    ttt(){
        this.xz = false
    },

    update(dt) {

    },
});
