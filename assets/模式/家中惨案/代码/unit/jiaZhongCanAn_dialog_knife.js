
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {
        this.scheduleOnce(()=>{
            cc.director.emit("显示死亡","死亡拿刀")
        },3)
    },

    // update (dt) {},
});
