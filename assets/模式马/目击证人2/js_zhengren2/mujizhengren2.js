cc.Class({
    extends: cc.Component,

    properties: {
        heimu: cc.Node,
        shijie: [cc.Node],
        dikuang: [cc.Node],
        pb: cc.Label,
        zhezhao: cc.Node,
        yin: [cc.AudioClip],
        tx: cc.Prefab,
        tu: [cc.SpriteFrame],
        cj: cc.Node,
        ren: cc.Node,
        cj1: [cc.Node],
        jchua: cc.Label,
        jc: sp.Skeleton,
        an: [cc.Node],
        tfhua: cc.Label,
        cj2: [cc.Node],
        tf: sp.Skeleton,
        zh1: cc.Label,
        dianshi: [cc.Node],
        biaoti:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.hua = [
            "对面发生了什么,动静好大啊",
            "这是",
            "我要赶快报警",
            "别敲了,门都要敲坏了",
            "你好,我是来做调查的,过来询问一些问题",
            "这是帮忙找猫的时候,被抓的",
            "这手套我带了好几年了",
            "最近有点小感冒",
            "应该是在洗衣机里沾上的",
            "这天气真是说变就变呢",
            "请问你还记得凶手的特征吗",
            "好的,谢谢你的配合",
            "不是来过了吗",
            "你好,我是来做调查的,过来询问一些问题",
            "这,这是我天生的",
            "这是我们调查局的统一装备",
            "刚从案发现场过来,不小心沾上了",
            "楼下在涂油漆,不小心染到的",
            "我女朋友送我的,好不好看",
            "请问你还记得凶手的特征吗",
            "你看我像不像那个凶手",
            "你真的不记得吗",
            "昨天来的调查员居然有一个是凶手",
        ];
        this.ji1 = false;
        this.ji2 = false;
        this.name = [
            "美甲", "长发", "匕首", "黑色手套", "口罩", "项链",
            "抓痕", "黑手套", "口罩", "线", "粉色雨伞",
            "四指", "甩棍袋", "血脚印", "裤子", "项链",
        ];
        this.yahua = [
            "昨天那个女生的指甲好像也很长啊",
            "这手套也太眼熟了吧",
            "他怎么戴着跟凶手一样的口罩",
            "这不会是头发吧",
            "这雨伞好像是女生用的",
            "几分钟之后",
            "这人的手居然断了一根手指",
            "这也太危险了",
            "这也太不专业了",
            "这真的是油漆吗",
            "这个看起来好眼熟啊",
        ];

        this.xiayu=cc.audioEngine.play(this.yin[28], true, 1);
        // cc.audioEngine.play(this.yin[29], true, 1);
    },

    onDestroy() {
        cc.audioEngine.stopAll();
    },

    dian1(id) {
        this.zi = this.dikuang[0].children;
        var que = null;
        for (var i = 0; i < this.zi.length; i++) {
            if (this.zi[i].getChildByName("tu").active == false) {
                que = this.zi[i];
                break;
            }
        }
        que.getChildByName("tu").active = true;
        que.getChildByName("tu").scale = 0.7;
        que.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[id - 1];
        que.getChildByName("zi").getComponent(cc.Label).string = this.name[id - 1];
        cc.audioEngine.play(this.yin[26], false, 1);
        var aa = cc.instantiate(this.tx);
        aa.parent = que;
        aa.position = cc.v2(0, 0);

        var que = null;
        for (var i = 0; i < this.zi.length; i++) {
            if (this.zi[i].getChildByName("tu").active == false) {
                que = this.zi[i];
                break;
            }
        }
        if (que == null) {
            this.juqing1()
        }
    },
    fanhui(){
        cc.director.emit("显示暂停界面");
    },

    dian2(id) {
        this.zi2 = this.dikuang[1].children;
        var que = null;
        for (var i = 0; i < this.zi2.length; i++) {
            if (this.zi2[i].getChildByName("tu").active == false) {
                que = this.zi2[i];
                break;
            }
        }
        cc.audioEngine.play(this.yin[26], false, 1);
        que.getChildByName("tu").active = true;
        que.getChildByName("tu").scale = 0.7;
        que.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[id - 1];
        que.getChildByName("zi").getComponent(cc.Label).string = this.name[id - 1];
        this.yinyue(id - 2, this.jchua, this.pan, this.jc);
        this.xianzi2(this.yahua[id - 7], null, this.pb, null)
        var aa = cc.instantiate(this.tx);
        aa.parent = que;
        aa.position = cc.v2(0, 0);


    },
    pan() {
        var que = null;
        for (var i = 0; i < this.zi2.length; i++) {
            if (this.zi2[i].getChildByName("tu").active == false) {
                que = this.zi2[i];
                break;
            }
        }
        if (que == null) {
            this.juqing4()
        }
    },

    dian3(id) {
        this.zi3 = this.dikuang[2].children;
        var que = null;
        for (var i = 0; i < this.zi3.length; i++) {
            if (this.zi3[i].getChildByName("tu").active == false) {
                que = this.zi3[i];
                break;
            }
        }
        cc.audioEngine.play(this.yin[26], false, 1);
        que.getChildByName("tu").active = true;
        que.getChildByName("tu").scale = 0.7;
        que.getChildByName("tu").getComponent(cc.Sprite).spriteFrame = this.tu[id - 1];
        que.getChildByName("zi").getComponent(cc.Label).string = this.name[id - 1];
        this.yinyue(id + 2, this.tfhua, this.pan2, this.tf);
        this.xianzi2(this.yahua[id - 6], null, this.pb, null)
        var aa = cc.instantiate(this.tx);
        aa.parent = que;
        aa.position = cc.v2(0, 0);


    },

    pan2() {
        var que = null;
        for (var i = 0; i < this.zi3.length; i++) {
            if (this.zi3[i].getChildByName("tu").active == false) {
                que = this.zi3[i];
                break;
            }
        }
        if (que == null) {
            this.juqing8()
        }
    },

    jide(even, id) {

        if (id == 0) {
            this.ji2 = true;
        } else {
            this.ji2 = false;
        }
        this.an[1].active = false;
        cc.audioEngine.play(this.yin[27], false, 1);
        this.tf.setAnimation(0, "xiao", true);
        cc.audioEngine.play(this.yin[24], false, 1);
        cc.tween(this.node)
            .delay(1.22)
            .call(() => {
                this.cj2[1].active = false;
                // cc.audioEngine.play(this.yin[24], false, 1);
                cc.tween(this.shijie[3])
                    .to(0.05, { scale: 1.015 })
                    .to(0.05, { scale: 1 })
                    .start()
                if (this.ji2) {
                    this.cj2[2].active = true;
                    this.scheduleOnce(function () {
                        this.jidedh1()
                    }, 0.5);

                } else {
                    this.cj2[3].active = true;
                    this.scheduleOnce(function () {
                        this.jidedh2()
                    }, 0.5);
                }
            })
            .start()
    },

    jidedh1() {
        cc.tween(this.cj2[2].getChildByName("bj03-m03"))
            .to(1, { scaleX: 0.93 })
            .start()
        cc.tween(this.cj2[2].getChildByName("警察3b"))
            .to(2, { x: -140 })
            .start()
        cc.tween(this.cj2[2].getChildByName("qipao"))
            .delay(2)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.yinyue(20, this.zh1, this.jiewei, this.dh);
            })
            .start()
    },

    jidedh2() {
        cc.tween(this.cj2[3].getChildByName("bj03-m03"))
            .to(1, { scaleX: 0.93 })
            .start()
        cc.tween(this.cj2[3].getChildByName("警察3b"))
            .to(2, { x: -140 })
            .start()
        cc.tween(this.cj2[3].getChildByName("qipao"))
            .delay(2)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.yinyue(21, this.zh1, this.jiewei, this.dh);
            })
            .start()
    },

    jiewei() {
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.xianzi2("一天之后", null, this.pb, null, null)
                this.shijie[3].active = false;
                this.shijie[4].active = true;
                if (this.ji1) {
                    if (this.ji2) {
                        this.dianshi[0].active = true;
                    } else {
                        this.dianshi[3].active = true;

                    }
                } else {
                    if (this.ji2) {
                        this.dianshi[2].active = true;
                    } else {
                        this.dianshi[1].active = true;

                    }
                }
            })
            .delay(2)
            .to(0.5, { opacity: 0 })
            .call(() => {

                this.zhcj()
            })
            .start()
    },

    zhcj() {////////////////////////////////////////////////////////////////////////////////////////////
        if (this.ji1) {
            if (this.ji2) {

            } else {

                this.yinyue(22, this.pb, null, null)
            }
        } else {
            if (this.ji2) {

            } else {

                this.yinyue(22, this.pb, null, null)
            }
        }

        cc.tween(this.node)
            .delay(3.4)
            .call(() => {
                if (this.ji1) {
                    if (this.ji2 == false) {
                        cc.director.emit("游戏胜利")
                        console.log("游戏胜利")
                    } else {
                        cc.director.emit("游戏失败")
                        console.log("游戏失败")
                    }
                } else {
                    cc.director.emit("游戏失败")
                    console.log("游戏失败")
                }

            })
            .start()
    },

    juqing8() {
        this.yinyue(19, this.tfhua, this.juqing9, this.tf);
    },

    juqing9() {
        this.an[1].active = true;
    },

    juqing4() {
        this.yinyue(10, this.jchua, this.juqing5, this.jc);
    },

    juqing5() {
        this.an[0].active = true;
    },

    xuanji(even, id) {
        if (id == 0) {
            this.ji1 = true;
        } else {
            this.ji1 = false;
        }
        cc.audioEngine.play(this.yin[27], false, 1);
        this.an[0].active = false;
        this.yinyue(11, this.jchua, null, this.jc);
        this.scheduleOnce(this.juqing6, 2);
    },

    juqing6() {
        // this.scheduleOnce(function() {
        this.cj1[0].active = true;
        this.cj1[1].active = false;
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .delay(0.8)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.xianzi2(this.yahua[5], null, this.pb, null)
                this.shijie[2].active = false;
                this.shijie[3].active = true;
                this.dikuang[1].parent.active = false;
                this.dikuang[2].parent.active = true;
            })
            .delay(2)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.heimu.active = false;
                cc.audioEngine.play(this.yin[23], false, 1);
                this.scheduleOnce(function () {
                    this.yinyue(12, this.pb, this.juqing7);
                }, 1.2);
            })
            .start()
        // }, 0.4);

    },

    juqing7() {
        this.cj2[0].active = false;
        this.cj2[1].active = true;
        this.yinyue(13, this.tfhua, null, this.tf);
    },

    zhendong(str) {
        var a = Math.floor(Math.random() * 6) + 5;
        var b = Math.floor(Math.random() * 6) + 5;
        cc.tween(str)
            .by(0.04, { x: a, y: b })
            .by(0.04, { x: -a, y: -b })
            .by(0.04, { x: a, y: b })
            .by(0.04, { x: -a, y: -b })
            .start()
    },

    juqing1() {
        this.zhezhao.active = true;
        this.yinyue(2, this.pb)
        cc.tween(this.cj)
            .delay(0.3)
            .to(0.6, { y: -465, x: 150, scale: 2 })
            .delay(0.5)
            .call(() => {
                this.ren.active = true;
                this.zhendong(this.cj)

            })
            .delay(0.3)
            .call(() => {
                this.juqing2()
            })
            .start()
    },

    juqing2() {
        this.zhezhao.active = false;
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.shijie[1].active = false;
                this.shijie[2].active = true;
                cc.audioEngine.stop(this.xintiao);
                this.xianzi("第二天", null, this.pb);
                this.biaoti[0].active=false;
                this.biaoti[1].active=true;
            })
            .delay(2)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.dikuang[0].parent.active = false;
                this.dikuang[1].parent.active = true;
                this.heimu.active = false;
                cc.audioEngine.play(this.yin[23], false, 1);
                this.scheduleOnce(function () {
                    this.yinyue(3, this.pb, this.juqing3);
                }, 1.2);
            })
            .start()
    },

    juqing3() {
        this.cj1[0].active = false;
        this.cj1[1].active = true;
        this.scheduleOnce(function () {
            this.yinyue(4, this.jchua, null, this.jc);
        }, 0.3);
    },



    wangyuanjing() {
        this.heimu.active = true;
        this.heimu.opacity = 0;
        cc.tween(this.heimu)
            .to(0.5, { opacity: 255 })
            .call(() => {
                this.shijie[0].active = false;
                this.shijie[1].active = true;
                cc.audioEngine.stop(this.xiayu);
                this.xintiao=cc.audioEngine.play(this.yin[25], true, 1);
                this.yinyue(0, this.pb)
            })
            .delay(3)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.dikuang[0].parent.active = true;
                this.heimu.active = false;
                this.yinyue(1, this.pb);
            })
            .start()
    },

    yinyue(id, zi, fang, dh) {//音乐id，显示的Label
        if (this.yue) {
            cc.audioEngine.stop(this.yue);
        }
        this.yue = cc.audioEngine.play(this.yin[id], false, 1);
        this.xianzi(this.hua[id], cc.audioEngine.getDuration(this.yue), zi, fang, dh)
    },



    xianzi(str, num, zi, fang, dh) {//显示字，显示时间，显示的Label
        if (this.dh1) {
            this.dh1.stop();

        }
        if (dh) {
            dh.setAnimation(0, "shuohua", true);
        }

        if (num == null) {
            var num = 2;
        }
        zi.string = str;
        this.dh1 = cc.tween(zi.node.parent)
            .to(0.15, { opacity: 255 })
            .delay(num)
            .to(0.15, { opacity: 0 })
            .call(() => {
                if (dh) {
                    dh.setAnimation(0, "daiji", true);
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

    xianzi2(str, num, zi, fang) {//显示字，显示时间，显示的Label
        if (this.dh2) {
            this.dh2.stop();

        }

        if (num == null) {
            var num = 2;
        }
        zi.string = str;
        this.dh2 = cc.tween(zi.node.parent)
            .to(0.15, { opacity: 255 })
            .delay(num)
            .to(0.15, { opacity: 0 })

            .delay(0.15)
            .call(() => {
                if (fang) {
                    fang.call(this);
                }
            })
        this.dh2.start()
    },

    // update (dt) {},
});
