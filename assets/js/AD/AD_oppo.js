
window.AD_oppo = {
    videoID_TT: "989510",//视频    
    chaPing_TT: "989505",//插屏
    chaPing_banner: "989507",//模板插屏banner
    bannerID_normal: "",//普通banner
    
    chaPingBoo: false, //插屏开关
    
    autoDestroyDuration: 7,//******** 自动关闭模板插屏 模板banner 的间隔  -1代表不会自动关闭
    switchOn() {
        AD.wuDianRate = 20;//自点击概率
        AD.delayTime = 3;//关闭按钮延时
        AD_oppo.chaPingBoo = true;
    },
     
    shiPin() {
        if (AD.chanelName != AD.chanelName1) {
            AD.reward();
            return;
        }
        if (AD_oppo.videoAd_Revive != null)
            AD_oppo.videoAd_Revive.destroy();
        //复活视频 初始化
        AD_oppo.videoAd_Revive = qg.createRewardedVideoAd({
            adUnitId: AD_oppo.videoID_TT
        })
        AD_oppo.videoAd_Revive.load();

        AD_oppo.videoAd_Revive.onLoad(function () {
            console.log("激励视频加载成功");
            AD_oppo.videoAd_Revive.show();
            AD_oppo.videoAd_Revive.offLoad();

        })
        AD_oppo.videoAd_Revive.onVideoStart(function () {
            AD_oppo.videoAd_Revive.offVideoStart()
            console.log("激励视频 开始播放");
        })
        AD_oppo.videoAd_Revive.onError((err) => {
            AD_oppo.videoAd_Revive.offError()
            qg.showToast({
                //message: '暂无广告，请稍后重试',
                title: '暂无广告，请稍后重试',
                duration: 2000
            })
            console.log('激励视频 加载错误:  ' + JSON.stringify(err))
        })

        AD_oppo.videoAd_Revive.onClose((res) => {
            console.log("视频关闭  结果是   " + JSON.stringify(res))
            if (res.isEnded) {
                console.log('复活 激励视频广告完成，发放奖励');
                AD.reward();
                AD_oppo.videoAd_Revive.offClose();
            } else {
                AD_oppo.videoAd_Revive.offClose();
                console.log('激励视频广告取消关闭，不发放奖励')
                // cc.director.emit("videoTipView");
            }
        })
    },
    //普通插屏
    chaPing() {
        if (!AD_oppo.chaPingBoo) return

        var _showSucess = false;
        var winHeight = qg.getSystemInfoSync().windowHeight
        var winWidth = qg.getSystemInfoSync().windowWidth
        if (winHeight > winWidth) { //竖屏
            var _x = winHeight / 2 - (winWidth - 100) / 32 * 9;
            var _width = winWidth - 100
        }
        else {
            var _width = winHeight - 100
            var _x = 50;
        }
        let customAd = qg.createCustomAd({
            adUnitId: AD_oppo.chaPing_TT,
            style: {
                top: _x,
                // left: width / 2,
                width: _width
            },
        });
        customAd.show()
            .then(() => {
                console.log("show success");
                _showSucess = true;
                if (AD_oppo.autoDestroyDuration > 0) {
                    setTimeout(() => {
                        if (_showSucess)
                            customAd.destroy();
                    }, AD_oppo.autoDestroyDuration * 1000)
                }
            })
            .catch((error) => {
                customAd.destroy();
                console.log("show fail with:" + error.errCode + "," + error.errMsg);
            });
        customAd.onError((err) => {

            console.log("模板插屏: " + JSON.stringify(err));
            customAd.offError();
        });
        customAd.onHide(() => {
            console.log("customAd广告隐藏");
            customAd.offHide();
            _showSucess = false;
        });
    },
    chaPingBanner: null,//模板 banner
    /**显示banner */
    showBanner() {
        if (!AD_oppo.chaPingBoo) return;

        console.log("显示bannner")
        var winHeight = qg.getSystemInfoSync().windowHeight
        var winWidth = qg.getSystemInfoSync().windowWidth
        this.chaPingBanner = qg.createCustomAd({
            adUnitId: AD_oppo.chaPing_banner,
            style: {
                // top: winHeight / 2 - winWidth / 4 - 200,
                // left: width / 2,

                width: winWidth,

            },
        });
        console.log(" winHeight " + winHeight)
        this.chaPingBanner.show()
            .then(() => {
                console.log("模板banner  show success ***  ");
                // if (AD_oppo.autoDestroyDuration > 0) {
                //     setTimeout(() => {
                //         AD_oppo.hideBanner();
                //     }, AD_oppo.autoDestroyDuration * 1000)
                // }
                
            })
            .catch((error) => {
                console.log("模板banner show fail with:" + error.errCode + "," + error.errMsg);
            });
        this.chaPingBanner.onError((err) => {

            console.log("模板banner: " + JSON.stringify(err));
            this.chaPingBanner.offError();
        });
        this.chaPingBanner.onHide(() => {
            console.log("模板banner  customAd广告隐藏");
            this.chaPingBanner.offHide();
        });
    },
    hideBanner() {
        if (!AD_oppo.chaPingBoo) return;
        if (this.chaPingBanner != null) {
            this.chaPingBanner.destroy();
            this.chaPingBanner = null;
        }
    },
    
    bannerAd: null,//普通banner
    //普通banner
    showBannerNormal() {
        console.log("普通banner");
        if (AD_oppo.bannerAd != null) {
            AD_oppo.bannerAd.show()
            AD_oppo.hideGameBanner();
            return
        }

        let screenHeight = qg.getSystemInfoSync().screenHeight;
        let screenWidth = qg.getSystemInfoSync().screenWidth;
        AD_oppo.bannerAd = qg.createBannerAd({
            adUnitId: AD_oppo.bannerID_normal,
            style: {
                top: screenHeight,
                left: 0,
                width: screenWidth,
                height: 300
            }
        })
        AD_oppo.bannerAd.show()
        AD_oppo.bannerAd.onError(function (err) {
            console.log("banner 加载失败 " + err);
        })

        AD_oppo.bannerAd.onLoad(function () {
            
        })

    },
    hideBannerNormal() {
        if (AD_oppo.bannerAd != null) {
            AD_oppo.bannerAd.destroy()
            AD_oppo.bannerAd = null;
        }
    },
    
    /**添加到桌面 */
    addDesktop() {
        if (AD.chanelName != AD.chanelName1)
            return;

        qg.hasShortcutInstalled({
            success: function (res) {
                // 判断图标未存在时，创建图标
                if (res == false) {
                    qg.installShortcut({
                        success: function () {
                            // 执行用户创建图标奖励
                        },
                        fail: function (err) { },
                        complete: function () { }
                    })
                }
            },
            fail: function (err) { },
            complete: function () { }
        })
    },
    
    
    
    
    
}