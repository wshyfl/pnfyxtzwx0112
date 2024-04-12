
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.arr = this.node.children;
        for (var i = 0; i < 8; i++) {
            this.arr[i].children[0].getComponent(cc.Label).string = this.content.children[i].name
            this.arr[i].on("touchstart", (event) => {
                var _index = event.target.getSiblingIndex();
                this.click(_index);
            }, this)
        }
    },
    click(_index) {
        this.node.active = false;
        for (var i = 0; i < 8; i++)
            this.content.children[i].active = (i == _index);
    }

    // update (dt) {},
});
