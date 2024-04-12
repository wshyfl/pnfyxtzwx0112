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
        this.a = 0;
        this.b = 0;
        this.xz = false;
        if(this.id==14){
            this.fu.getComponent("jiudianguaitan").kaidianshi(this.node);
        }
    },

    touchDown(even) {
        if (this.fu.getComponent("jiudianguaitan").shuohua) {
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
            switch (this.id) {
                case 0:
                    this.fu.getComponent("jiudianguaitan").siwang1();
                    break;
                case 1:
                    this.fu.getComponent("jiudianguaitan").maoyan();
                    break;
                case 2:
                    this.fu.getComponent("jiudianguaitan").zhongbiao();
                    break;
                case 3:
                    this.fu.getComponent("jiudianguaitan").dakaigaizi();
                    break;
                case 4:
                    this.fu.getComponent("jiudianguaitan").guopan();
                    break;
                case 5:
                    this.fu.getComponent("jiudianguaitan").siwang2(0);
                    break;
                case 6:
                    this.fu.getComponent("jiudianguaitan").siwang2(1);
                    break;
                case 7:
                    this.fu.getComponent("jiudianguaitan").siwang2(2);
                    break;
                case 8:
                    this.fu.getComponent("jiudianguaitan").kaimen();
                    break;
                case 9:
                    this.fu.getComponent("jiudianguaitan").jiubei();
                    break;
                case 10:
                    this.fu.getComponent("jiudianguaitan").jiuping();
                    break;
                case 11:
                    this.fu.getComponent("jiudianguaitan").yifu();
                    break;
                case 12:
                    this.fu.getComponent("jiudianguaitan").chuanghu();
                    break;
                case 13:
                    this.fu.getComponent("jiudianguaitan").kongtiao();
                    break;
                case 14:
                    
                    break;
                case 15:
                    this.fu.getComponent("jiudianguaitan").kaichouti1();
                    break;
                case 16:
                    this.fu.getComponent("jiudianguaitan").kaichouti2();
                    break;
                case 17:
                    this.fu.getComponent("jiudianguaitan").kaimen14();
                    break;
            }
        }
    },

    // update (dt) {},
});
