
cc.Class({
    extends: cc.Component,

    properties: {

        bundleNameArr: [cc.String],
        hadSceneBundle: {
            default: true,
            displayName: "场景有分包吗?",
            tooltip: "如果为false 则不会进行场景的分包加载"
        },//有scene分包?
        jumpNow: {
            default: false,
            displayName: "提前跳转",
            tooltip: "true:加载后立即跳转第一个scene",
            visible() {
                return this.hadSceneBundle;
            },
        },
        bundleSceneName: {
            default: "",
            displayName: "bundle名称",
            visible() {
                return this.hadSceneBundle;
            },
        },
        sceneAll: {
            default: [],
            type: [cc.String],
            visible() {
                return this.hadSceneBundle;
            },
        },
        nextSceneName: {
            default: "loadScene",
            visible() {
                return !this.hadSceneBundle;
            },
        }

    },


    onLoad() {
        cc.game.addPersistRootNode(this.node);
        window.RES = this;
        this.bundleIndex = 0;
        window.bScene = new Array();
        this.initBar();
        this.loadMinDuration = 3;//加载最短用时
    },


    start() {
        this.bundleArr = new Array();
        this.prefabConfigArr = new Array();
        this.sprConfigArr = new Array();




        //一: 先加载bundle
        this.loadBundle();


        cc.director.on("切换场景",(_sceneName, _callFucn, _caller)=>{
            this.loadScene(_sceneName, _callFucn, _caller);
        },this)
    },

    initBar() {

        this.progress = 0;//用于loading进度条
    },
    //scene跳转调用此 方法
    loadScene(_sceneName, _callFucn, _caller) {
        if (this.hadSceneBundle == false) {//没有scene的分包    
            cc.director.loadScene(_sceneName, () => {
                if (_callFucn && _caller) {
                    _callFucn.call(_caller);
                }
            });       
            return;
        }
        var _inFenBao = false;
        for (var i = 0; i < this.sceneAll.length; i++) {
            if (this.sceneAll[i] == _sceneName) {
                _inFenBao = true;
                break;
            }
        }
        if (!_inFenBao) {
            console.log(_sceneName + " 不在分包里 直接加载");
            cc.director.loadScene(_sceneName, () => {
                if (_callFucn && _caller) {
                    _callFucn.call(_caller);
                }
            });
            return;
        }
        for (var i = 0; i < window.bScene.length; i++) {
            if (window.bScene[i] == _sceneName) {
                console.log(_sceneName + " 分包加载完毕");
                cc.director.loadScene(_sceneName, () => {
                    if (_callFucn && _caller) {
                        _callFucn.call(_caller);
                    }
                });
                return;
            }
        }
        this.scheduleOnce(() => {
            console.log(_sceneName + " 分包加载未完成*** 重新检测加载情况");
            if (_callFucn && _caller)
                this.loadScene(_sceneName, _callFucn, _caller);
            else
                this.loadScene(_sceneName);
        }, 0.5)
    },
    getProgress() {
        var _progress = 0.9 + this.bundleIndex / (this.bundleNameArr.length + this.sceneAll.length) * 0.1;
        if (this.hadSceneBundle == false) {//没有scene分包
            if (this.bundleIndex >= this.bundleNameArr.length) {//资源加载完毕
                _progress = 1;
            }
        }
        else {//有scene分包
            if (this.jumpNow) {//加载完第一个场景后 理解跳转
                if (window.bScene.length >= 1)
                    _progress = 1;
            }
        }


        return _progress;
    },
    //第一步 加载资源
    loadBundle() {
        if (this.bundleNameArr.length <= 0) {
            this.loadSceneBundle();
            return;
        }
        var self = this;
        cc.assetManager.loadBundle(self.bundleNameArr[self.bundleIndex], (err, bundle) => {
            self.bundleArr.push(bundle);
            console.log(self.bundleNameArr[self.bundleIndex] + "  bundle加载完毕");
            self.bundleIndex++;
            if (self.bundleIndex < self.bundleNameArr.length) {
                self.loadBundle();
            }
            else {
                self.loadSceneBundle();
            }
        });
    },

    //第二步 加载场景
    loadSceneBundle() {
        if (this.hadSceneBundle == false) {//没有scene的分包           
            return;
        }
        if (this.sceneAll.length <= 0) {
            return;
        }
        var self = this;
        cc.assetManager.loadBundle(this.bundleSceneName, (err, bundle) => {
            if (err) {
                console.log("加载错误 " + err);
                return;
            }

            var _indexTemp = self.bundleIndex - self.bundleNameArr.length;
            console.log("加载场景*** " + self.sceneAll[_indexTemp]);
            bundle.loadScene(self.sceneAll[_indexTemp], (err, scene) => {
                self.loadSceneSucess(scene.name);
                console.log("加载场景完毕*** " + scene.name);
            })


        }); //加载场景资源
    },

    loadSceneSucess(_name) {

        var self = this;
        this.bundleIndex++;
        console.log(_name + "=>加载成功  " + "  this.bundleIndex  " + this.bundleIndex);
        if (this.bundleIndex < (this.bundleNameArr.length + this.sceneAll.length)) {
            this.loadSceneBundle();
        }
        window.bScene.push(_name);
    },
    getPrefab(_bundleName, _prefabName, callFunc, caller) {
        console.log("加载getPrefab**********")
        var self = this;
        //1****已经在缓存
        for (var i = 0; i < this.prefabConfigArr.length; i++) {
            if (this.prefabConfigArr[i].prefabName == _prefabName && this.prefabConfigArr[i].bundleName == _bundleName) {
                var _prefab = this.prefabConfigArr[i].prefab;
                callFunc.call(caller, _prefab);
                console.log("预制体二次获取成功 " + _prefabName);
                return;
            }
        }

        //2****没有加载过 开始加载
        //2-1*****判定是否已经加载了bundle
        var bundle = null;
        for (var i = 0; i < this.bundleArr.length; i++) {
            if (this.bundleArr[i].name == _bundleName)
                bundle = this.bundleArr[i];
        }

        if (bundle == null) {
            console.warn("预制体加载失败 =>bundle为空 bundle名称是:" + _bundleName);
            return;
        }
        //2-2*****开始加载预制体
        bundle.load(_prefabName, cc.Prefab, (err, assets) => {
            if (err) {
                console.warn('Prefab error:' + err);
            }
            else {
                console.log("预制体加载成功 " + _prefabName);
                var _config = { prefab: assets, prefabName: _prefabName, bundleName: _bundleName }
                self.prefabConfigArr.push(_config);
                callFunc.call(caller, assets);
            }
        });

        // var self = this;
        // //1****已经在缓存
        // // for (var i = 0; i < this.prefabConfigArr.length; i++) {
        // //     if (this.prefabConfigArr[i].prefabName == _prefabName && this.prefabConfigArr[i].bundleName == _bundleName) {
        // //         var _prefab = this.prefabConfigArr[i].prefab;
        // //         callFunc.call(caller, _prefab);
        // //         console.log("预制体二次获取成功 " + _prefabName);
        // //         return;
        // //     }
        // // }

        // //2****没有加载过 开始加载
        // //2-1*****判定是否已经加载了bundle
        // Tools.warn("预制体加载进入 bundle名称是:" + _bundleName);
        // var bundle = null;
        // for (var i = 0; i < this.bundleArr.length; i++) {
        //     if (this.bundleArr[i].name == _bundleName)
        //         bundle = this.bundleArr[i];
        // }

        // if (bundle == null) {
        //     Tools.warn("预制体加载失败 =>bundle为空 bundle名称是:" + _bundleName);
        //     return;
        // }
        // //2-2*****开始加载预制体
        // bundle.load(_prefabName, cc.Prefab, (err, assets) => {
        //     if (err) {
        //         Tools.warn('Prefab error:' + err);
        //         callFunc.call(caller, null);
        //     }
        //     else {
        //         console.log("预制体加载成功 " + _prefabName);
        //         // var _config = { prefab: assets, prefabName: _prefabName, bundleName: _bundleName }
        //         // self.prefabConfigArr.push(_config);
        //         // var _prefab = cc.instantiate(assets);
        //         callFunc.call(caller, assets);
        //     }
        // });
    },
    getSpriteFrame(_bundleName, _sprFrame, callFunc, caller) {
        var self = this;
        //1****已经在缓存
        // for (var i = 0; i < this.sprConfigArr.length; i++) {
        //     if (this.sprConfigArr[i].sprName == _sprFrame && this.sprConfigArr[i].bundleName == _bundleName) {
        //         var _prefab = this.sprConfigArr[i].spr;
        //         callFunc.call(caller, _prefab);
        //         console.log("预制体二次获取成功 " + _sprFrame);
        //         return;
        //     }
        // }

        //2****没有加载过 开始加载
        //2-1*****判定是否已经加载了bundle
        var bundle = null;
        for (var i = 0; i < this.bundleArr.length; i++) {
            if (this.bundleArr[i].name == _bundleName)
                bundle = this.bundleArr[i];
        }

        if (bundle == null) {
            Tools.warn("预制体加载失败 =>bundle为空 bundle名称是:" + _bundleName);
            return;
        }
        //2-2*****开始加载预制体
        bundle.load(_sprFrame, cc.SpriteFrame, (err, assets) => {
            if (err) {
                Tools.warn('图片加载 error:' + err);
                callFunc.call(caller, null);
            }
            else {
                console.log("图片加载成功 " + _sprFrame);
                // var _config = { spr: assets, sprName: _sprFrame, bundleName: _bundleName }
                // self.sprConfigArr.push(_config);
                callFunc.call(caller, assets);
            }
        });
    },
    getAssets(_bundleName, _sprFrame, assetType, callFunc, caller) {
        var self = this;
        //1****已经在缓存
        // for (var i = 0; i < this.sprConfigArr.length; i++) {
        //     if (this.sprConfigArr[i].sprName == _sprFrame && this.sprConfigArr[i].bundleName == _bundleName) {
        //         var _prefab = this.sprConfigArr[i].spr;
        //         callFunc.call(caller, _prefab);
        //         console.log("预制体二次获取成功 " + _sprFrame);
        //         return;
        //     }
        // }

        //2****没有加载过 开始加载
        //2-1*****判定是否已经加载了bundle
        var bundle = null;
        for (var i = 0; i < this.bundleArr.length; i++) {
            if (this.bundleArr[i].name == _bundleName)
                bundle = this.bundleArr[i];
        }

        if (bundle == null) {
            Tools.warn("预制体加载失败 =>bundle为空 bundle名称是:" + _bundleName);
            return;
        }
        //2-2*****开始加载预制体
        bundle.loadDir(_sprFrame, assetType, (err, assets) => {
            if (err) {
                Tools.warn('文件夹资源加载失败:' + err);
            }
            else {
                console.log("文件夹加载成功 路径是： " + _sprFrame);
                // var _config = { spr: assets, sprName: _sprFrame, bundleName: _bundleName }
                // self.sprConfigArr.push(_config);
                callFunc.call(caller, assets);
            }
        });
    },
    update(dt) {
        if (this.progress >= 1) return;
        if (this.progress < this.getProgress()) {
            this.progress += dt / this.loadMinDuration;
            if (this.progress >= 1) {
                this.progress = 1;
                if (this.hadSceneBundle == false)//scene没有分包
                    cc.director.loadScene(this.nextSceneName);
                else//scene有分包
                    this.loadScene(this.sceneAll[0]);
            }
        }
    },
});
