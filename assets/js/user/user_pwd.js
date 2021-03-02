$(function () {
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    // 点击修改密码之后
    // 1.向后台发送重置密码请求
    // 2.整个页面跳转到登录页面
    // 3.清空存储的token
    // 1.向后台发送重置密码请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 清空存储的token
                localStorage.removeItem('token')
                // todo 怎么让整个页面跳转到login页面后，login的用户名显示的是最新的用户名？
                // 整个页面跳转到登录页面
                // location.href='/login.html' 这样只是整个iframe标签跳转到login页面
                window.parent.location.href = '/login.html'            
            }
        });
    });

})