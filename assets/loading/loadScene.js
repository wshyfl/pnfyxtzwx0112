
cc.Class({
    extends: cc.Component,

    properties: {
        bar: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log(globalData.modeArr)
        globalData.getDataAll();
        if (AD.chanelName1 == "QQ" || AD.chanelName1 == "touTiao")
            window.showBigADIcon = true;//显示 摄像机图标
    },

    start() {
        // this.check();

        console.log(globalData.modeArr)
    },

    update(dt) {
        this.bar.string = parseInt(RES.progress*100);
    },

    check() {
        var modeArr =
            [
                "文字大逃亡",//文字大逃亡
                "你在说什么",//你在说什么
                "回家的诱惑",//回家的诱惑
                "爆笑躲猫猫",//爆笑躲猫猫
                "房东收租",//脑洞文字
                "诡异直播",
                "细思极恐",
                "西游角色",
                "客人要来",
                "星级厕所",//找茬不合理
                "午夜禁忌",
                "寻找狗狗",
                "怀旧厕所",
                "时代记忆",
                "破屋取暖",//破屋取暖
                "劝退大妈",
                "古村老宅",
                "西瓜套娃",
                "孤岛求生",
                "嬛嬛想你",//穿帮名场面
                "黑暗料理",
                "街边小吃",
                "怪异闺蜜",
                "热梗江湖",//热梗来挑战
                "李白偷光",
                "诡异民宿",
                "午夜站台",
                "记得带纸",//诡异回忆录
                "无人直播",
                "废弃学校",
                "诡异医院",

                "山寨大全",//新加的开始
                "想吃鱼了",
                "西游降魔",
                "欢度元宵",
                "九转大肠",
                "生死博弈",
                "灯泡连线",
            ];
        var modeArr2 = [

            "破屋取暖",
            "客人要来",
            "古村老宅",
            "西瓜套娃",
            "山寨大全",//5
            "劝退大妈",
            "细思极恐",
            "想吃鱼了",
            "星级厕所",
            "寻找狗狗",//10
            "孤岛求生",
            "时代记忆",
            "西游降魔",
            "怀旧厕所",
            "西游角色",//15
            "嬛嬛想你",
            "街边小吃",
            "热梗江湖",
            "黑暗料理",
            "欢度元宵",//20
            "李白偷光",
            "九转大肠",
            "诡异民宿",
            "怪异闺蜜",


        ];
        for (var i = 0; i < modeArr2.length; i++) {
            var _different = true;
            for (var j = 0; j < modeArr.length; j++) {
                if (modeArr2[i] == modeArr[j]) {
                    _different = false;
                    break;
                }
            }
            if (_different) {
                console.log("不同的  " + modeArr2[i]);
            }
        }
    }

});
