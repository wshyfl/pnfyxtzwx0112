

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Node,
        renShu: cc.Label,
        itemParent: cc.Node,
        lianJi: cc.Node,
        effectParent: cc.Node,
        bgm: cc.AudioClip,
        sfxArr: [cc.AudioClip],
        anim: sp.Skeleton,
        light: cc.Node,
    },

    // onLoad () {},

    start() {
        this.over = false;
        cc.director.getCollisionManager().enabled = true;
        window.paiNaFang = this;




        this.time = [5.31, 5.90, 6.46, 6.75, 7.03, 9.96, 10.27, 10.55, 11.14, 11.44, 11.71, 14.64, 14.91, 15.20, 15.79, 16.09, 16.36, 19.26, 19.56, 19.85, 20.14, 20.43, 20.75, 21.01, 23.91, 24.21, 24.48, 24.78, 25.07, 25.37, 25.66, 28.54, 28.85, 29.15, 29.70, 29.98, 30.27, 33.21, 33.48, 33.76, 34.05, 34.35, 34.64, 34.91, 37.82, 38.10, 38.39, 38.70, 38.97, 39.26, 39.55];
        this.arr = ["拍", "拍", "拍", "拿", "放", "拍", "拿", "放", "拍", "拿", "放", "拍", "拍", "桌", "拍", "拿", "放", "拍", "拍", "桌", "桌", "拍", "拿", "放", "拍", "拿", "放", "拍", "拍", "拿", "放", "拍", "拍", "拿", "放", "放", "放", "拍", "拍", "拿", "放", "拍", "拿", "放", "拍", "桌", "拿", "放", "桌", "拿", "放"];
        this.preDuration = 2;//预生成时间 也就是预制体移动用时
        this.timer = 0;


        this.index = 0;

        this.num = 0;
        this.rightNum = 0;
        this.lianJiNum = 0;
        window.targetZhuoNaFangItem = null;

        this.begin = false;


        var self = this;
        this.second = 4;
        this.schedule(() => {
            this.second--;
            if (this.second > 0)
                cc.audioEngine.play(this.sfxArr[0], false, 1);
            else
                cc.audioEngine.play(this.sfxArr[1], false, 1);
        }, 0.8, 3)
        this.anim.setCompleteListener((a, evt) => {
            console.log("开始啦");
            self.bgmIndex = cc.audioEngine.play(self.bgm, false, 1);
            self.durationSum = 47//cc.audioEngine.getDuration(self.bgmIndex);
            self.begin = true;
        });

        this.renShu.string = this.random(8000, 9999);



        this.light.opacity = 0;
    },
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

    create(_time) {
        // if(this.num>0)return;
        this.num++;
        this.str = "拍拿放桌";
        var _index = this.str.indexOf(this.arr[this.index]);
        var _item = cc.instantiate(this.item);
        _item.parent = this.itemParent;
        if (this.num == 1)
            window.targetZhuoNaFangItem = _item;
        _item.getComponent("paiNaFang_item").reset(_index, _time, this.time[this.index]);
    },
    createEffect(_num) {
        if (_num == 0)
            this.lianJiNum = 0;
        else {
            cc.tween(this.light)
                .to(0.1, { opacity: 255 })
                .to(0.1, { opacity: 0 })
                .start();
            this.rightNum++;
            this.lianJiNum++;
            if (this.lianJiNum > 1) {
                this.createLianJi();
            }
        }
        var _effect = cc.instantiate(this.effectParent.children[_num]);
        _effect.parent = this.effectParent;
        _effect.active = true;
        cc.tween(_effect)
            .by(0.5, { y: 60, opacity: 0 }, { easing: "sineOut" })
            .call(() => {
                _effect.destroy();
            })
            .start();
    },
    createLianJi() {
        var _lianJi = cc.instantiate(this.lianJi);
        _lianJi.parent = this.lianJi.parent;
        _lianJi.active = true;
        _lianJi.scale = 0;
        _lianJi.children[0].getComponent(cc.Label).string = this.lianJiNum;
        cc.tween(_lianJi)
            .to(0.1, { scale: 1 })
            .delay(0.2)
            .by(0.3, { y: 60, opacity: 0 }, { easing: "sineOut" })
            .call(() => {
                _lianJi.destroy();
            })
            .start();
    },

    update(dt) {
        if (this.over) return
        if (this.timer >= this.durationSum - 4) {
            this.over = true;
            var _rate = this.rightNum / this.arr.length;
            console.log("正确率是 " + _rate)
            if (_rate >= 0.6) {
                console.log("游戏胜利")
                cc.director.emit("游戏胜利");
            }
            else
                cc.director.emit("游戏失败");
        }
        if (!this.begin) return;
        this.timer += dt;
        if (this.timer >= this.time[this.index] - this.preDuration) {
            if (this.index < this.time.length)
                this.create(this.timer);
            this.index++;
            if (this.index >= this.time.length) {
                console.log("完成")
            }
        }
    },
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
});
