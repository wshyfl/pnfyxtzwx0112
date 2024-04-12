
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        btns: [cc.Node],
        page: cc.PageView,
    },

    onLoad() {
        this.pageNum = this.content.childrenCount;
        this.pageIndex = -1;
    },

    btnCallBack(event, type) {
        cc.director.emit("按钮音效");
        switch (type) {
            case "右":
                this.page.setCurrentPageIndex(this.page.getCurrentPageIndex() + 1);
                break;
            case "左":
                this.page.setCurrentPageIndex(this.page.getCurrentPageIndex() - 1);
                break;
        }
    },


    update(dt) {
        if (this.pageIndex != this.page.getCurrentPageIndex()) {
            this.pageIndex = this.page.getCurrentPageIndex();
            this.btns[0].active = (this.pageIndex != 0);
            this.btns[1].active = (this.pageIndex != this.pageNum - 1);
        }
    },
});
