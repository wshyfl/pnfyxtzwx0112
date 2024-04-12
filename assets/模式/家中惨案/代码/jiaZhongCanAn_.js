
cc.Class({
    extends: cc.Component,

    properties: {
        sfxArr: [cc.AudioClip],
    },

    // onLoad () {},

    btnCallBack(event, type) {
        cc.director.emit("按钮音效");
        switch (type) {
            case "加时":
                AD.showAD(this.jiaShi, this);
                break;
            case "返回":
                cc.director.emit("显示暂停界面");
                break;
        }
    },

    jiaShi() {

        // this.second = 120;
        // this.timeLabel.string = this.second + "s";
        // this.timeLabel.node.color = new cc.color(255, 255, 255, 255);
    },
    onDisable() {
        cc.audioEngine.stop(this.bgmIndex);
    },
    start() {
        cc.director.on("停止bgm",()=>{
            cc.audioEngine.stop(this.bgmIndex);
        },this);
        
        this.bgmIndex = cc.audioEngine.play(this.sfxArr[0], true, 0.2);
        this.pause = false;
        cc.director.on("游戏暂停", () => {
            this.pause = true;
        }, this);
        cc.director.on("游戏开始", () => {
            this.pause = false;
        }, this);
        cc.director.on("音效", this.playSfx, this);
        this.begin();
    },
    begin() {

        // this.playSfx("开始");
        
        cc.director.on("点错了", () => {
            if (this.second <= 0) return;
            // this.playSfx("打错");
            // this.second -= 5;
            // if (this.second < 0)
            //     this.second = 0;
            // this.timeLabel.string = this.second + "s";
            // this.createJianFen();
            // if (this.second <= 0) {
            //     cc.director.emit("游戏失败");
            //     cc.director.emit("游戏暂停");
            // }
        }, this);
        this.second = 120;
        // this.timeLabel.string = this.second + "s";
        this.schedule(() => {
            // if (this.second <= 0) return;
            // if (this.pause) return;
            // this.second--;
            // this.timeLabel.string = this.second + "s";
            // if (this.second < 20) {

            //     cc.director.emit("音效", "倒计时");
            //     this.timeLabel.node.color = new cc.color(255, 0, 0, 255);
            // }

            // if (this.second <= 0) {
            //     cc.director.emit("游戏失败");
            //     console.log("游戏失败")
            //     cc.director.emit("游戏暂停");
            // }
        }, 1)
    },

    createJianFen() {
        // var _jianFen = cc.instantiate(this.jianFen);
        // _jianFen.parent = this.jianFen.parent;
        // _jianFen.active = true;
        // cc.tween(_jianFen)
        //     .by(0.3, { y: 50, opacity: 0 })
        //     .call(() => {
        //         _jianFen.destroy();
        //     })
        //     .start();
    },
    playSfx(_name) {
        var _index = -1;
 
        for(var i=0;i<this.sfxArr.length;i++){
            if(this.sfxArr[i].name == _name){
                _index = i;
                break;
            }
        }
        if (_index != -1) {
            cc.audioEngine.play(this.sfxArr[_index], false, 1);
        }
        else {
            console.warn("音效播放失败  " +_name);
        }
    },
    // update (dt) {},
});
