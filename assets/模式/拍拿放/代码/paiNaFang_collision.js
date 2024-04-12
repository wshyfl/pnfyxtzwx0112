
cc.Class({
    extends: cc.Component,

    properties: {
        ballParent:cc.Node,
        roleAnim:sp.Skeleton,
    },

    // onLoad () {},

    start() {

        cc.director.on("拍拿放按钮按下", (_index) => {
            for (var i = 0; i < 4; i++) {
                this.node.children[i].active = (i == _index);
            }
            this.scheduleOnce(() => {
                this.node.children[_index].active = false;
            }, 0.03);
            var _str = "拍拿放桌";
            var _anim = _str[_index]
            this.roleAnim.setAnimation(0,_anim,false);
        }, this);

        this.roleAnim.setCompleteListener((a, evt) => {
            this.roleAnim.setAnimation(0,"待机",false);
        });
    },
    

    // update (dt) {},
});
