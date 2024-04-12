
cc.Class({
    extends: cc.Component,

    properties: {
        bgm: cc.AudioClip,
        btn: cc.AudioClip,
        pageView: cc.PageView,
        content: cc.Node,
        itemBig: cc.Prefab,
        itemSmall: cc.Prefab,
        btnLeft: cc.Node,
        btnRight: cc.Node,
        iconADBig: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.menu = this;
        this.itemBigNow = null;
        this.index = 0;
        this.modeArr = globalData.modeArr;
        this.pageIndex = -1;
        this.begin = false;

    },

    start() {
        window.modeBigIndex = 0;
        this.createItem();
        if (window.stopAudio) 
        {

            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(this.bgm, true);
        }

        AD.chaPing();
        AD.showBanner();

    },

    btnCallBack(event, type) {
        cc.audioEngine.play(window.menu.btn, false, 1);
        switch (type) {
            case "左":
                this.pageView.setCurrentPageIndex(this.pageView.getCurrentPageIndex() - 1);
                break;
            case "右":
                this.pageView.setCurrentPageIndex(this.pageView.getCurrentPageIndex() + 1);
                break;
            case "返回":
                cc.director.loadScene("firstScene");
                break;
        }
    },
    createItem() {
        var _numArr = [globalData.modeArr.length, 5, 5, 4, 4, 4];
        var _indexBegin = 0;

        for (var i = 0; i < _numArr.length; i++) {
            if (i < window.modeBigIndex) {
                _indexBegin += _numArr[i];
            }
            else
                break;
        }
        console.log(globalData.modeArr)
        console.log(this.modeArr)
        this.pageNumSum = 0;
        for (var i = 0; i < this.modeArr.length; i++) {
            if (i >= _indexBegin && i < _indexBegin + _numArr[window.modeBigIndex]) {

                console.log("i  " +i)

                // if (this.pageNumSum%6 == 0) {
                //     this.itemBigNow = cc.instantiate(this.itemBig);
                //     this.pageView.addPage(this.itemBigNow);
                // }

                var _itemSmall = cc.instantiate(this.itemSmall);
                _itemSmall.parent = this.content;

                _itemSmall.getComponent("menu_itemSmall").reset(this.modeArr[i],i);

                this.pageNumSum++;

            }

        }

        if (window.menuPageViewIndex || window.menuPageViewIndex == 0) {
            this.pageView.setCurrentPageIndex(window.menuPageViewIndex);
            this.scheduleOnce(() => {
                this.begin = true;
            }, 0.4)
        }
        else {
            this.begin = true;
        }
    },
    update(dt) {
        if (!this.begin) return;
        if (this.pageIndex != this.pageView.getCurrentPageIndex()) {

            this.pageIndex = this.pageView.getCurrentPageIndex();

            this.btnRight.active = !(this.pageIndex == this.pageNumSum - 1);
            this.btnLeft.active = !(this.pageIndex == 0);

            window.menuPageViewIndex = this.pageView.getCurrentPageIndex();
        }
    },
});
