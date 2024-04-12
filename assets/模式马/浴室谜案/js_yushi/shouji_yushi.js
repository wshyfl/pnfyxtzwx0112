cc.Class({
    extends: cc.Component,

    properties: {
        id:-1,
        zhezhao:cc.Node,
        fu:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.xz=false;
        this.weix=[-100,100];
        this.weiy=[-360,-360]
    },

    dian(){
        if(this.xz){
            return;
        }
        this.xz=true;
        cc.audioEngine.play(this.fu.getComponent("yushimian").yin[3], false, 1);
        this.zhezhao.active=true;
        var shi=this.node.parent.convertToWorldSpaceAR(this.node.position);
        var ju=this.fu.convertToNodeSpaceAR(shi);
        this.node.parent=this.fu;
        this.node.position=ju;

        cc.tween(this.node)
            .to(0.15,{x:this.weix[this.id],y:this.weiy[this.id]})
            .call(()=>{
                this.zhezhao.active=false;
                this.fu.getComponent("yushimian").xiaoanzhe(this.id)
                this.node.destroy();
            })
            .start()
    },
    

    // update (dt) {},
});
