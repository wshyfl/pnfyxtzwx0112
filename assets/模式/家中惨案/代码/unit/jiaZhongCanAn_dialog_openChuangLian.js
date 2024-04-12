

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {
        window.gouYin = true;//是否已经降罪犯勾引进客厅?
        this.scheduleOnce(()=>{
            console.log("aaa")
            cc.director.emit("显示死亡","窗帘");
            this.node.active = false;
        },2)
    },

    // update (dt) {},
});
