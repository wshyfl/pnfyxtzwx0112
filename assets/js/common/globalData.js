window.globalData = {

    clearDataNow: false,//清除数据吗?
    keyFirst: "key_first脑洞规则找茬1",
    keyData: "key_data脑洞规则找茬1",
    firstToMenu: true,
    unlockAll: false,//默认解锁所有模式?

    aaa: "aaa",
    starArr: [5, 5, 4, 4, 4, 5, 4, 5, 5, 5, 5],
    modeArr:
        [
            "拍拿放",
            "找出青蛙",
            "夺回财产",//
            "留守儿童",//
            "酒店怪谈",
            "浴室谜案",
            "都市怪谈",
            "家中惨案",
            "恐怖卫生间",
            "目击证人2",
            "买个豪宅",//11
            // "目击证人",
            // "规则怪谈",//
            // "诡异直播",//
            // "细思极恐",//
            // "午夜禁忌",//
            // "怪异闺蜜",//
            // "午夜站台", //           
            // "记得带纸",//
            // "无人直播",//
            // "废弃学校",//
            // "诡异医院",//
            // "生死博弈",//
        ],
    data: {
        unlockState: [true, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false],

    },
    getUnlockState(_modeName) {
        var _index = -1;
        for (var i = 0; i < this.modeArr.length; i++) {
            if (_modeName == this.modeArr[i]) {
                _index = i;
                break;
            }
        }
        if (_index == -1) {
            console.warn("模式错误  " + _modeName);
            return -1;
        }
        return this.data.unlockState[_index];
    },
    setUnlockState(_modeName, _self) {
        var _index = -1;
        for (var i = 0; i < this.modeArr.length; i++) {
            if (_modeName == this.modeArr[i]) {
                _index = i;
                break;
            }
        }
        if (_index == -1) {
            console.warn("模式错误  " + _modeName);
            return;
        }

        if (!_self)
            this.data.unlockState[_index + 1] = true;
        else
            this.data.unlockState[_index] = true;
        this.saveData();

    },

    getDataAll() {
        // return;
        if (this.clearDataNow)
            globalData.clearAllData();
        cc.debug.setDisplayStats(false);


        if (cc.sys.localStorage.getItem(globalData.keyFirst) != 1) {
            cc.sys.localStorage.setItem(globalData.keyFirst, 1);
            globalData.saveData();
            cc.log("首次进入游戏")
            globalData.data = globalData.getData();
        }
        else {
            cc.log("非首次进入游戏 " + cc.sys.localStorage.getItem(globalData.keyFirst))
            globalData.data = globalData.getData();

        }

        if (this.unlockAll) {
            //获取当前角色index
            for (var i = 0; i < this.data.unlockState.length; i++) {
                this.data.unlockState[i] = true;
            }
            this.saveData();
        }
        window.keyData = this.keyData;

    },
    clearAllData() {
        cc.sys.localStorage.removeItem(globalData.keyFirst);
        cc.sys.localStorage.removeItem(globalData.keyData);
    },
    saveData() {

        cc.sys.localStorage.setItem(globalData.keyData, JSON.stringify(globalData.data));
    },
    getData() {
        var _res = cc.sys.localStorage.getItem(globalData.keyData);
        cc.log("_res = " + _res)
        if (_res != null)
            return JSON.parse(_res);

    },



    changeScene(_nextScene) {
        cc.director.emit("显示过场", _nextScene);
        // cc.director.loadScene(_nextScene);
    }
}