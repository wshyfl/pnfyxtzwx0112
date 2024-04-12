cc.Class({
    extends: cc.Component,

    properties: {
        shizhen:cc.Node,
        qiangzhen:[cc.Node],
        yinxiao: cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    },

    touchDown(even) {
        this.xz = true;
        this.yin=cc.audioEngine.play(this.yinxiao, true, 1);
    },

    touchMove(even) {
        if (this.xz) {
            var ju=this.node.parent.convertToNodeSpaceAR(even.getLocation())
            var a=this.getRadian(ju,this.node.position)
            if(a-this.node.angle<=-300){
                this.shizhen.angle+=(a+360-this.node.angle)/12;
            }else if(a-this.node.angle>=300){
                this.shizhen.angle+=(a-(this.node.angle+360))/12;
            }else{
                this.shizhen.angle+=(a-this.node.angle)/12;
            }
            if(this.shizhen.angle>=360){
                this.shizhen.angle-=360;
            }else if(this.shizhen.angle<0){
                this.shizhen.angle+=360;
            }
            this.node.angle=a;
        }
    },

    touchEnd(even) {
        this.xz = false
        cc.audioEngine.stop(this.yin);
    },

    getRadian(pos1, pos2) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var px = pos1.x;
        var py = pos1.y;
        var mx = pos2.x;
        var my = pos2.y;
        if(pos1.x==pos2.x&&pos1.y==pos2.y){
            return 0;
        }
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

        if (mx > px && my > py) {//鼠标在第四象限
            angle = 180 - angle;
        }

        if (mx == px && my > py) {//鼠标在y轴负方向上
            angle = 180;
        }

        if (mx > px && my == py) {//鼠标在x轴正方向上
            angle = 90;
        }

        if (mx < px && my > py) {//鼠标在第三象限
            angle = 180 + angle;
        }

        if (mx < px && my == py) {//鼠标在x轴负方向
            angle = 270;
        }

        if (mx < px && my < py) {//鼠标在第二象限
            angle = 360 - angle;
        }
        return angle;//角度转弧度
    },

    update (dt) {
        this.qiangzhen[0].angle=this.node.angle;
        this.qiangzhen[1].angle=this.shizhen.angle;
    },
});
