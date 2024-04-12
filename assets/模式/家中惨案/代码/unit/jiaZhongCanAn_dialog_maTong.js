

cc.Class({
    extends: cc.Component,

    properties: {
        hair: cc.Node,
        key: cc.Node,
        sfxKey:cc.AudioClip,
    },

    // onLoad () {},

    start() {
        this.hairPos = this.hair.position;

        this.hair.on("touchmove", (event) => {
            this.hair.x += event.getDelta().x;
            this.hair.y += event.getDelta().y;
        }, this);
        this.hair.on("touchend", (event) => {
            if (this.getDistance(this.hairPos, this.hair.position) > 160) {
                this.hair.active = false;
            }
            else
                this.hair.position = this.hairPos;
        }, this);
        this.hair.on("touchcancel", (event) => {
            if (this.getDistance(this.hairPos, this.hair.position) > 60) {
                this.hair.active = false;
            }
            else
                this.hair.position = this.hairPos;
        }, this);

        this.key.on("touchstart", () => {
            if(window.gouYin)//是否已经降罪犯勾引进客厅?
            {
                cc.director.emit("显示死亡","被发现")
            }
            else {
                this.key.active = false;
                window.getKey = true;//已经找到钥匙了?
                cc.audioEngine.play(this.sfxKey,false,1);
            }
        
        }, this)
    },

    getDistance(pos, pos2) {
        var distance = Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2));
        return distance;
    },
    // update (dt) {},
});
