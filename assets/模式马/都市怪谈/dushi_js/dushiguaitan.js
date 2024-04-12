cc.Class({
    extends: cc.Component,

    properties: {
        tuo: cc.Node,
        bg: cc.Node,
        zhezhao: cc.Node,
        zhuowu: cc.Node,
        shibai: [cc.Node],
        wenzi: cc.Label,//玩家说话的label，
        guizechuang: cc.Node,//规则的弹窗
        guian: cc.Node,//点击出现规则的按钮
        shijian: [cc.Node],//电脑屏幕显示的时间
        yin: [cc.AudioClip],
        yingzi: cc.Node,//门口的影子
        men: cc.Node,//大门
        juese1: [cc.Node],//npc1
        kuang1: cc.Label,//npc1的对话框
        juese2: [cc.Node],//npc2
        kuang2: cc.Label,//npc2的对话框
        kuang21: cc.Label,//npc2的对话框
        che: cc.Node,//玩具车
        dengzi: cc.Node,//凳子
        daojishi: cc.Label,//倒计时
        duojie: cc.Node,//躲藏界面
        anniu: cc.Node,//离开躲藏按钮
        juese3: [cc.Node],//npc3
        kuang3: cc.Label,//npc3的对话框
        xuanan: cc.Node,
        juese4: [cc.Node],//npc4
        kuang4: cc.Label,//npc4的对话框
        dianhuatu: [cc.Node],
        kuang5: cc.Label,//npc5的对话框
        jiantou: cc.Node,
        zhi: cc.Node,
        yinxiao: [cc.AudioClip],
        tutx: [cc.Node],
        qiaomentx: [cc.Node],
        shanhong: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.jindu = 0;
        this.shuohua = true;
        this.haiche = false;
        this.xzdeng = false;
        this.xzshou = false;
        this.jishu = 15;
        this.xzmen = false;
        this.ccd = false;
        this.tuo2 = false;
        this.xzshoukuan = false;
        this.xzwupin = false;
        this.xzqian = false;
        this.dengdai = false;
        this.xzsheng = false;
        this.xzqiao = false;
        this.hua = [
            "终于找到个兼职了",
            "结账",
            "我手机没电了",
            "那还是下次再买吧",
            "哥哥能帮我拿下这个玩具吗",
            "谢谢哥哥",
            "这不是隔壁的班花吗",
            "这么晚还不回宿舍",
            "你不是六班的小博吗，怎么在这里上班啊",
            "不说话装什么高冷",
            "多少钱",
            "扫码枪坏了，扫不了了",
            "下班了吧，等你开黑呢，快点来",
        ];
        this.scheduleOnce(function () {
            this.yinyue(0, this.wenzi, this.ke);
        }, 0.5);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        cc.audioEngine.play(this.yinxiao[8], true, 1);

    },

    ke(str) {
        cc.tween(str.zhi)
            .repeatForever(//无限循环动作
                cc.tween()
                    .to(0.4, { scale: 1.1 })
                    .to(0.4, { scale: 1 })
            )
            .start()
    },

    fanhui() {
        cc.director.emit("显示暂停界面");
    },

    zhendong(str) {

        var a = Math.floor(Math.random() * 16) + 5;
        var b = Math.floor(Math.random() * 16) + 5;
        cc.tween(str)
            .by(0.04, { x: a, y: b })
            .by(0.04, { x: -a, y: -b })
            .by(0.04, { x: a, y: b })
            .by(0.04, { x: -a, y: -b })
            .by(0.04, { x: a, y: b })
            .by(0.04, { x: -a, y: -b })
            .by(0.04, { x: a, y: b })
            .by(0.04, { x: -a, y: -b })
            .start()
    },

    chufa(str) {//剧情开始
        if (str) {

        } else {
            var str = this;
        }
        if (str.jindu == 1) {
            cc.tween(str.yingzi)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .call(() => {
                    str.yingzi.opacity = 0;
                    str.men.active = false;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .start()
            cc.tween(str.juese1[0])
                .delay(1.1)
                .to(0.3, { opacity: 255 })
                .delay(0.6)
                .call(() => {
                    str.men.active = true;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .delay(0.2)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese1[1])
                .delay(2.2)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese1[2])

                .delay(3.3)
                .call(() => {
                    str.juese1[2].active = true
                })
                .to(0.3, { opacity: 255 })

                .delay(0.8)
                .call(() => {
                    str.yinyue(1, str.kuang1);
                    str.jindu = 2;
                })
                .start()
        } else if (str.jindu == 4) {
            cc.tween(str.juese1[2])
                .delay(0.3)
                .to(0.3, { opacity: 0 })
                .call(() => {
                    str.juese1[2].active = false
                    str.shijian[0].active = false;
                    str.shijian[1].active = true;
                })
                .start()
            cc.tween(str.yingzi)
                .delay(2.3)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .call(() => {
                    str.yingzi.opacity = 0;
                    str.men.active = false;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .start()
            cc.tween(str.juese2[0])
                .delay(3.4)
                .to(0.3, { opacity: 255 })

                .delay(0.6)
                .call(() => {
                    str.men.active = true;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .delay(0.2)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese2[1])
                .delay(4.5)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese2[2])
                .delay(5.6)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .call(() => {
                    str.haiche = true;
                    str.yinyue(4, str.kuang2);
                    str.dengdai = true
                    str.dhche();
                })
                .start()
        } else if (str.jindu == 6) {
            str.shijian[1].active = false;
            str.shijian[2].active = true;
            cc.tween(str.yingzi)
                .to(0.3, { opacity: 255 })
                .call(() => {
                    str.jindu = 7;
                    str.jishi()
                    str.qiao = cc.audioEngine.play(str.yinxiao[2], true, 1);
                    this.qiaodh()
                })
                .start()
        } else if (str.jindu == 8) {
            str.shijian[2].active = false;
            str.shijian[3].active = true;
            cc.tween(str.yingzi)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .call(() => {
                    str.yingzi.opacity = 0;
                    str.men.active = false;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .start()
            cc.tween(str.juese3[0])
                .delay(1.1)
                .call(() => {
                    str.yinyue(6, str.wenzi);
                })
                .to(0.3, { opacity: 255 })
                .delay(0.6)
                .call(() => {
                    str.men.active = true;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .delay(1)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese3[1])
                .delay(3)
                .call(() => {
                    str.yinyue(7, str.wenzi);
                })
                .to(0.3, { opacity: 255 })
                .delay(1.8)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese3[2])

                .delay(5.1)
                .call(() => {
                    str.yinyue(8, str.kuang3);
                })
                .call(() => {
                    str.juese3[2].active = true;
                })
                .to(0.3, { opacity: 255 })

                .delay(2)
                .call(() => {
                    str.xuanze();
                })
                .start()
        } else if (str.jindu == 10) {
            str.shijian[3].active = false;
            str.shijian[4].active = true;
            cc.tween(str.yingzi)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .call(() => {
                    str.yingzi.opacity = 0;
                    str.men.active = false;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .start()
            cc.tween(str.juese4[0])
                .delay(1.1)
                .to(0.3, { opacity: 255 })
                .delay(0.6)
                .call(() => {
                    str.men.active = true;
                    cc.audioEngine.play(str.yinxiao[1], false, 1);
                })
                .delay(0.2)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese4[1])
                .delay(2.2)
                .to(0.3, { opacity: 255 })
                .delay(0.8)
                .to(0.3, { opacity: 0 })
                .start()
            cc.tween(str.juese4[2])
                .delay(3.3)
                .call(() => {
                    str.juese4[2].active = true
                })
                .to(0.3, { opacity: 255 })
                .call(() => {
                    str.yinyue(10, str.kuang4);
                })
                .start()
        } else if (str.jindu == 11) {
            str.shijian[4].active = false;
            str.shijian[5].active = true;
            str.dhyin = cc.audioEngine.play(str.yinxiao[4], true, 1);
            str.dh2()
        }
    },

    qiaodh() {
        if (this.xzqiao) {
            this.qiaomentx[0].active = false
            this.qiaomentx[1].active = false
            return;
        }
        cc.tween(this.node)
            .delay(0.2)
            .call(() => {
                this.qiaomentx[0].active = true
                this.qiaomentx[1].active = false
            })
            .delay(0.2)
            .call(() => {
                this.qiaomentx[1].active = true
                this.qiaomentx[0].active = false
                this.qiaodh();
            })
            .start()
    },

    dh2() {
        cc.tween(this.node)
            .delay(0.15)
            .call(() => {
                this.tutx[0].active = true;
                this.tutx[1].active = false;
            })
            .delay(0.15)
            .call(() => {
                this.tutx[1].active = true;
                this.tutx[0].active = false;
                this.dh2();
            })
            .start()
    },

    xiuli() {
        this.shijian[5].active = false;
        this.shijian[6].active = true;
        this.jindu = 20;
    },

    dianhua() {
        if (this.jindu != 11) {
            return;
        }
        cc.audioEngine.stop(this.dhyin);
        this.jindu = 12;
        this.dianhuatu[0].active = false;
        this.dianhuatu[1].active = true;
        this.yinyue(12, this.kuang5);
        this.xzmen = false;
        cc.tween(this.juese4[2])
            .delay(2.4)
            .call(() => {
                this.jiantou.active = true;
                this.jiandh();
            })
            .start()
    },

    chumen() {
        if (this.xzsheng) {
            return;
        }
        if (this.jindu != 20) {
            return;
        }
        // cc.audioEngine.play(this.yinxiao[3], false, 1);

    },

    jiandh() {
        cc.tween(this.jiantou)
            .by(0.5, { x: 50 })
            .by(0.5, { x: -50 })
            .call(() => {
                this.jiandh();
            })
            .start()
    },

    shoukuan() {
        if (this.shuohua) {
            return;
        }
        if (this.xzshou) {
            return;
        }
        if (this.jindu != 10) {
            return;
        }
        cc.audioEngine.play(this.yinxiao[3], false, 1);
        this.xzshou = true;
        this.scheduleOnce(function () {
            this.siwang(4)
        }, 1);

    },

    saoma() {

        if (this.shuohua) {
            return;
        }
        if (this.xzshou) {
            return;
        }
        if (this.jindu != 10) {
            return;
        }
        this.xzshou = true;
        this.yinyue(11, this.wenzi);
        this.scheduleOnce(function () {

            cc.tween(this.juese4[2])
                .to(0.3, { opacity: 0 })
                .call(() => {
                    this.jindu = 11;
                    this.juese4[2].active = false;
                    this.chufa();
                })
                .start()
        }, 1.8);
    },

    xuanze() {
        this.jindu = 9;
        this.xuanan.active = true;
        // cc.tween(this.bg)
        //     .to(0.1, { x: -27.091 })
        //     .call(() => {

        //     })
        //     .start()
    },

    diancuo() {
        this.xuanan.active = false;
        this.siwang(3);
        cc.audioEngine.play(this.yinxiao[3], false, 1);
    },

    diandui() {
        if (this.ccd) {
            return;
        }
        if(this.xuanan.active==false){
            return;
        }
        this.ccd = true;
        this.xuanan.active = false;
        cc.audioEngine.play(this.yinxiao[0], false, 1);

        cc.tween(this.juese3[2])
            .delay(0.3)
            .call(() => {
                this.yinyue(9, this.kuang3);
            })
            .delay(2)
            .to(0.3, { opacity: 0 })
            .delay(2)
            .call(() => {
                this.jindu = 10;
                this.chufa();
                this.juese3[2].active = false;
            })
            .start()
    },

    jishi() {
        this.daojishi.node.parent.active = true;
        cc.tween(this.daojishi.node)
            .delay(1)
            .call(() => {
                this.jishu--;
                if (this.jishu == -1) {
                    this.zhezhao.active = true;
                    cc.audioEngine.stop(this.qiao);
                    this.xzqiao = true
                    this.siwang(2)
                } else {
                    this.daojishi.string = this.jishu;
                    if (this.jishu <= 5) {
                        this.shidh();
                    }
                    if (this.jishu >= 0) {
                        this.jishi()
                    }

                }
            })
            .start()
    },

    duochang() {
        if (this.tuo.getComponent("tuo_dushi").a > 5 || this.tuo.getComponent("tuo_dushi").b > 5) {//拖动了不算点击
            return;
        }
        if (this.shuohua) {
            return;
        }
        if (this.xzmen) {
            return;
        }
        if (this.jindu != 7) {
            return;
        }
        cc.audioEngine.stop(this.qiao);
        this.xzqiao = true
        this.yingzi.opacity = 0;
        this.jishu = -5;
        this.daojishi.node.parent.active = false;
        this.duojie.active = true;
        cc.tween(this.node)
            .delay(7)
            .call(() => {
                cc.audioEngine.play(this.yinxiao[7], false, 1);
            })
            .delay(7)
            .call(() => {
                this.anniu.active = true;
            })
            .start()
    },

    chulai() {
        this.duojie.active = false;
        this.jindu = 8;
        cc.audioEngine.play(this.yinxiao[3], false, 1);
        this.scheduleOnce(function () {
            this.chufa();
        }, 2);

    },

    dianmen() {
        console.log(this.shuohua, this.jindu, this.xzmen)
        if (this.tuo.getComponent("tuo_dushi").a > 5 || this.tuo.getComponent("tuo_dushi").b > 5) {//拖动了不算点击
            return;
        }
        if (this.shuohua) {
            return;
        }
        if (this.jindu != 7 && this.jindu != 12 && this.jindu != 20) {
            return;
        }
        if (this.xzmen) {
            return;
        }
        this.jiantou.active = false;
        if (this.jindu != 20) {

            this.jishu = -5;
            this.daojishi.node.parent.active = false;
            this.xzmen = true;
            this.zhezhao.active = true;
            cc.audioEngine.stop(this.qiao);
            this.xzqiao = true;
            this.siwang(2)
        } else {
            this.men.active = false;
            cc.audioEngine.play(this.yinxiao[1], false, 1);
            this.jindu = 21
            this.xzsheng = true;
            this.scheduleOnce(function () {
                cc.director.emit("游戏胜利");
                console.log("游戏胜利")
            }, 1);
        }

    },

    shidh() {
        cc.tween(this.daojishi.node)
            .to(0.5, { scale: 1.1 })
            .to(0.5, { scale: 1 })
            .call(() => {
                this.shidh();
            })
            .start()
    },

    nanwan(str) {

        cc.tween(str.juese2[5])
            .to(0.3, { opacity: 0 })
            .delay(0.5)
            .call(() => {
                str.jindu = 6
                str.chufa()
            })
            .start()
        cc.tween(str.che)
            .to(0.3, { opacity: 0 })
            .call(() => {

            })
            .start()
    },

    dianwanju1() {//点凳子
        if (this.tuo.getComponent("tuo_dushi").a > 5 || this.tuo.getComponent("tuo_dushi").b > 5) {//拖动了不算点击
            return;
        }
        if (this.shuohua) {
            return;
        }
        if (this.xzdeng) {
            return;
        }
        if (this.dengdai == false) {
            return;
        }
        this.xzdeng = true
        this.jindu = 5
        cc.tween(this.juese2[2])
            .delay(0.3)
            .to(0.3, { opacity: 0 })
            .start()
        cc.tween(this.juese2[3])
            .delay(0.3)
            .to(0.3, { opacity: 255 })
            .delay(0.8)
            .to(0.3, { opacity: 0 })
            .start()
        cc.tween(this.dengzi)
            .delay(1.4)
            .to(0.3, { opacity: 0 })
            .start()
        cc.tween(this.juese2[4])
            .delay(1.4)
            .to(0.3, { opacity: 255 })
            .delay(0.8)
            .to(0.3, { opacity: 0 })
            .start()
        cc.tween(this.juese2[5])
            .delay(2.5)
            .to(0.3, { opacity: 255 })
            .delay(0.5)
            .call(() => {
                this.yinyue(5, this.kuang21, this.nanwan);
            })
            .start()
    },

    dianwanju() {//点玩具车
        if (this.shuohua) {
            return;
        }
        if (this.xzdeng) {
            return;
        }
        if (this.haiche == false) {
            return;
        }
        if (this.jindu == 4) {
            cc.audioEngine.play(this.yinxiao[3], false, 1);
            this.haiche = false
            this.siwang(1);
        }

    },

    dhche() {//动画
        cc.tween(this.che)
            .to(0.3, { scale: 1.1 })
            .to(0.3, { scale: 1 })
            .call(() => {
                this.dhche();
            })
            .start()
    },

    dianshoukuan() {//点击收款码
        if (this.shuohua) {
            return;
        }
        if (this.tuo.getComponent("tuo_dushi").a > 5 || this.tuo.getComponent("tuo_dushi").b > 5) {//拖动了不算点击
            return;
        }
        if (this.xzshoukuan) {
            return;
        }
        if (this.jindu == 2) {
            this.xzshoukuan = true;
            this.yinyue(2, this.kuang1);
            this.jindu = 3;
        }
    },

    wupin() {//点npc1手里拿的物品
        if (this.shuohua) {
            return;
        }
        if (this.tuo.getComponent("tuo_dushi").a > 5 || this.tuo.getComponent("tuo_dushi").b > 5) {//拖动了不算点击
            return;
        }
        if (this.xzwupin) {
            return
        }
        if (this.jindu == 3) {
            this.xzwupin = true;
            this.scheduleOnce(function () {
                this.jindu = 4;
                this.yinyue(3, this.kuang1, this.chufa);
                cc.tween(this.juese1[3])
                    .to(0.3, { opacity: 0 })
                    .start()
                cc.tween(this.zhuowu)
                    .to(0.3, { opacity: 255 })
                    .start()
            }, 0.5);

        }
    },

    dianqian() {//点击钱
        if (this.shuohua) {
            return;
        }
        if (this.xzqian) {
            return;
        }
        if (this.jindu != 4) {
            cc.audioEngine.play(this.yinxiao[3], false, 1);
            this.xzqian = true;
            this.siwang(0);
        }
    },

    siwang(id) {//游戏失败'
        this.zhezhao.active = true;
        this.bg.x = -27.091;
        if (id == 0) {
            this.shibai[0].active = true;//黑色背景1
            this.shibai[2].active = true;//鬼1
            cc.audioEngine.play(this.yinxiao[6], false, 1);
            this.zhendong(this.bg)
            cc.tween(this.shanhong)
                .to(0.15, { opacity: 255 })
                .to(0.15, { opacity: 0 })
                .start()
            this.scheduleOnce(function () {
                cc.director.emit("游戏失败");
            }, 2);
        } else if (id == 1) {
            this.shibai[0].active = true;//黑色背景1
            this.shibai[3].active = true;//鬼2
            cc.audioEngine.play(this.yinxiao[6], false, 1);
            this.zhendong(this.bg)
            cc.tween(this.shanhong)
                .to(0.15, { opacity: 255 })
                .to(0.15, { opacity: 0 })
                .start()
            this.scheduleOnce(function () {
                cc.director.emit("游戏失败");
            }, 2);
        } else if (id == 2) {
            this.men.active = false;
            cc.audioEngine.play(this.yinxiao[1], false, 1);
            cc.audioEngine.play(this.yinxiao[6], false, 1);
            cc.tween(this.shibai[1])
                .delay(2)
                .call(() => {
                    cc.audioEngine.play(this.yinxiao[5], false, 1);
                    this.scheduleOnce(function () {
                        cc.director.emit("游戏失败");
                    }, 3.4);
                })
                .start()
            cc.tween(this.shibai[1])
                .to(0.3, { opacity: 255 })
                .start()
        } else if (id == 3) {
            this.shibai[0].active = true;//黑色背景1
            this.shibai[4].active = true;//鬼3
            this.zhendong(this.bg)
            cc.tween(this.shanhong)
                .to(0.15, { opacity: 255 })
                .to(0.15, { opacity: 0 })
                .start()
            this.scheduleOnce(function () {
                cc.director.emit("游戏失败");
            }, 2);
            cc.audioEngine.play(this.yinxiao[6], false, 1);
        } else if (id == 4) {
            this.shibai[0].active = true;//黑色背景1
            this.shibai[5].active = true;//鬼4
            this.zhendong(this.bg)
            cc.tween(this.shanhong)
                .to(0.15, { opacity: 255 })
                .to(0.15, { opacity: 0 })
                .start()
            this.scheduleOnce(function () {
                cc.director.emit("游戏失败");
            }, 2);
            cc.audioEngine.play(this.yinxiao[6], false, 1);
        } else if (id == 5) {
            this.men.active = false;
            cc.audioEngine.play(this.yinxiao[1], false, 1);
            cc.audioEngine.play(this.yinxiao[6], false, 1);
            cc.tween(this.shibai[1])
                .delay(2)
                .call(() => {
                    cc.audioEngine.play(this.yinxiao[5], false, 1);
                    this.scheduleOnce(function () {
                        cc.director.emit("游戏失败");
                    }, 3.4);
                })
                .start()
            cc.tween(this.shibai[1])
                .to(0.3, { opacity: 255 })
                .start()
        }

    },

    yinyue(id, zi, fang) {//播放音乐，音乐id，显示的Label
        if (this.yue) {
            cc.audioEngine.stop(this.yue);
        }
        this.yue = cc.audioEngine.play(this.yin[id], false, 1);
        this.xianzi(this.hua[id], cc.audioEngine.getDuration(this.yue), zi, fang)
    },

    xianzi(str, num, zi, fang) {//显示字，说的话，显示时间，显示的Label
        if (this.dh1) {
            this.dh1.stop();
        }
        this.shuohua = true;
        zi.string = str;
        this.dh1 = cc.tween(zi.node.parent)
            .to(0.15, { opacity: 255 })
            .delay(num)
            .call(() => {
                this.shuohua = false;
            })
            .to(0.15, { opacity: 0 })
            .call(() => {

                if (fang) {

                    fang(this);
                }
            })
        this.dh1.start()
    },

    guize() {//显示规则
        if (this.shuohua) {
            return;
        }
        cc.audioEngine.play(this.yinxiao[3], false, 1);
        this.guizechuang.scale = 0.6
        this.zhi.active = false;
        cc.tween(this.guizechuang)
            .to(0.15, { scale: 1 })
            .start()
    },

    guanguize() {//关闭规则
        this.guizechuang.scale = 0;
        if (this.guian.active == false) {
            this.jindu = 1;
            this.chufa();
        }
        this.guian.active = true;
    },

    onDestroy() {
        cc.audioEngine.stopAll();

    },

    // update (dt) {},
});
