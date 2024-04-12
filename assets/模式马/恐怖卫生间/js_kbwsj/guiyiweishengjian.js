cc.Class({
    extends: cc.Component,

    properties: {
        dengguang: [cc.Node],
        wenzi: cc.Label,
        yuyin: [cc.AudioClip],
        kuang: [cc.Node],
        tu: [cc.SpriteFrame],
        muqiao: cc.Node,
        heimu: cc.Node,
        zhezhao: cc.Node,
        shijie: [cc.Node],
        maoyan: cc.Node,
        fuzhi: cc.Node,
        suo: [cc.Node],
        huayu: [cc.Node],
        kuqi: cc.Node,
        suguan: cc.Node,
        ziji: cc.Node,
        baozhi: cc.Node,
        shijian:cc.Label,
        yin:[cc.AudioClip],
        dh:cc.Prefab,
        tongguan:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    },

    onDestroy() {
        cc.audioEngine.stopAll();
    },

    start() {
        this.dengdh1();
        this.kaishi();
        cc.audioEngine.play(this.yin[6], true, 1);
        cc.director.on("游戏暂停",()=>{
            this.unscheduleAllCallbacks();
        },this);
        cc.director.on("游戏开始",()=>{
            // this.jishi();
        },this);
        this.jiesuan=false;
        this.shuohua = false;
        this.jieduan1 = false;
        this.jieduan2 = false;
        this.jieduan3 = false;
        this.hua = [
            "肚子好痛，去上个厕所",
            "室内怎么还有乌鸦",
            "地上为什么还有个大洞",
            "为什么外面变得这么破旧了",
            "得想办法过去才行",
            "怎么感觉一切都不一样了",
            "门口上还有封条，是发生什么了吗",
            "好好的干嘛上锁",
            "不管了，忍不住了",
            "厕所怎么变成男厕所了",
            "谁在里面",
            "怎么还有绳子在这",
            "怎么还有哭声",
            "凳子像是被踢倒了",
            "这是谁留下的呢",
            "这个女孩好眼熟啊",
            "是有人在里面吧",
            "宿管阿姨我上个厕所就回",
            "这镜子里的人还是我吗",
        ];
        this.yinyue(0);
        this.ming = [
            "乌鸦",
            "奇怪的坑",
            "老旧墙",
            "封条",
            "锁",
            "男厕所",
            "奇怪的人",
            "凳子",
            "绳子",
            "涂鸦",
            "哭声",
            "禁止回头",
            "奇怪的自己",
            "报纸",
            "头发",
        ]
    },

    fanhui(){
        cc.director.emit("显示暂停界面");
    },

    kaishi(){
        this.shi=120;
        this.shijian.string="120s";
        this.zhezhao.active=false;
        // this.jishi();
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
        cc.audioEngine.play(this.yin[0], false, 1);
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

    guochang1() {
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .delay(1)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.yinyue(5, () => {
                    cc.tween(this.heimu)
                        .to(0.5, { opacity: 0 })
                        .call(() => { this.heimu.active = false; })
                        .start()
                })
                this.kuang[0].parent.active = false;
                this.kuang[1].parent.active = true;
                this.shijie[0].active = false;
                this.shijie[1].active = true;
            })
            .start()
    },


    dianzoulang() {
        this.yinyue(19)
    },

    guochang2() {
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .delay(0.5)
            .to(0.5, { opacity: 255 })
            .call(() => {
                cc.audioEngine.play(this.yin[4], false, 1);
                cc.tween(this.heimu)
                    .delay(2)
                    .to(0.5, { opacity: 0 })
                    .call(() => { this.heimu.active = false; })
                    .start()

                this.kuang[1].parent.active = false;
                this.kuang[2].parent.active = true;
                this.shijie[1].active = false;
                this.shijie[2].active = true;
            })
            .start()
    },

    pan() {/////判断关卡胜利
        if (this.jieduan1 == true&&this.jieduan2==false) {
            var zi = this.kuang[0].children;
        } else if (this.jieduan1 == true&&this.jieduan2 == true&&this.jieduan3==false) {
            var zi = this.kuang[1].children;
        } else {
            var zi = this.kuang[2].children;
        }
        this.suguan.parent.active = false;
        this.ziji.active = false;
        this.baozhi.active = false;
        var k1 = null;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                k1 = zi[i];
                break;
            }
        }
        if (k1) {

        } else {
            if (this.jieduan3 == true) {
                this.shengli();

            }
        }
    },

    pan2() {
        if (this.jieduan1 == false) {
            var zi = this.kuang[0].children;
        } else if (this.jieduan2 == false) {
            var zi = this.kuang[1].children;
        } else {
            var zi = this.kuang[2].children;
        }

        var k1 = null;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                k1 = zi[i];
                break;
            }
        }
        if (k1) {

        } else {
            if (this.jieduan1 == false) {
                this.jieduan1=true;
            } else if (this.jieduan2 == false) {
                this.jieduan2=true;
            } else {
                this.jieduan3=true;
            }
        }
    },

    shengli() {
        if(this.jiesuan){
            return;
        }
        this.jiesuan=true;
        this.unscheduleAllCallbacks();
        this.zhezhao.active = true;
        this.tongguan.active=true;
        this.tongguan.opacity=0;
        cc.tween(this.tongguan)
            .delay(0.5)
            .to(0.5,{opacity:255})
            .call(() => {
                this.jsyy=cc.audioEngine.play(this.yin[5], false, 1);

            })
            .delay(4)
            .call(()=>{
                cc.director.emit("游戏胜利");
                console.log("游戏胜利");
            })
            .start()
    },

    qiaosuo() {
        this.yinyue(8)
        this.suo[0].active = false;
        this.suo[1].active = true;
        cc.tween(this.node)
            .delay(1.7)
            .call(() => {
                this.suo[1].active = false;
                this.guochang2()
            })
            .start()
    },

    dian(ide) {
        cc.audioEngine.play(this.yin[1], false, 1);
        switch (ide) {
            case 0:
                this.yinyue(1, this.pan)
                break
            case 1:
                this.yinyue(2, this.pan)
                break;
            case 2:
                this.yinyue(3, this.pan)
                break;
            case 3:
                this.yinyue(6, this.pan)
                break;
            case 4:
                this.yinyue(7, this.pan)
                break;
            case 5:
                this.yinyue(9, this.pan)
                break;
            case 6:
                this.maoyan.active = true;
                cc.tween(this.node)
                    .delay(2)
                    .call(() => {
                        this.maoyan.active = false;
                    })
                    .start()
                this.yinyue(10, this.pan)
                break;
            case 7:
                this.yinyue(13, this.pan)
                break;
            case 8:
                this.yinyue(11, this.pan)
                break;
            case 9:
                this.yinyue(14, this.pan)
                break;
            case 10:
                this.kuqi.active = true;
                this.yinyue(12, this.pan)
                break;
            case 11:
                this.yinyue(17, this.pan)
                break;
            case 12:
                this.yinyue(18, this.pan)
                this.ziji.active = true;
                cc.audioEngine.play(this.yin[3], false, 1);
                break;
            case 13:
                this.yinyue(15, this.pan)
                this.baozhi.active = true;
                break;
            case 14:
                this.yinyue(16, this.pan)
                break;
        }
        if (ide < 3) {
            this.pandian1(ide);
        } else if (ide < 7) {
            this.pandian2(ide);
        } else {
            this.pandian3(ide);
        }
    },

    muban() {
        this.muqiao.active = true;
        this.guochang1();
        cc.audioEngine.play(this.yin[2], false, 1);
    },

    pandian1(ide) {
        var zi = this.kuang[0].children
        this.k1 = null;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                this.k1 = zi[i];
                break;
            }
        }

        var aa=cc.instantiate(this.dh);
        aa.parent=this.k1;
        aa.position=cc.v2(0,0);

        this.k1.getChildByName("tu").active = true;
        this.k1.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[ide];
        this.k1.getChildByName("zi").getComponent(cc.Label).string = this.ming[ide];
        this.pan2()
    },

    pandian2(ide) {
        var zi = this.kuang[1].children
        this.k1 = null;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                this.k1 = zi[i];
                break;
            }
        }

        var aa=cc.instantiate(this.dh);
        aa.parent=this.k1;
        aa.position=cc.v2(0,0);

        this.k1.getChildByName("tu").active = true;
        this.k1.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[ide];
        this.k1.getChildByName("zi").getComponent(cc.Label).string = this.ming[ide];
        this.pan2()
    },

    pandian3(ide) {
        var zi = this.kuang[2].children
        this.k1 = null;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                this.k1 = zi[i];
                break;
            }
        }

        var aa=cc.instantiate(this.dh);
        aa.parent=this.k1;
        aa.position=cc.v2(0,0);

        this.k1.getChildByName("tu").active = true;
        this.k1.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[ide];
        this.k1.getChildByName("zi").getComponent(cc.Label).string = this.ming[ide];
        this.pan2()
    },

    dengdh1() {
        cc.tween(this.dengguang[0])
            .delay(0.4)
            .call(() => {
                this.dengguang[0].opacity = 0;
            })
            .delay(0.4)
            .call(() => {
                this.dengguang[0].opacity = 255;
            })
            .delay(0.1)
            .call(() => {
                this.dengguang[0].opacity = 0;
            })
            .delay(0.1)
            .call(() => {
                this.dengguang[0].opacity = 255;
            })
            .delay(0.1)
            .call(() => {
                this.dengguang[0].opacity = 0;
            })
            .delay(0.1)
            .call(() => {
                this.dengguang[0].opacity = 255;
                this.dengdh1();
            })
            .start()
    },

    yinyue(id, fang) {//音乐id，显示的Label
        if (this.yue) {
            cc.audioEngine.stop(this.yue);
        }
        this.yue = cc.audioEngine.play(this.yuyin[id], false, 1);
        this.xianzi(id, this.hua[id], cc.audioEngine.getDuration(this.yue), fang)
    },

    xianzi(id, str, num, fang) {//显示字，显示时间，显示的Label
        if (this.dh1) {
            this.dh1.stop();
        }
        // this.shuohua = true;
        for (var i = 0; i < this.huayu.length; i++) {
            this.huayu[i].active = false;
        }
        this.huayu[id].active = true;
        this.dh1 = cc.tween(this.wenzi.node.parent)
            .to(0.15, { opacity: 255 })
            .delay(num)
            .to(0.15, { opacity: 0 })
            .delay(0.15)
            .call(() => {
                this.shuohua = false
                if (fang) {
                    fang.call(this);
                }
            })
        this.dh1.start()
    },

    // update (dt) {},
});
