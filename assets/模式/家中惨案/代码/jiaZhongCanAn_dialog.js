
cc.Class({
    extends: cc.Component,

    properties: {
        textLabel: cc.Label,
        sfxArr: [cc.AudioClip],

    },

    onLoad () {
        this.callFunc =() => {
            this.node.scale = 0;
        };
        this.sfxIndex = -1;
        cc.director.on("说话", this.reset, this);
        cc.director.on("说话2", this.reset2, this);
        this.node.scale = 0;
    },

    start() {
      
    },
    reset(_content) {
        this.unschedule(this.callFunc);
        this.node.scale = 1;
        this.sfxDuration = 0;
        this.playSfx(_content);
        this.textLabel.string = _content;
        this.scheduleOnce(this.callFunc, this.sfxDuration)
    },
    reset2(_content,_duration) {
        this.unschedule(this.callFunc);
        this.node.scale = 1;
        this.sfxDuration = _duration;
        this.textLabel.string = _content;
        this.scheduleOnce(this.callFunc, this.sfxDuration)
    },

    playSfx(_name) {
        var _index = -1;
        if (this.sfxIndex != -1)
            cc.audioEngine.stop(this.sfxIndex);
        for (var i = 0; i < this.sfxArr.length; i++) {
            if (this.sfxArr[i].name == _name) {
                _index = i;
                break;
            }
        }
        if (_index != -1) {
            this.sfxIndex = cc.audioEngine.play(this.sfxArr[_index], false, 1);
            this.sfxDuration = cc.audioEngine.getDuration(this.sfxIndex);
            cc.audioEngine.setFinishCallback(this.sfxIndex,()=>{
                cc.director.emit("说话音效播放完毕");
            })
        }
        else {
            console.warn("音效播放失败  " + _name);
        }
    },
    // update (dt) {},
});
