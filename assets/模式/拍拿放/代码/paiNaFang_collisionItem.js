

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onEnable() {
        this.couldCollision = true;
        this.arr = new Array();
        this.arr.length = 0;
    },
    onCollisionEnter(other, self) {
        // if (this.index != other.tag) {
        //     console.log("拍错了 失败 ");
        //     window.paiNaFang.createEffect(0);//拍错了 失败
        // }
        // else {
        //     this.getScore(other.node.x);
        // }


        // other.node.destroy();

        this.index = self.tag;
        if (other.node) {
            // console.log("碰到了 " + other.node.x);
            this.arr.push(other.node);
        }
        if (this.couldCollision) {
            this.couldCollision = false;
            this.scheduleOnce(() => {
                var _ball = null;
                for (var i = 0; i < this.arr.length; i++) {
                    if (_ball == null)
                        _ball = this.arr[i];
                    else {
                        if (this.arr[i].x < _ball.x)
                            _ball = this.arr[i];
                    }
                }
                if (_ball) {
                    var _ballJS = _ball.getComponent("paiNaFang_item")
                    this.getScore(_ball.x, _ballJS.index);
                    _ball.getComponent(cc.BoxCollider).enabled = false;
                    cc.tween(_ball)
                        .to(0.1, { scale: 1.5, opacity: 0 })
                        .call(() => {
                            _ball.destroy();
                        })
                        .start();
                }
                this.node.active = false;
            }, 0.01)
        }
    },
    getScore(_targetX, _ballIndex) {
        if (_ballIndex != this.index) {

            window.paiNaFang.createEffect(0);
            console.log("种类错了");
            return;
        }
        var _num = 0;
        console.log("距离: " + Math.abs(this.node.x - _targetX))
        if (Math.abs(this.node.x - _targetX) < 60) {
            _num = 3;//完美
        }
        else if (Math.abs(this.node.x - _targetX) < 150) {
            _num = 2;//优秀
        }
        else if (Math.abs(this.node.x - _targetX) < 250) {
            _num = 1;//良
        }
        else
            _num = 0;//失败
        window.paiNaFang.createEffect(_num);
    },
    // update (dt) {},
});
