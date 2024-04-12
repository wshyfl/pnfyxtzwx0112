
cc.Class({
    extends: cc.Component,

    properties: {
        tips: cc.Node,
        daAnDialog: cc.Node,
        dialogZong: cc.Node,
        daAn: cc.Node,
        tiShi: cc.Node,
        daAnADIcon: cc.Node,
        tiShiADIcon: cc.Node,

    },

    onLoad() {
        this.keyData = this.node.parent.name + window.keyData;
        cc.director.on("清除缓存", this.clearAllData, this);
        // this.clearAllData();
        this.getData();
    },

    start() {
        if (window.showBigADIcon) {
            var _ADIconTishi = cc.find("dialog/bg/提示/New Node/icon_shiPin", this.node);
            var _ADIconDaAn = cc.find("dialog/bg/答案/New Node/icon_shiPin", this.node);
            if (_ADIconTishi) {
                _ADIconTishi.getComponent(cc.Sprite).spriteFrame = window.gameScene.iconADBig;
            }
            if (_ADIconDaAn) {
                _ADIconDaAn.getComponent(cc.Sprite).spriteFrame = window.gameScene.iconADBig;
            }
        }
        this.dialogZong.active = false;
        this.daAnDialog.active = false;

        this.isDaAn = false;

        this.tiShiADIcon.active = (this.getTiShiLevel() == 0);
        this.daAnADIcon.active = (this.getTiShiLevel() <= 1);

        this.second = 0;
        this.schedule(() => {
            if (window.gameOverNow) return;
            if (!this.dialogZong.active) {
                this.second++;
                if (this.second % 45 == 0) {
                    this.showPanel();
                }
            }
        }, 1)
    },

    btnCallBack(event, type) {
        cc.director.emit("按钮音效");
        this.isAD = false;
        switch (type) {
            case "提示":
                this.isDaAn = false;
                if (this.getTiShiLevel() == 0) {
                    this.isAD = true;
                    AD.showAD(this.showTip, this);
                }
                else
                    this.showTip();
                break;
            case "答案":
                this.isDaAn = true;
                if (this.getTiShiLevel() == 0) {
                    this.createTips();
                }
                else {
                    if (this.getTiShiLevel() == 1) {

                        this.isAD = true;
                        AD.showAD(this.showTip, this);
                    }
                    else
                        this.showTip();
                }
                break;
            case "关闭答案":
                if (this.daAnDialog.active) {
                    this.daAnDialog.active = false;
                }
                else if (this.dialogZong.active) {
                    this.dialogZong.active = false;
                    cc.director.emit("游戏开始");
                }
                break;
            case "提示按钮":
                this.showPanel();
                break;
        }
    },
    showPanel() {
        this.dialogZong.active = true;
        this.daAnDialog.active = false;
        cc.director.emit("游戏暂停");

        AD.chaPing();
        AD.showBanner();
    },
    showTip() {
        if (this.isAD)
            this.setTiShiLevel();
        this.daAnDialog.active = true;
        this.tiShi.active = !this.isDaAn;
        this.daAn.active = this.isDaAn;


        this.tiShiADIcon.active = (this.getTiShiLevel() == 0);
        this.daAnADIcon.active = (this.getTiShiLevel() <= 1);
    },
    createTips() {
        var _tips = cc.instantiate(this.tips);
        _tips.parent = this.tips.parent;
        _tips.active = true;
        _tips.scaleY = 0;
        cc.tween(_tips)
            .to(0.2, { scaleY: 1 })
            .delay(1)
            .to(0.2, { scaleY: 0 })
            .call(() => {
                _tips.destroy();
            })
            .start();
    },
    getTiShiLevel() {
        return this.data.tiShiLevel;
    },
    setTiShiLevel() {
        this.data.tiShiLevel++;
        this.saveData();
    },
    clearAllData() {
        cc.sys.localStorage.removeItem(this.keyData);
    },
    saveData() {
        cc.sys.localStorage.setItem(this.keyData, JSON.stringify(this.data));
    },
    getData() {
        var _res = cc.sys.localStorage.getItem(this.keyData);
        console.log("数据: " + this.keyData + "   " + _res)
        if (_res) {
            this.data = JSON.parse(_res);
            console.log("非首次初始化数据: " + this.keyData + "   " + JSON.stringify(this.data))
        }
        else {
            this.data = {
                tiShiLevel: 0
            };
            this.saveData();
            console.log("首次初始化数据: " + this.keyData + "   " + JSON.stringify(this.data))
        }

    },
    // update (dt) {},
});
