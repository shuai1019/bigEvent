$(function () {
    initUserInfo()
    // 获取信息用户基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)

                }
                // 给表单赋值
                layui.form.val('formUser', res.data)
            }
        });
    }

    // 表单验证
    layui.form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }

        }
    })
    // 点击重置按钮重新初始化页面
    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        // 初始化页面
        initUserInfo()
    });
    // 点击提交按钮，发起数据请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                // 修改成功后再重新渲染用户头像和用户信息
                // 调用getUserInfo()方法 因为当前页面是在iframe窗口 需要用widow.parent 回到index页面
                window.parent.getUserInfo()
            }
        });
    });
})