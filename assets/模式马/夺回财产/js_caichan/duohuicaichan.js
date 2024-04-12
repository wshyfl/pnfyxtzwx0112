cc.Class({
    extends: cc.Component,

    properties: {
        chouti: cc.Node,
        qian: cc.Node,
        qiandeng: cc.Node,
        dianshi: cc.Node,
        zhezhao: cc.Node,
        guang: cc.Node,
        xuantu: cc.Sprite,
        tubiao: [cc.SpriteFrame],
        xuankuang: cc.Node,
        shuohua: [cc.Label],
        yuyin: [cc.AudioClip],
        hetao: [cc.Node],
        qianbiao:cc.Label,
        shafa:[cc.Node],
        shui:[sp.Skeleton],
        juese:[sp.Skeleton],
        yin:[cc.AudioClip],
        dianshi1:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    },

    onDestroy(){
        cc.audioEngine.stopAll();
    },

    start() {
        this.xzdianshi = false;
        this.shuaqian=false;
        this.kaiguan=false;
        this.xzdian=false;
        this.caichan=400000;
        this.jiage = [100000, 7134, 1000,11000,15,200,700,30000,4000,7778,20,10,60,10000,200000,22222,6666];
        this.mingzi = ["电视", "合照", "鞋墙","地毯","打火机","钱包","吊灯","私房钱","电脑","ps5","房产证","银行卡","核桃","古玩","金牙","项链","沙发皮"];
        this.hua = [
            "肯定不是说我~",
            "就不能给我妈留个念想吗？",
            "我妈说，这是她在地摊上买的",
            "拿去给你当被子盖",
            "随便拿，我家还有一堆",
            "我妈说，钱应该给她管",
            "我妈说，她早就想换了",
            "崽崽，你居然背着我藏私房钱",
            "随便拿，我妈还会给我买",
            "随便拿，我妈还会给我买",
            "我妈说，房产证只写我一个人的名字",
            "我妈说，钱应该给她管",
            "这是菜市场买的，不值钱",
            "我妈说她不差这点钱~",
            "随便拿，我还可以装",
            "随便拿，我家还有一堆",
            "早就想换了",
        ];
        this.xl=true;
        this.ya=true;
        this.a={"qian":400000};
        cc.audioEngine.play(this.yin[4], true, 1);
        this.xx=false
    },

    fanhui() {
        cc.director.emit("显示暂停界面");
    },

    dianji(id,str) {//点击物品
        if(this.xx){
            return;
        }
        this.xx=true;
        cc.audioEngine.play(this.yin[2], false, 1);
        this.xzdian=true;
        this.guang.parent.active = true;
        this.xuantu.node.active = true;
        this.xuantu.node.scale=1;
        this.xuantu.node.x = 0;
        this.xuantu.node.y = 158.861;

        this.xuantu.spriteFrame = this.tubiao[id - 3];
        if(id==3){
            cc.audioEngine.stop(this.dianyin);
        }

        if(id==9||id==10){
            this.kaiguan=true;
            str.destroy();
        }else if(id==19){
            this.shafa[0].active=false;
            this.shafa[1].active=true;
        }
        else{
            str.destroy();
        }

        cc.tween(this.node)
            .delay(0.6)
            .call(() => {
                this.huigui(id);
            })
            .start()
    },

    dingzi() {
        var zi = this.xuankuang.children;
        this.quekuang = null;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                this.quekuang = zi[i];
                return;
            }
        }
    },

    huigui(id) {
        this.guang.parent.active = false;
        this.dingzi();
        var shi = this.quekuang.parent.convertToWorldSpaceAR(this.quekuang.position);
        var ju = this.xuantu.node.parent.convertToNodeSpaceAR(shi);
        cc.audioEngine.stop(this.shuo)
        if(this.bb){
            this.shuohua[0].node.parent.active = false;
            this.shuohua[1].node.parent.active = false;
            this.bb.stop()
        }

        cc.tween(this.xuantu.node)
            .to(0.2, { x: ju.x, y: ju.y,scale:0.25 })
            .call(() => {
                // this.xuantu.node.active = false;
                this.quekuang.getChildByName("tu").active = true;
                this.quekuang.getChildByName("tu").scale=0.25;
                this.xx=false;
                this.quekuang.getChildByName("tu").getComponent(cc.Sprite).spriteFrame=this.tubiao[id - 3];
                this.quekuang.getChildByName("num").getComponent(cc.Label).string = this.jiage[id - 3];
                this.quekuang.getChildByName("zi").getComponent(cc.Label).string = this.mingzi[id - 3];

                this.qiandh(id);

                var ming = this.mingzi[id - 3];
                this.shuo = cc.audioEngine.play(this.yuyin[id - 3], false, 1);
                if (ming == "地毯" || ming == "私房钱" || ming == "沙发皮" || ming == "金牙"||ming == "核桃") {
                    this.shuohua[1].node.parent.active = true;
                    this.shuohua[1].string = this.hua[id - 3];
                } else {
                    this.shuohua[0].node.parent.active = true;
                    this.shuohua[0].string = this.hua[id - 3];
                }
                if(id==18){
                    this.xl=false;
                    if(this.ya){
                        this.juese[1].setAnimation(0, "没项链", true);
                    }else{
                        this.juese[1].setAnimation(0, "没牙没项链", true);
                    }
                }else if(id==17){
                    this.ya=false;
                    if(this.xl){
                        this.juese[1].setAnimation(0, "baya", false);
                        this.juese[1].setCompleteListener((a, evt) => {
                            if (a.animation.name == "baya") {
                                this.juese[1].setAnimation(0, "没牙", true);
                            }
                
                        })
                    }else{
                        this.juese[1].setAnimation(0, "baya没项链", false);
                        this.juese[1].setCompleteListener((a, evt) => {
                            if (a.animation.name == "baya没项链") {
                                this.juese[1].setAnimation(0, "没牙没项链", true);
                            }
                
                        })
                    }
                }
                this.jieshu();
            })
            .start()
    },

    jieshu() {
        var quekuang = null;
        var zi = this.xuankuang.children;
        for (var i = 0; i < zi.length; i++) {
            if (zi[i].getChildByName("tu").active == false) {
                quekuang = zi[i];
            }
        }
        this.bb=cc.tween(this.node)
            .delay(cc.audioEngine.getDuration(this.shuo))
            .call(() => {
                this.shuohua[0].node.parent.active = false;
                this.shuohua[1].node.parent.active = false;
                if (quekuang) {

                    this.xzdian=false
                } else {
                    this.zhezhao.active=true;
                    if(this.caichan<=0){
                        cc.director.emit("游戏胜利");
                        console.log("游戏胜利")
                    }else{
                        cc.director.emit("游戏失败");
                        console.log("游戏失败")
                    }
                    
                }
            })
            this.bb.start()
    },

    diandeng() {
        console.log(this.kaiguan)
        if(this.kaiguan){
            return;
        }
        if (this.qian.active) {
            this.qian.active = false;
            this.qiandeng.active = true;
        } else {
            this.qian.active = true;
            this.qiandeng.active = false;
        }
    },

    poren(str){
        if(str=="ltt"){
            this.ponv()
        }else{
            this.ponan()
        }
    },

    ponan(){


        this.xzdian=true;
        cc.audioEngine.play(this.yin[1], false, 1);
        this.shui[0].node.active=true;
        this.shui[0].setAnimation(0, "animation", false);
        this.shui[0].setCompleteListener((a, evt) => {
            if (a.animation.name == "animation") {
                this.shuohua[0].node.parent.active = true;
                this.shuohua[0].string = "你干嘛~嗨呦~";
                this.shuo1=cc.audioEngine.play(this.yuyin[17], false, 1);

                cc.tween(this.node)
                    .delay(cc.audioEngine.getDuration(this.shuo1))
                    .call(()=>{
                        this.shuohua[0].node.parent.active = false;
                        this.xzdian=false;
                    })
                    .start()

                this.shui[0].node.active=false;
                this.juese[0].setAnimation(0, "poshui", false);
                this.juese[0].setCompleteListener((a, evt) => {
                    if (a.animation.name == "poshui") {
                        this.juese[0].setAnimation(0, "daiji", true);
                    }
        
                })
            }

        })
    },

    ponv(){

        this.xzdian=true;
        cc.audioEngine.play(this.yin[1], false, 1);
        this.shui[1].node.active=true;
        this.shui[1].setAnimation(0, "animation", false);
        this.shui[1].setCompleteListener((a, evt) => {
            if (a.animation.name == "animation") {
                this.shuohua[0].node.parent.active = true;
                this.shuohua[0].string = "你干嘛~嗨呦~";
                this.shuo1=cc.audioEngine.play(this.yuyin[17], false, 1);

                cc.tween(this.node)
                    .delay(cc.audioEngine.getDuration(this.shuo1))
                    .call(()=>{
                        this.shuohua[0].node.parent.active = false;
                        this.xzdian=false
                    })
                    .start()

                this.shui[1].node.active=false;
                if(this.ya){
                    if(this.xl){
                        this.juese[1].setAnimation(0, "poshui", false);
                        this.juese[1].setCompleteListener((a, evt) => {
                            if (a.animation.name == "poshui") {
                                this.juese[1].setAnimation(0, "daiji", true);
                            }
                
                        })
                    }else{
                        this.juese[1].setAnimation(0, "poshui没项链", false);
                        this.juese[1].setCompleteListener((a, evt) => {
                            if (a.animation.name == "poshui没项链") {
                                this.juese[1].setAnimation(0, "没项链", true);
                            }
                
                        })
                    }
                }else{
                    if(this.xl){
                        this.juese[1].setAnimation(0, "poshui", false);
                        this.juese[1].setCompleteListener((a, evt) => {
                            if (a.animation.name == "poshui") {
                                this.juese[1].setAnimation(0, "没牙", true);
                            }
                
                        })
                    }else{
                        this.juese[1].setAnimation(0, "poshui没项链", false);
                        this.juese[1].setCompleteListener((a, evt) => {
                            if (a.animation.name == "poshui没项链") {
                                this.juese[1].setAnimation(0, "没牙没项链", true);
                            }
                
                        })
                    }
                }

            }

        })
    },

    cahetao(){
        cc.audioEngine.play(this.yin[0], false, 1);
        this.hetao[0].active=false;
        this.hetao[1].active=true;
    },

    jianshafa(){

        this.dianji(19);
        this.shafa[0].active=false;
        this.shafa[1].active=true;
    },

    diangui() {
        if (this.chouti.active) {
            return;
        }
        this.chouti.active = true;
    },

    diandianshi() {
        if (this.xzdianshi) {
            return;
        }

        this.xzdianshi = true;
        this.dianyin=cc.audioEngine.play(this.yin[3], false, 1);
        this.dianshi.active = true;
        this.dianshi1.active = false;
    },

    qiandh(id){
        this.shuaqian=true;
        this.caichan-=this.jiage[id - 3];
        cc.tween(this.a)
            .to(0.7,{qian:this.caichan})
            .delay(0.1)
            .call(()=>{
                this.shuaqian=false;
            })
            .start()
    },

    update(dt) {
        this.guang.angle += 5;
        if(this.shuaqian){
            this.qianbiao.string=Math.floor(this.a.qian);
        }
    },
});
