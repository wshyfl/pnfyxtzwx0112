cc.Class({
    extends: cc.Component,

    properties: {
        chuangtu: cc.Sprite,
        chuangbg: cc.SpriteFrame,
        hai: sp.Skeleton,
        hai1: sp.Skeleton,
        ba: sp.Skeleton,
        zi: cc.Label,//女孩1
        zi1: cc.Label,//女孩2
        zi2: cc.Label,//爸爸
        zi3: cc.Label,//女孩3
        zi4: cc.Label,//爸爸2
        yin: [cc.AudioClip],
        tu: [cc.SpriteFrame],
        dianzong: cc.Node,
        tx: cc.Prefab,
        dian: cc.Node,
        heimu: cc.Node,
        dayao: cc.Node,
        shijie: [cc.Node],
        shouji: cc.Node,
        shouji2: cc.Node,
        liebiao: cc.ScrollView,
        leishui: [cc.Node],
        zhezhao: cc.Node,
        zuizi: cc.Label,
        shijian: cc.Label,
        jie: cc.Node,
        yinxiao: [cc.AudioClip],
        sjdx:cc.Node,
        xiaoshou:cc.Node,
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
        cc.director.on("游戏暂停", () => {
            this.unscheduleAllCallbacks();
        }, this);
        cc.director.on("游戏开始", () => {
            this.jishi();
        }, this);
        cc.audioEngine.play(this.yinxiao[2], true, 1);
        this.hua = [
            "妈妈每次都会给我钱,但是我想省下来买车票去看看他们",
            "考零分时就能听到爸爸妈妈的声音了",
            "这个书包是爸爸送我的生日礼物,我一直不舍得换",
            "我想多赚点钱,这样才能快点买车票去找爸爸妈妈",
            "我可厉害了,这件校服就是我自己补的",
            "我拿了很多奖状,但是爸爸妈妈还是没有回来",
            "这次爸爸回来打算把家里的钱拿去做一笔生意",
            "不要担心,爸爸只是感冒了",
            "爸爸这次回来特地印了一张全家福给你",
            "这是你妈妈给你买的礼物",
            "你妈妈去了一个很远的地方出差了",
            "爸爸要和妈妈一起去出差,以后你一个人要照顾好自己",
            "爸爸妈妈什么时候才回来啊",//12
            "难道是爸爸妈妈回来了吗",
            "爸爸你终于回来啦！妈妈呢？",
            "已经很晚了，早点睡吧，爸爸明天就要走了",
            "爸爸已经走了，以后又是一个人了",
            "麻烦把钱全部都转到这个账号上，没错，身份证是我女儿的",
            "闺女以后爸爸妈妈不在了，一定要照顾好自己啊",
        ];
        this.jishu = 0;
        this.gun = false;
        this.ming = ["泡面", "试卷", "书包", "易拉罐", "校服", "奖状", "存折", "药瓶", "全家福", "小熊", "手机", "行李"];
        this.kaishi()
        cc.tween(this.node)
            .delay(0.4)
            .call(() => {
                this.yinyue(12, this.zi, this.hai)
            })
            .start()
    },

    guanshou(){
        this.xiaoshou.active=false;
    },
    kaishi() {
        this.shi = 180;
        this.shijian.string = "180s";
        this.zhezhao.active = false;
        this.jishi();
    },

    jishi() {
        // this.schedule(function () {
        //     this.shi--;
        //     if (this.shi < 0) {
        //         this.shi = 0;
        //     }
        //     this.shijian.string = this.shi + "s";
        //     if (this.shi <= 20) {
        //         this.hong();
        //     } else {
        //         this.bai();
        //     }
        //     if (this.shi == 0) {
        //         if (this.jiesuan) {
        //             return;
        //         }
        //         this.jiesuan = true;
        //         this.zhezhao.active = true;
        //         cc.director.emit("游戏失败");
        //         console.log("游戏失败")
        //         this.unscheduleAllCallbacks();
        //     }
        // }, 1);
    },

    jiashi() {
        AD.showAD(this.hui, this)
    },

    hui() {
        this.shi = 180;
        this.shijian.string = "180s";
        this.bai();
    },

    hong() {
        cc.audioEngine.play(this.yinxiao[8], false, 1);
        this.shijian.node.color = new cc.color(255, 0, 0, 255);
        if (this.c == null) {
            this.dong();
        }
    },

    dong() {
        this.c = cc.tween(this.shijian.node)
            .to(0.5, { scale: 1.2 })
            .to(0.5, { scale: 1 })
            .call(() => {
                this.dong();
            })
        this.c.start();
    },

    bai() {
        this.shijian.node.color = new cc.color(255, 255, 255, 255);
        if (this.c) {
            this.c.stop();
            this.c = null;
        }
    },

    fanhui() {
        cc.director.emit("显示暂停界面");
    },

    kaishouji2() {
        this.shouji2.parent.active = true;
        cc.tween(this.shouji2)
            .to(0.2, { y: 80 })
            .start()
    },

    dianchuang() {
        this.chuangtu.spriteFrame = this.chuangbg;
        cc.audioEngine.play(this.yinxiao[3], false, 1);
    },

    tuobao() {
        this.dian.getComponent("diansi_liushou").quan();
        this.dianji(12)
    },

    yaoping(str) {
        this.linshi = str;
        this.dayao.active = true;
        this.dayao.scale = 0.6;
        cc.tween(this.dayao)
            .to(0.15, { scale: 1 })
            .start()
    },

    guanyao() {
        this.dayao.active = false;
        this.linshi.quan();
        this.dianji(this.linshi.id);
    },

    kaishouji(str) {
        this.linshi = str;
        this.shouji.active = true;
        this.shouji.scale = 0.6;
        cc.tween(this.shouji)
            .to(0.15, { scale: 1 })
            .start()
    },

    guansj() {
        this.shouji.active = false;
        this.linshi.quan();
        this.dianji(this.linshi.id);
    },

    dianji(id) {
        this.zijie = this.dianzong.children;
        var ju = null;
        for (var i = 0; i < this.zijie.length; i++) {
            if (this.zijie[i].getChildByName("tu").active == false) {
                ju = this.zijie[i];
                break;
            }
        }
        cc.audioEngine.play(this.yinxiao[7], false, 1);
        this.jishu++;
        var aa = cc.instantiate(this.tx);
        aa.parent = ju;
        aa.position = cc.v2(0, 0);

        if (this.jishu <= 6) {
            this.yinyue(id - 1, this.zi, this.hai, this.pan)
        } else {
            this.yinyue(id - 1, this.zi2, this.ba, this.pan)
        }

        ju.getChildByName("tu").active = true;
        ju.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[id - 1];
        ju.getChildByName("zi").getComponent(cc.Label).string = this.ming[id - 1];
    },

    pan() {
        if (this.jishu == 6) {
            this.qiehuan(0)
        } else if (this.jishu == 12) {
            this.qiehuan(1)
        }
    },

    qiehuan(id) {
        this.heimu.active = true;
        this.heimu.opacity = 0;
        if (id == 0) {
            this.scheduleOnce(() => {
                cc.audioEngine.play(this.yinxiao[4], false, 1);
                this.scheduleOnce(() => {
                    this.yinyue(13, this.zi, this.hai, () => {
                        cc.audioEngine.play(this.yinxiao[1], false, 1);
                        cc.tween(this.heimu)
                            .to(0.7, { opacity: 255 })
                            .call(() => {
                                this.shijie[0].active = false;
                                this.shijie[1].active = true;
                            })
                            .to(0.7, { opacity: 0 })
                            .call(() => {
                                this.heimu.active = false;
                                this.yinyue(14, this.zi1, this.hai1, () => { })
                            })
                            .start()
                    })
                }, 1.2);
            }, 0.6);


        } else if (id == 1) {
            this.yinyue(15, this.zi2, this.ba, () => {
                cc.tween(this.heimu)
                    .to(0.7, { opacity: 255 })
                    .call(() => {
                        cc.audioEngine.play(this.yinxiao[6], false, 1);
                        this.shijie[1].active = false;
                        this.shijie[2].active = true;
                    })
                    .delay(2.4)
                    .to(0.7, { opacity: 0 })
                    .call(() => {
                        cc.audioEngine.play(this.yinxiao[0], false, 1);
                        this.scheduleOnce(() => {
                            this.heimu.active = false;
                            this.yinyue(16, this.zi3, null, () => {
                                this.qiehuan(2)
                            })
                        }, 4.2);
                    })
                    .start()
            })
        } else if (id == 2) {
            cc.tween(this.heimu)
                .to(0.7, { opacity: 255 })
                .call(() => {
                    this.shijie[2].active = false;
                    this.shijie[3].active = true;
                    this.sjdh();
                })
                .to(0.7, { opacity: 0 })
                .call(() => {
                    this.heimu.active = false;
                    this.juqing()
                })
                .start()
        }
    },

    sjdh(){
        cc.tween(this.sjdx)
            .to(0.5,{scale:1.1})
            .to(0.5,{scale:1})
            .call(()=>{
                this.sjdh();
            })
            .start()

    },

    juqing() {
        this.yinyue(17, this.zi4,)
        this.zi4.string = "麻烦把钱全部都转到这个账号上,没错,身份证是我女儿的"
        cc.tween(this.zi4.node.parent)
            .to(0.15, { opacity: 255 })
            .call(() => {
                this.gun = true;
            })
            .start()
    },

    yinyue(id, zi, dong, fang) {//音乐id，显示的Label
        if (this.yue) {
            cc.audioEngine.stop(this.yue);
        }
        this.yue = cc.audioEngine.play(this.yin[id], false, 1);
        if (id == 17) {
            return
        }
        this.xianzi(this.hua[id], cc.audioEngine.getDuration(this.yue), zi, dong, fang)
    },

    xianzi(str, num, zi, dong, fang) {//显示字，显示时间，显示的Label
        if (this.dh1) {
            this.dh1.stop();
            if (this.quezi != zi) {
                this.quezi.node.parent.opacity = 0;
            }
            if (this.quedong) {
                this.quedong.setAnimation(0, "daiji", true);
            }
        }
        this.quezi = zi;
        this.quedong = dong
        if (dong) {
            dong.setAnimation(0, "shuohua", true);
        }

        zi.string = str;
        this.dh1 = cc.tween(zi.node.parent)
            .to(0.15, { opacity: 255 })
            .delay(num)
            .to(0.15, { opacity: 0 })
            .call(() => {
                if (dong) {
                    dong.setAnimation(0, "daiji", true);
                }
            })
            .delay(0.15)
            .call(() => {
                if (fang) {
                    fang.call(this);
                }
            })
        this.dh1.start()
    },

    juqing2() {
        this.zhezhao.active = true;
        cc.audioEngine.play(this.yinxiao[5], false, 1);
        cc.tween(this.leishui[2])
            .to(0.6, { scale: 1 })
            .start()
        cc.tween(this.leishui[1])
            .delay(1)
            .call(()=>{
                cc.audioEngine.play(this.yinxiao[5], false, 1);
            })
            .to(0.6, { scale: 1 })

            .start()
        cc.tween(this.leishui[0])
            .delay(1.7)
            .call(()=>{
                cc.audioEngine.play(this.yinxiao[5], false, 1);
            })
            .to(0.4, { scale: 1 })
            .call(() => {
                this.yinyue(18, this.zuizi, null, () => {
                    this.jieshu()
                })
            })
            .start()
    },

    jieshu() {
        this.jie.active = true;
        this.jie.opacity = 0;
        this.unscheduleAllCallbacks();
        cc.tween(this.jie)
            .to(1, { opacity: 255 })
            .delay(4)
            .call(() => {
                console.log("游戏胜利")
                cc.director.emit("游戏胜利")
            })
            .start()
    },

    update(dt) {
        if (this.gun) {
            var a = this.liebiao.getContentPosition()
            if (a.y >= 870) {
                this.gun = false;
                this.juqing2();
            }
        }
    },
});
