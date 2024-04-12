
var LabelUtils2 = require("LabelUtils2");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        if (AD.chanelName1 == "uc"
            || AD.chanelName1 == "BD"
            || AD.chanelName1 == "android") {
                
            return
        }
        cc.game.addPersistRootNode(this.node);


        if (AD.chanelName == AD.chanelName1) {
            this.getSwitchKey();
            // LabelUtils2.getInstance().initLabel(this.key);
            // var _funcGetShare = function () {
            //     //关闭按钮 概率
            //     var _close = LabelUtils2.getInstance().getLabel(this.switch);//


               
            //     if (_close == true) {
            //         this.unschedule(_funcGetShare);
            //         this.switchOn();
            //     }
            //     console.log("************  " + _close);


            // };
            // this.schedule(_funcGetShare, 0.1, 100, 1);
        }



    },

    start() {
        if (AD.chanelName1 == "uc"
            || AD.chanelName1 == "BD"
            || AD.chanelName1 == "android") {
            return
        }
        this.scheduleOnce(() => {
            // AD_vivo.loadData();
            // AD_oppo.loadData();
        }, 0.3)
        this.schedule(() => {
            // AD_vivo.loadData();
            // AD_oppo.loadData();
        }, 20)



        if (AD.chanelName1 == "WX") {
            AD_WX.init();
            this.yuanShengSecond = 0;
            this.schedule(function () {
                if (AD_WX.yuanShengIsOk == false) {
                    AD_WX.showYuanSheng();
                    this.yuanShengSecond = 0;
                }
                else {
                    this.yuanShengSecond++;
                    if (this.yuanShengSecond == 30) {
                        AD_WX.hideYuanSheng();
                    }
                }
            }, 1)
        }
        if (AD.chanelName1 == "huaWei") {
            cc.game.on(cc.game.EVENT_HIDE, event => {
                console.log("------------>后台了");
            }, this);
            cc.game.on(cc.game.EVENT_SHOW, event => {
                console.log("------------>前台了,开始上报");
                cc.director.emit("chaPingReportAdShow");
            }, this);
        }
    },
    getSwitchKey() {
        switch (AD.chanelName1) {
            case "touTiao":  //
                this.key = "";
                this.switch = "switch";
                break;
            case "oppo":  //OPPO
                this.key = "com.gzjj.oppo0712";
                this.switch = "switch";
                break;
            case "vivo":  //vivo 
                this.key = "com.gzjj.vivo0712";
                this.switch = "switch";
                break;
            case "huaWei":  //华为 
                this.key = "";

                this.switch = "switch";
                break;
            case "QQ":  //QQ
                AD_QQ.initQQ();
                this.key = "com.wbgame.ndnw.qq";
                this.switch = "switch";
                break;
            case "WX":  //WX
                this.key = "";
                this.switch = "switch";
                break;
            case "4399Box":  //WX
                this.key = "";
                this.switch = "switch";
                break;
            case "BD":  //WX
                this.key = "";
                this.switch = "switch";
                break;
        }
    },

    switchOn() {
        switch (AD.chanelName1) {
            case "touTiao":
                AD.delayTime = 0.01;//关闭按钮延时
                AD.wuDianRate = 0;//自点击概率
                break;
            case "vivo":

                AD.wuDianRate = 20;//自点击概率
                AD.delayTime = 0.1;//关闭按钮延时
                AD_vivo.chaPingBoo = true;
                AD_vivo.addZhuoMianBoo = true;
                break;
            case "oppo":
                AD.wuDianRate = 20;//自点击概率
                AD.delayTime = 0.1;//关闭按钮延时
                AD_oppo.chaPingBoo = true;

                break;
            case "huaWei":
                AD_HuaWei.bennerBoo = true;
                AD.wuDianRate = 15;//自点击概率
                AD.delayTime = 3;//关闭按钮延时
                break;
            case "QQ":
                AD.wuDianRate = 20;//自点击概率
                AD.delayTime = 3;//关闭按钮延时
                break;
            case "uc":
                AD_UC.init();
                break;
            case "4399Box":
                AD.wuDianRate = 20;//自点击概率
                AD.delayTime = 3;//关闭按钮延时
                break;
            case "WX":
                AD.wuDianRate = 20;//自点击概率
                AD.delayTime = 3;//关闭按钮延时
                break;
            case "BD":
                AD.wuDianRate = 20;//自点击概率
                AD.delayTime = 3;//关闭按钮延时
                break;
        }
    },
    // update (dt) {},
});

