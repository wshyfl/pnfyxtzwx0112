cc.Class({
    extends: cc.Component,

    properties: {
        kuang:cc.Node,
        tu:[cc.SpriteFrame],
        zhezhao:cc.Node,
        yin: [cc.AudioClip],
        tx:cc.Prefab,
        shijian:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.audioEngine.play(this.yin[0], true, 0.5);
        cc.director.on("游戏暂停", () => {
            this.unscheduleAllCallbacks();
        }, this);
        cc.director.on("游戏开始", () => {
            this.jishi();
        }, this);
        this.kaishi()
    },

    kaishi() {
        this.shi = 120;
        this.shijian.string = "120s";
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

    hong() {
        cc.audioEngine.play(this.yin[2], false, 1);
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

    jiashi() {
        AD.showAD(this.hui, this)
    },

    hui() {
        this.shi = 120;
        this.shijian.string = "120s";
        this.bai();
    },

    onDestroy() {
        cc.audioEngine.stopAll();
    },

    dian(id){
        this.zi=this.kuang.children;
        var que=null;
        for(var i=0;i<this.zi.length;i++){
            if(this.zi[i].getChildByName("tu").active==false){
                que=this.zi[i];
                break;
            }
        }
        cc.audioEngine.play(this.yin[1], false, 1);
        que.getChildByName("tu").active=true;
        que.getChildByName("tu").getComponent(cc.Sprite).spriteFrame=this.tu[id];

        var aa = cc.instantiate(this.tx);
        aa.parent = que;
        aa.position = cc.v2(0, 0);

        var que=null;
        for(var i=0;i<this.zi.length;i++){
            if(this.zi[i].getChildByName("tu").active==false){
                que=this.zi[i];
                break;
            }
        }
        if(que==null){
            this.shengli()
        }
    },

    shengli(){
        this.zhezhao.active=true;
        cc.tween(this.node)
            .delay(1)
            .call(()=>{
                console.log("游戏胜利")
                cc.director.emit("游戏胜利")
                this.unscheduleAllCallbacks();
            })
            .start()
    },

    // update (dt) {},
});
