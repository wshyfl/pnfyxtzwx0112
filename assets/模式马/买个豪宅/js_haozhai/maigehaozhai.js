cc.Class({
    extends: cc.Component,

    properties: {
        baozhi:cc.Node,
        xiaoxiong:cc.Node,
        shijie:[cc.Node],
        tiao:cc.Node,
        yuyin:[cc.AudioClip],
        xianqian:cc.Label,
        donghua:sp.Skeleton,
        zi:cc.Label,
        shijian:cc.Label,
        zhezhao:cc.Node,
        dianxiong:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    },

    onDestroy() {
        cc.audioEngine.stopAll();
    },

    start () {
        this.xzxiong=false;
        this.qian=100000;
        this.a={"qian":100000};
        this.jiage=[10000,2505,600,5000,3000,5400,3500,8000,15000,17000,30000];
        this.kaishi()
        cc.director.on("游戏暂停",()=>{
            this.unscheduleAllCallbacks();
        },this);
        cc.director.on("游戏开始",()=>{
            this.jishi();
        },this);
        this.hua=[

            "看什么看，我常上报纸",
            "这样更接近自然风",
            "这花比较有情调！",
            "这样比较有氛围",
            "这样不好吗？有空一起拉屎",
            "只是一些石造艺术",
            "只是给窗帘敷了个面膜",
            "这是我珍藏的自画像",
            "我这邻居最不见外，就喜欢往我家里钻",
            "睡觉时可以当抱枕",
            "哎呀呀，可别说出去呀~",
            "这是我当初结婚时的屋子,大伙都抢着要",
        ];
        this.shuaqian=false;
        this.yinyue(11);
        this.beiyin=null;

    },

    fanhui(){
        cc.director.emit("显示暂停界面");
    },

    kaishi(){
        this.shi=120;
        this.shijian.string="120s";
        this.zhezhao.active=false;
        this.jishi();
    },

    jishi(){
        // this.schedule(function() {
        //     this.shi--;
        //     if(this.shi<0){
        //         this.shi=0;
        //     }
        //     this.shijian.string=this.shi+"s";
        //     if(this.shi<=20){
        //         this.hong();
        //     }else{
        //         this.bai();
        //     }
        //     if(this.shi==0){
        //         if(this.jiesuan){
        //             return;
        //         }
        //         this.jiesuan=true;
        //         this.zhezhao.active=true;
        //         cc.director.emit("游戏失败");
        //         console.log("游戏失败")
        //         this.unscheduleAllCallbacks();
        //     }
        // }, 1);
    },

    jiashi(){
        AD.showAD(this.hui,this)
    },

    hui(){
        this.shi=120;
        this.shijian.string="120s";
        this.bai();
    },

    hong(){
        cc.audioEngine.play(this.yuyin[13], false, 1);
        this.shijian.node.color=new cc.color(255,0,0,255);
        if(this.c==null){
            this.dong();
        }
    },

    dong(){
        this.c=cc.tween(this.shijian.node)
            .to(0.5,{scale:1.2})
            .to(0.5,{scale:1})
            .call(()=>{
                this.dong();
            })
        this.c.start();
    },

    bai(){
        this.shijian.node.color=new cc.color(255,255,255,255);
        if(this.c){
            this.c.stop();
            this.c=null;
        }
    },

    guandeng(){
        this.tiao.active=true;
        this.shijie[0].active=false;
        this.shijie[1].active=true;
        cc.audioEngine.play(this.yuyin[16], false, 1);
        if(this.beiyin==null){
            this.beiyin=cc.audioEngine.play(this.yuyin[15], true, 1);
        }
    },

    kaideng(){
        cc.audioEngine.play(this.yuyin[16], false, 1);
        this.tiao.active=false;
        this.shijie[1].active=false;
        this.shijie[0].active=true;
    },

    xiong(){
        if(this.xzxiong){
            return;
        }
        this.xzxiong=true;

        cc.tween(this.node)
            .delay(2)
            .call(()=>{
                cc.audioEngine.play(this.yuyin[14], false, 1);
                this.xiaoxiong.active=true;
            })
            .delay(1.6)
            .call(()=>{
                this.dianji(9)
                this.dianxiong.getComponent("dian_haozhai").quan()
                this.xiaoxiong.active=false;
            })
            .start()
    },

    baozhikai(){
        this.baozhi.active=true;
        this.dianji(0)
    },

    guanbaozhi(){
        this.baozhi.active=false;
    },

    pan(){
        if(this.qian<0){
            this.zhezhao.active=true;
            cc.audioEngine.play(this.yuyin[17], false, 1);
            this.xianzi("倒贴钱邀你来作伴好不好",3.3,null)
            cc.tween(this.node)
                .delay(3.5)
                .call(()=>{
                    cc.director.emit("游戏胜利")
                    console.log("游戏胜利")
                })
                .start()
        }
    },

    dianji(id){
        if(this.dongqian){
            this.dongqian.stop();
        }
        this.yinyue(id,this.pan);
        cc.audioEngine.play(this.yuyin[12], false, 1);
        if(this.donghua.animation!="流汗"){
            this.donghua.setAnimation(0, "流汗", true);
        }
        this.qian-=this.jiage[id];
        this.shuaqian=true;
        this.dongqian=cc.tween(this.a)
            .to(0.7,{qian:this.qian})
            .delay(0.1)
            .call(()=>{
                this.shuaqian=false;
            })
        this.dongqian.start()
    },

    yinyue(id, fang) {//音乐id，显示的Label
        if (this.yue) {
            cc.audioEngine.stop(this.yue);
        }
        this.yue = cc.audioEngine.play(this.yuyin[id], false, 1);
        this.xianzi(this.hua[id], cc.audioEngine.getDuration(this.yue), fang)
    },

    xianzi(str, num, fang) {//显示字，显示时间，显示的Label
        if (this.dh1) {
            this.dh1.stop();
        }

        if(str==null){
            return;
        }
        this.shuohua = true;

        this.zi.string = str;
        this.dh1 = cc.tween(this.zi.node.parent)
            // .to(0.15, { opacity: 255 })
            .delay(num)
            // .to(0.15, { opacity: 0 })
            .delay(0.15)
            .call(() => {
                this.shuohua = false;
                if (fang) {
                    fang.call(this);
                }
            })
        this.dh1.start()
    },

    update (dt) {
        if(this.shuaqian){
            this.xianqian.string=Math.floor(this.a.qian);
        }
    },
});
