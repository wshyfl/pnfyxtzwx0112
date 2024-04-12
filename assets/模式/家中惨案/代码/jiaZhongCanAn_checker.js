

cc.Class({
    extends: cc.Component,

    properties: {
        talk:"",
    },


    onLoad() {

        this.node.on("touchstart", this.touchstart, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchcancel, this);
        this.hadCheck = false;
        this.couldCheck = false;
        this.node.children[0].active = false;
        this.node.getComponent(cc.Sprite).enabled = false;
        cc.director.on("重置检查答案", this.checkReset, this);
        cc.director.on("检查答案", this.check, this);
    },
    checkReset(){
        this.couldCheck = false;
    },
    check() {
        if (!this.couldCheck) return;
        if (this.hadCheck) return;
        this.hadCheck = true;
        this.node.children[0].active = true;
        cc.director.emit("找出答案", this.node.name);
        if(this.talk!=""){
            cc.director.emit("说话",this.talk);
        }
    },

    start() {
    },

    touchstart() {
        window.checkRight = true;
        this.couldCheck = false;
    },
    touchend() {
        this.couldCheck = true;
    },
    touchcancel() { 
        this.couldCheck = false;
    },
    // update (dt) {},
});
