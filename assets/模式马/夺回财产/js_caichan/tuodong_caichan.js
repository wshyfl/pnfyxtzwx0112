cc.Class({
    extends: cc.Component,

    properties: {
        fu: cc.Node,
        id: -1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.wei = this.node.position;
        this.shang = this.node.parent;
        this.xz = false;
        this.wu = null;
    },

    touchDown(even) {
        this.xz = true;
        var shi = this.node.parent.convertToWorldSpaceAR(this.node.position)
        var ju = this.fu.convertToNodeSpaceAR(shi);
        this.node.parent = this.fu;
        this.node.position = ju;
    },

    touchMove(even) {
        if (this.xz) {
            this.node.x += even.getDelta().x;
            this.node.y += even.getDelta().y;
        }

    },

    touchEnd(even) {
        if (this.xz) {
            if (this.wu) {
                if (this.id == 10) {
                    this.fu.getComponent("duohuicaichan").cahetao();
                } else if (this.id == 20) {
                    this.fu.getComponent("duohuicaichan").poren(this.wu.node.name);
                } else if (this.id == 30) {
                    this.fu.getComponent("duohuicaichan").jianshafa();
                }

            }
            var shi = this.shang.convertToWorldSpaceAR(this.wei)
            var ju = this.fu.convertToNodeSpaceAR(shi);
            cc.tween(this.node)
                .to(0.15, { x: ju.x, y: ju.y })
                .call(() => {

                    var shi = this.node.parent.convertToWorldSpaceAR(this.node.position)
                    var ju = this.shang.convertToNodeSpaceAR(shi);
                    this.node.parent = this.shang;
                    this.node.position = ju;
                })
                .start()

        }
        this.xz = false;

    },

    onCollisionEnter(other, self) {//普通碰撞开始
        if (other.tag == this.id)
            this.wu = other;
    },

    onCollisionExit(other, self) {//普通碰撞结束
        if (other.tag == this.id)
            this.wu = null;
    },

    // update (dt) {},
});
