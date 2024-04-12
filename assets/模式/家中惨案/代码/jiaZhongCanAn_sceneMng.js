

cc.Class({
    extends: cc.Component,

    properties: {
        sfxFoot:cc.AudioClip,
        sceneArr: [cc.Node],
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.on("切换镜头", (_sceneNow, _sceneNext) => {
            this.changeScene(_sceneNow, _sceneNext);
        }, this);
        cc.director.on("显示死亡", (_dieDialog) => {
            this.showDieDialog(_dieDialog);
        }, this);
        cc.director.on("脚步声",()=>{cc.audioEngine.play(this.sfxFoot)},this);
    },
    back(){
        switch(this.showNodeNow){
            case "马桶":

                break;
        }
    },
    start() {
        cc.director.emit("说话", "我回来啦");
        window.getKey = false;//已经找到钥匙了?
        window.gouYin = false;//是否已经降罪犯勾引进客厅?
    },
    //场景切换
    changeScene(_sceneNow, _sceneNext) {
        var _nodeNow = null;
        var _nodeNext = null;
        var _findNum = 0;
        for (var i = 0; i < this.sceneArr.length; i++) {
            if (this.sceneArr[i].name == _sceneNow) {
                _findNum++;
                _nodeNow = this.sceneArr[i];
                if (_findNum == 2) {
                    break;
                }
            }
            if (this.sceneArr[i].name == _sceneNext) {
                _findNum++;
                _nodeNext = this.sceneArr[i];
                if (_findNum == 2) {
                    break;
                }
            }
        }


        if (_findNum != 2) {
            console.warn("传入的某个场景不存在 " + _sceneNow + "  " + _sceneNext);
            return;
        }
        if (_nodeNow) {//消失动作            
            switch (_nodeNow.name) {
                case "大门":
                    _nodeNow.children[0].getComponent("jiaZhongCanAn_mask").couldMove = false;
                    cc.director.emit("说话", "奇怪,门怎么开啦")
                    cc.tween(_nodeNow.children[0])
                        .to(3, { scale: 1.5 })
                        .call(() => {
                            _nodeNow.active = false;
                            this.showNext(_nodeNext);
                            cc.director.emit("说话", "爸...妈...怎么没人应呢")
                        })
                        .start()
                    break;
                default:
                    _nodeNow.active = false;
                    this.showNext(_nodeNext);
                    break;
            }
        }

    },
    //显示下一个场景
    showNext(_nodeNext) {
        _nodeNext.active = true;
        switch (_nodeNext.name) {
            case "客厅":
                if(window.gouYin){
                    cc.director.emit("显示死亡","被发现");
                }
                break;
        }
    },
    //死亡的界面
    showDieDialog(_dieDialog){
        for (var i = 0; i < this.sceneArr.length; i++) {
            if (this.sceneArr[i].name == _dieDialog) {
                this.sceneArr[i].active = true;
                break;
            }
        }
    },
    // update (dt) {},
});
