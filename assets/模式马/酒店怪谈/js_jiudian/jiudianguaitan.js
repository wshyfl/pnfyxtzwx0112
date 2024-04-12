cc.Class({
    extends: cc.Component,

    properties: {
        yin: [cc.AudioClip],
        wenzi: cc.Label,//玩家说话的label，
        jindu: cc.Sprite,
        shouji: [cc.Node],
        hongdian: cc.Node,
        heimu: cc.Node,
        yinxiao: [cc.AudioClip],
        shijie: [cc.Node],
        biao: cc.Node,
        shizhen: cc.Node,
        fenzhen: cc.Node,
        maoyanshi: cc.Node,
        guanjia: sp.Skeleton,
        guize: [cc.Node],
        cj: cc.Node,
        shuiguo: cc.Node,
        mama: sp.Skeleton,
        dakai: cc.Node,
        guanjia2: sp.Skeleton,
        zhengyan: cc.Node,
        huifan: cc.Node,
        juebei: cc.Node,
        shuzi: cc.Node,
        chouti: [cc.Node],
        dianxian: [cc.Node],
        qiaoboli: sp.Skeleton,
        boli: [cc.Node],
        qishi: [cc.Node],
        qifen: [cc.Node],
        zuihou: cc.Node,
        baoan: [cc.Node],
        zhezhao: cc.Node,
        biaoti: [cc.Node],
        qiao1: [cc.Node],
        cont: cc.Node,
        hong: cc.Node,
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
        this.hua = [
            "终于有时间和爸妈还有老婆一起出来旅游了",
            "这是什么意思",
            "谁啊",
            "您好这是酒店为您订制的晚餐",
            "我不饿，你回去吧",
            "轮到你了",
            "儿子你快来",
            "帮我给猪猪喂下东西",
            "妈，你都饿了一天了，先自己吃吧",
            "我去上个厕所",
            "喂，管家吗",
            "这到底是什么意思啊",
            "我爸去哪了",
            "我带你去找他",
            "我可没说要吃猪食",
            "我让你走了吗",
            "你好，管家",
            "把这个喝了，你会没事的",
            "你还真信了",
            "老公我洗完澡了，你快来",
            "你动我衣服干嘛",
            "终于等到你了",
            "陪我看看电视",
            "老公你干嘛，要赔钱的",
            "老公你疯啦",
            "你好，保安",
            "你们房间怎么声音这么大",
            "请打开房间配合检查",
            "老公我好热",
        ];
        cc.audioEngine.play(this.yinxiao[14], true, 1);
        this.liucheng = 0;
        this.xzxin = false;
        this.shuohua = false;
        this.xzdianhua = false;
        this.xzkong = false;
        this.jindu.fillRange = 0.073;
        this.yinyue(0, this.wenzi, this.xin1);
        this.xzshi = false;
        this.jin = 0.5;
        this.chu = 0.5;
    },

    fanhui() {
        cc.director.emit("显示暂停界面");
        cc.audioEngine.play(this.yinxiao[13], false, 1);
    },

    dxhong() {
        cc.tween(this.hongdian)
            .to(0.4, { scale: 1.1 })
            .to(0.4, { scale: 1 })
            .call(() => {
                this.dxhong()
            })
            .start()
    },

    xinxi() {
        if (this.shuohua) {
            return;
        }
        if (this.xzxin) {
            return;
        }
        cc.audioEngine.play(this.yinxiao[13], false, 1);
        this.xzxin = true;
        if (this.shouji[0].active == false) {
            if (this.hongdian.active && this.liucheng == 0) {
                this.yinyue(1, this.wenzi);
            }
            this.hongdian.active = false;
            cc.tween(this.node)
                .delay(0.1)
                .call(() => {
                    if (this.cont.height > 580) {
                        this.cont.y = this.cont.height - 580;
                    }
                })
                .start()

            this.shouji[0].active = true;
            this.shouji[1].y = -870;
            cc.tween(this.shouji[1])
                .to(0.3, { y: -25 })
                .call(() => {
                    this.xzxin = false;
                })
                .start()
        } else {
            cc.tween(this.shouji[1])
                .to(0.15, { y: -870 })
                .call(() => {
                    this.shouji[0].active = false;
                    this.xzxin = false;
                    if (this.liucheng == 0) {
                        this.heimu1()
                    } else if (this.liucheng == 15) {
                        this.pozhan()
                    }
                })
                .start()

        }
    },

    shibai() {
        this.shabi(() => {
            cc.tween(this.hong)
                .to(0.15, { opacity: 255 })
                .to(0.15, { opacity: 0 })
                .start()
            this.zhezhao.active = true;
            var dd = cc.audioEngine.play(this.yinxiao[1], false, 1);
            cc.tween(this.node)
                .delay(cc.audioEngine.getDuration(dd))
                .call(() => {
                    cc.director.emit("游戏失败");
                    console.log("游戏失败")
                })
                .start()
        })


    },

    dakaigaizi() {
        if (this.shuohua) {
            return;
        }
        if (this.xzshi) {
            return;
        }

        if (this.liucheng == 0.5) {
            this.xzshi = true;
            this.huifan.active = false;
            this.guanjia.setAnimation(0, "kaigai", false);
            cc.audioEngine.play(this.yinxiao[8], false, 1);
            this.guanjia.setCompleteListener((a, evt) => {
                if (a.animation.name == "kaigai") {
                    this.guanjia.setAnimation(0, "shiwu", true);
                    this.liucheng = 1;
                    this.yinyue(4, this.wenzi, this.jieduan3);
                }

            })
        } else {

        }

    },

    jieduan3() {

        this.shabi(() => {
            this.maoyanshi.active = false;
            this.yinyue(6, this.wenzi, this.jieduan4);
            this.shijie[1].active = false;
            this.shijie[2].active = true;
            this.biaoti[1].active = false;
            this.biaoti[2].active = true;
            this.jindu.fillRange = 0.445;
        })

    },

    jieduan4() {
        cc.tween(this.heimu)
            .delay(0.15)
            .to(this.chu, { opacity: 0 })
            .call(() => {
                this.heimu.active = false;
                this.jieduan5();
            })
            .start()
    },

    jieduan5() {
        this.hongdian.active = true;
        this.dxhong()
        cc.audioEngine.play(this.yinxiao[4], false, 1);
        this.yinyue(7, this.wenzi);
        this.guize[0].active = true;

    },

    guopan() {
        cc.tween(this.mama.node)
            .to(0.15, { scale: 1.03 })
            .to(0.15, { scale: 1 })
            .start()
        this.shuiguo.destroy();
        this.yinyue(8, this.wenzi, this.jieduan6);
        this.liucheng = 2;
    },

    jieduan6() {
        var dd = cc.audioEngine.play(this.yinxiao[10], false, 1);
        this.scheduleOnce(function () {
            this.yinyue(9, this.wenzi, this.jieduan7);
        }, cc.audioEngine.getDuration(dd) + 0.2);
    },

    jieduan7() {
        this.mama.setAnimation(0, "pao", false);
        cc.audioEngine.play(this.yinxiao[6], false, 1);
        this.mama.setCompleteListener((a, evt) => {
            if (a.animation.name == "pao") {
                this.mama.setAnimation(0, "zhu", true);
                this.liucheng = 3;
            }

        })
    },

    siwang2(id) {
        if (this.shuohua) {
            return;
        }
        if (this.xzdianhua) {
            return;
        }

        if (id == 0) {
            if (this.liucheng >= 2) {
                return;
            }
            this.yinyue(12, this.wenzi, this.sh);
        } else if (id == 1) {
            if (this.liucheng < 2) {

                // cc.tween(this.hong)
                //     .to(0.15, { opacity: 255 })
                //     .call(() => {
                        this.yinyue(15, this.wenzi, this.shibai);
                        this.cj.active = true;
                    // })
                    // .to(0.15, { opacity: 0 })
                    // .start()
            } else if (this.liucheng == 3) {
                this.shabi(() => {
                    this.xzdianhua = true;
                    this.yinyue(10, this.wenzi, this.jieduan8);
                    this.shijie[2].active = false;
                    this.shijie[3].active = true;
                    this.biaoti[2].active = false;
                    this.biaoti[3].active = true;
                    this.jindu.fillRange = 0.63;
                })

            }

        } else if (id == 2) {
            if (this.liucheng >= 2) {
                return;
            }

            // cc.tween(this.hong)
            //     .to(0.15, { opacity: 255 })
            //     .call(() => {
                    this.yinyue(14, this.wenzi, this.shibai);
                    this.cj.active = true;
                // })
                // .to(0.15, { opacity: 0 })
                // .start()
        }
    },

    jieduan8() {
        cc.tween(this.heimu)
            .to(this.chu, { opacity: 0 })
            .call(() => {
                this.heimu.active = false;

            })
            .start()
        cc.tween(this.node)
            .delay(0.35)
            .call(() => {

                var dd = cc.audioEngine.play(this.yinxiao[2], false, 1);
                cc.tween(this.node)
                    .delay(cc.audioEngine.getDuration(dd))
                    .call(() => {
                        this.yinyue(16, this.wenzi,);
                        this.liucheng = 4;
                    })
                    .start()
            })
            .start()

    },

    kaimen() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng != 4) {
            return;
        }
        this.dakai.active = true;
        this.yinyue(17, this.wenzi,);
        this.liucheng = 5;
    },

    jiubei() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng != 5 && this.liucheng != 6) {
            return;
        }
        if (this.liucheng == 5) {
            this.zhezhao.active=true;
            // this.shabi(() => {
                var dd = cc.audioEngine.play(this.yinxiao[3], false, 1);
                cc.tween(this.node)
                    .delay(cc.audioEngine.getDuration(dd))
                    .call(() => {
                        this.yinyue(5, this.wenzi);
                        this.zhengyan.active = true;
                    })
                    .delay(2.3)
                    .call(() => {
                        this.shibai();
                    })
                    .start()
            // })

        } else {
            this.liucheng=6.5
            this.zhengyan.active = true;
            var dd = cc.audioEngine.play(this.yinxiao[3], false, 1);
            cc.tween(this.node)
                .delay(2.7)
                .call(()=>{
                    this.heimu.active=true;
                    this.heimu.opacity=255;
                    // var dd = cc.audioEngine.play(this.yinxiao[3], false, 1);
                    // cc.tween(this.node)
                    //     .delay(cc.audioEngine.getDuration(dd))
                    //     .call(() => {
                            this.yinyue(19, this.wenzi, this.jieduan9);
                            this.shijie[3].active = false;
                            this.shijie[4].active = true;
                            this.biaoti[3].active = false;
                            this.biaoti[4].active = true;
    
                            this.guize[1].active = true;
                            this.jindu.fillRange = 0.811;
                        // })
                        // .start()
                })
                .start()

            // this.shabi(() => {
                // var dd = cc.audioEngine.play(this.yinxiao[3], false, 1);
                // cc.tween(this.node)
                //     .delay(cc.audioEngine.getDuration(dd))
                //     .call(() => {
                //         this.yinyue(19, this.wenzi, this.jieduan9);
                //         this.shijie[3].active = false;
                //         this.shijie[4].active = true;
                //         this.biaoti[3].active = false;
                //         this.biaoti[4].active = true;

                //         this.guize[1].active = true;
                //         this.jindu.fillRange = 0.811;
                //     })
                //     .start()
            // })

        }
    },

    jieduan9() {
        cc.tween(this.heimu)
            .to(this.chu, { opacity: 0 })
            .call(() => {
                this.heimu.active = false;
                this.hongdian.active = true;
                this.dxhong()
                cc.audioEngine.play(this.yinxiao[4], false, 1);
            })
            .start()
        cc.tween(this.node)
            .delay(0.35)
            .call(() => {
                this.yinyue(28, this.wenzi,);
                this.liucheng = 7;
            })
            .start()
    },

    yifu() {
        if (this.shuohua) {
            return;
        }

        this.yinyue(20, this.wenzi,);
    },

    gaibeizi() {
        this.liucheng = 8;
        this.juebei.active = true;
        cc.audioEngine.play(this.yinxiao[7], false, 1);
    },

    chuanghu() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng < 7) {
            return;
        }
        cc.audioEngine.stop(this.qboli);
        this.yinyue(21, this.wenzi, this.shibai);
    },

    kongtiao() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng < 7) {
            return;
        }
        if (this.xzkong) {
            return;
        }
        if (this.liucheng == 8) {
            this.xzkong = true;
            this.shuzi.active = true;
            this.jieduan10()
            this.dianshi.getComponent(cc.Sprite).enabled = true;
            this.liucheng = 10;
        } else {
            this.yinyue(21, this.wenzi, this.shibai);
        }

    },

    duanxian() {
        this.dianxian[0].active = false;
        this.dianxian[1].active = true;
        this.dianshi.getComponent(cc.Sprite).enabled = false;
        this.liucheng = 11;
        this.yinyue(23, this.wenzi, this.jieduan11);
    },

    jieduan11() {
        this.qiaoboli.node.active = true;
        this.qboli = cc.audioEngine.play(this.yinxiao[12], true, 1);
        this.liucheng = 12;
    },

    chuiboli() {
        this.qiaoboli.setAnimation(0, "za", false);
        this.qiaoboli.setEventListener((a, evt) => {//帧事件
            if (evt.data.name == "za") {
                this.boli[0].active = false;
                this.boli[1].active = true;
                cc.audioEngine.stop(this.qboli);
            }
        })

        this.qiaoboli.setCompleteListener((a, evt) => {//动作回调
            if (a.animation.name == "za") {
                this.qiaoboli.node.active = false;
                this.yinyue(24, this.wenzi, this.jieduan12);
            }

        })
    },

    jieduan12() {
        this.shabi(() => {
            this.shijie[4].active = false;
            this.shijie[5].active = true;
            this.biaoti[4].active = false;
            this.biaoti[5].active = true;
            var dd = cc.audioEngine.play(this.yinxiao[0], false, 1);
            cc.tween(this.node)
                .delay(cc.audioEngine.getDuration(dd))
                .call(() => {
                    this.jieduan13();
                })
                .start()
        })

    },

    jieduan13() {
        this.jindu.fillRange = 1;
        cc.tween(this.heimu)
            .to(this.chu, { opacity: 0 })
            .call(() => {
                this.heimu.active = false;
                this.yinyue(25, this.wenzi, () => {
                    this.yinyue(26, this.wenzi, () => {
                        this.yinyue(27, this.wenzi, () => {
                            this.qiao = cc.audioEngine.play(this.yinxiao[0], true, 1);
                            this.qiao1[1].active = true;
                            this.liucheng = 14;
                        });
                    });
                });
            })
            .start()
    },

    kaimen14() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng != 14) {
            return;
        }
        this.qiao1[1].active = false;
        cc.audioEngine.stop(this.qiao);
        this.zuihou.active = true;
        this.hongdian.active = true;
        this.dxhong()
        cc.audioEngine.play(this.yinxiao[4], false, 1);
        this.guize[2].active = true;
        this.liucheng = 15;

    },

    pozhan() {
        cc.tween(this.node)
            .delay(0.2)
            .call(() => {
                this.baoan[0].active = false;
                this.baoan[1].active = true;
                this.dian = cc.audioEngine.play(this.yinxiao[11], false, 1);
                this.shengli()
            })
            .start()
    },

    shengli() {
        this.zhezhao.active = true;
        cc.tween(this.node)
            .delay(cc.audioEngine.getDuration(this.dian))
            .call(() => {
                cc.director.emit("游戏胜利");
                console.log("游戏胜利")
            })
            .start()
    },

    jieduan10() {
        cc.tween(this.node)
            .delay(0.4)
            .call(() => {
                this.yinyue(22, this.wenzi, () => {
                    // this.liucheng = 9;
                });
            })
            .start()
    },

    kaidianshi(str) {
        this.dianshi = str;
    },

    kaichouti1() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng != 10) {
            return;
        }
        cc.audioEngine.play(this.yinxiao[9], false, 1);
        this.chouti[0].active = true;
    },
    kaichouti2() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng != 12) {
            return;
        }
        cc.audioEngine.play(this.yinxiao[9], false, 1);
        this.liucheng = 13;
        this.chouti[1].active = true;
    },

    jiuping() {
        if (this.shuohua) {
            return;
        }
        if (this.liucheng != 5) {
            return;
        }
        this.shuohua = true;
        this.liucheng = 6;
        cc.audioEngine.play(this.yinxiao[5], false, 1);
        this.guanjia2.setAnimation(0, "daojiu", false);
        this.guanjia2.setCompleteListener((a, evt) => {
            if (a.animation.name == "daojiu") {
                this.guanjia2.setAnimation(0, "jiubei", true);
                this.shuohua = false;
            }
        })
    },

    sh() {

        // cc.tween(this.hong)
        //     .to(0.15, { opacity: 255 })
        //     .call(() => {
                this.yinyue(13, this.wenzi, this.shibai);
                this.cj.active = true;
            // })
            // .to(0.15, { opacity: 0 })
            // .start()
    },

    siwang1() {
        if (this.shuohua) {
            return;
        }

        // this.shabi(() => {
            this.qiao1[0].active = false;
            cc.audioEngine.stop(this.qiao);
            this.yinyue(5, this.wenzi, this.shibai);
        // })

    },

    maoyan() {
        if (this.shuohua) {
            return;
        }
        this.qiao1[0].active = false;
        cc.audioEngine.stop(this.qiao);
        if (this.shizhen.angle <= 90 && this.shizhen.angle > 0) {
            this.siwang1();
        } else {
            this.maoyanshi.active = true;
            this.yinyue(3, this.wenzi);
        }
    },

    huimen() {
        this.maoyanshi.active = false;
        cc.audioEngine.play(this.yinxiao[13], false, 1);
    },

    zhongbiao() {
        if (this.shuohua) {
            return;
        }
        this.biao.active = true;
    },

    fanhuibiao() {
        if (this.shuohua) {
            return;
        }
        cc.audioEngine.play(this.yinxiao[13], false, 1);
        this.biao.active = false;
        this.zhenshi = this.shizhen.angle;
        this.zhenfen = this.fenzhen.angle;
        this.qishi[0].angle = this.zhenshi;
        this.qishi[1].angle = this.zhenshi;
        this.qifen[0].angle = this.zhenfen;
        this.qifen[1].angle = this.zhenfen;
        this.qishi[2].angle = this.zhenshi;
        this.qishi[3].angle = this.zhenshi;
        this.qifen[2].angle = this.zhenfen;
        this.qifen[3].angle = this.zhenfen;
    },

    heimu1() {
        this.shabi(() => {
            this.liucheng = 0.5
            var dd = cc.audioEngine.play(this.yinxiao[0], false, 1);
            cc.tween(this.node)
                .delay(cc.audioEngine.getDuration(dd))
                .call(() => {

                    this.shijie[0].active = false;
                    this.shijie[1].active = true;
                    this.biaoti[0].active = false;
                    this.biaoti[1].active = true;
                    cc.tween(this.heimu)
                        .to(this.chu, { opacity: 0 })
                        .call(() => {
                            this.heimu.active = false;
                            this.jieduan2();
                        })
                        .start()
                })
                .start()
        })

    },

    jieduan2() {
        this.yinyue(2, this.wenzi, this.buzhidao);
        this.jindu.fillRange = 0.255;
    },

    buzhidao() {
        this.qiao = cc.audioEngine.play(this.yinxiao[0], true, 1);
        this.qiao1[0].active = true;
    },

    xin1() {
        this.hongdian.active = true;
        this.dxhong()
        cc.audioEngine.play(this.yinxiao[4], false, 1);
    },

    shabi(fang) {
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .to(this.jin, { opacity: 255 })
            .call(() => {
                if (fang) {
                    fang.call(this);
                }
            })
            .start()
    },

    yinyue(id, zi, fang) {//音乐id，显示的Label
        if (this.yue) {
            cc.audioEngine.stop(this.yue);
        }
        this.yue = cc.audioEngine.play(this.yin[id], false, 1);
        this.xianzi(this.hua[id], cc.audioEngine.getDuration(this.yue), zi, id, fang)
    },

    xianzi(str, num, zi, id, fang) {//显示字，显示时间，显示的Label
        if (this.dh1) {
            this.dh1.stop();
        }
        if (id != 20) {
            this.shuohua = true;
        }

        zi.string = str;
        this.dh1 = cc.tween(zi.node.parent)
            .to(0.15, { opacity: 255 })
            .delay(num)
            .to(0.15, { opacity: 0 })
            .delay(0.15)
            .call(() => {
                if (id != 20) {
                    this.shuohua = false;
                }
                if (fang) {
                    fang.call(this);
                }
            })
        this.dh1.start()
    },

    // update (dt) {},
});
