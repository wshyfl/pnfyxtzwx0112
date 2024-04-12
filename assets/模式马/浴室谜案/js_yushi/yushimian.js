cc.Class({
    extends: cc.Component,

    properties: {
        anzhe: [cc.Node],
        shijie: [cc.Node],
        daanzi: cc.Label,
        xjfdj: [cc.Node],
        zhezhao: cc.Node,
        shijian: cc.Label,
        kofenn: cc.Node,
        zi: cc.Node,
        shiti: [cc.Node],
        fanhui2: cc.Node,
        yin: [cc.AudioClip],
        kuang: [cc.Node],
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
        this.shu = 12;
        this.da = 0;
        this.fdh1();
        this.fdh2();
        this.kaishi()
        this.xzqie = false;
        this.xzfan = false;
        cc.audioEngine.play(this.yin[0], true, 1);
        cc.director.on("游戏暂停", () => {
            this.unscheduleAllCallbacks();
        }, this);
        cc.director.on("游戏开始", () => {
            this.jishi();
        }, this);
    },

    xianzi(id) {//显示的字
        if (this.dh1) {
            this.dh1.stop();
        }
        this.zijie = this.zi.children;
        for (var i = 0; i < this.zijie.length; i++) {
            this.zijie[i].active = false;
        }
        this.zijie[id].active = true;
        this.dh1 = cc.tween(this.zi)
            .to(0.15, { opacity: 255 })
            .delay(1.5)
            .call(() => {
                this.shuohua = false;
            })
            .to(0.15, { opacity: 0 })
            .call(() => {

            })
        this.dh1.start()
    },

    kofen() {
        // this.shi-=5;
        // this.shijian.string=this.shi+"s";
        // this.kofenn.getComponent("kofen_yushi").dian();
    },

    kaishi() {
        this.shi = 100;
        this.shijian.string = "100s";
        this.zhezhao.active = false;
        this.jishi();
    },

    fanhui() {
        cc.audioEngine.play(this.yin[3], false, 1);
        cc.director.emit("显示暂停界面");
    },

    jishi() {
        // this.schedule(function () {
        //     this.shi--;
        //     if (this.shi < 0) {
        //         this.shi = 0;
        //     }
        //     this.shijian.string = this.shi + "s";
        //     if (this.shi <= 20) {
        //         cc.audioEngine.play(this.yin[5], false, 1);
        //         this.hong();
        //     } else {
        //         this.bai();
        //     }
        //     if (this.shi == 0) {
        //         this.zhezhao.active = true;
        //         cc.director.emit("游戏失败");
        //         console.log("游戏失败")
        //         this.unscheduleAllCallbacks();
        //     }
        // }, 1);
    },

    jiashi() {
        AD.showAD(this.hui, this)
        cc.audioEngine.play(this.yin[3], false, 1);
    },

    hui() {
        this.shi = 100;
        this.shijian.string = "100s";
        this.bai();
    },

    hong() {
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

    fdh1() {
        cc.tween(this.xjfdj[0])
            .to(0.4, { scale: 1.1 })
            .to(0.4, { scale: 1 })
            .call(() => {
                this.fdh1()
            })
            .start()
    },

    fdh2() {
        cc.tween(this.xjfdj[1])
            .to(0.4, { scale: 1.1 })
            .to(0.4, { scale: 1 })
            .call(() => {
                this.fdh2()
            })
            .start()
    },

    xiaoanzhe(id) {
        this.anzhe[id].active = false;
    },

    dianan(event, id) {
        if (this.xzfan) {
            return
        }
        if (this.xzqie) {
            return;
        }
        this.xzqie = true;
        cc.tween(this.node)
            .delay(0.3)
            .call(() => {
                this.xzqie = false;
            })
            .start()

        cc.audioEngine.play(this.yin[3], false, 1);
        var ide = parseInt(id);
        if (this.shijie[ide].active) {
            this.shijie[ide].active = false;
        } else {
            this.shijie[0].active = false;
            this.shijie[1].active = false;
            this.shijie[ide].active = true;
        }
        if (this.shijie[0].active) {
            this.fanhui2.active = true;

        } else {
            this.fanhui2.active = false;
        }

        if (this.shijie[1].active) {
            this.kuang[1].active = true;
            this.kuang[0].active = false;
        } else if (this.shijie[0].active) {
            this.kuang[0].active = true;
            this.kuang[1].active = false;
        } else {
            this.kuang[0].active = false;
            this.kuang[1].active = false;
        }
    },

    dian(event, id) {
        var ide = parseInt(id);

        this.xianzi(ide);
        if (ide == 11) {
            this.shiti[0].active = false;
            this.shiti[1].active = true;
            this.shiti[2].active = true;
            cc.audioEngine.play(this.yin[4], false, 1);
            this.xzfan = true;
            cc.tween(this)
                .delay(0.5)
                .call(() => {
                    this.xzfan = false;
                })
                .start()
        }
        cc.audioEngine.play(this.yin[1], false, 1);
        this.da++;
        this.daanzi.string = this.da + "/" + this.shu;
        if (this.da == this.shu) {
            cc.tween(this)
                .delay(0.5)
                .call(() => {
                    this.unscheduleAllCallbacks();
                    cc.director.emit("游戏胜利");
                    console.log("游戏胜利");
                })
                .start()
        }
    },

    // update (dt) {},
});
