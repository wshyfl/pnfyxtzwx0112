cc.Class({
    extends: cc.Component,

    properties: {
        da: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.shu = 0;
        this.xz = false;
    },

    dianzuo() {
        if (this.shu == 0) {
            return;
        }
        if(this.xz){
            return;
        }
        this.xz=true
        this.shu--;
        cc.tween(this.da)
            .by(0.15, { x: 720 })
            .delay(0.1)
            .call(()=>{
                this.xz=false;
            })
            .start()
    },

    dianyou() {
        if (this.shu == 1) {
            return;
        }
        if(this.xz){
            return;
        }
        this.xz=true
        this.shu++;
        cc.tween(this.da)
            .by(0.15, { x: -720 })
            .delay(0.1)
            .call(()=>{
                this.xz=false;
            })
            .start()
    },

    // update (dt) {},
});
