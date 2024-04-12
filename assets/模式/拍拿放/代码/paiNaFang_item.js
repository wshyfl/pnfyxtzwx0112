
cc.Class({
    extends: cc.Component,

    properties: {
        sprArr: [cc.SpriteFrame]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    reset(_index, _time, _timeTarget) {
        this.num = -1;
        this.index = _index;
        var _rate = 410 * 2 / (410 + 280);
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprArr[_index];
        cc.tween(this.node)
            .to((_timeTarget - _time) * _rate, { x: -410 })
            .call(() => {
                this.node.destroy();
            })
            .start();
    },

 
    // update (dt) {},
});
