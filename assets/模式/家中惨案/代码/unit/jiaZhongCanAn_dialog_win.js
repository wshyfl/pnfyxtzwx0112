
cc.Class({
    extends: cc.Component,

    properties: {
        sfx:cc.AudioClip,
    },

    // onLoad () {},

    start () {
        this.scheduleOnce(()=>{
            cc.audioEngine.play(this.sfx);
        },1)
        
        this.scheduleOnce(()=>{
            console.log("游戏胜利");
            cc.director.emit("游戏胜利")
        },2)
    },

    // update (dt) {},
});
