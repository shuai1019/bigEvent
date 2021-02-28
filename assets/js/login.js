$(function () {
    // 点击去登录或者注册切换到相对应的表单
    // 绑定事件
    $('.link_reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    });
    $('.link_login').on('click', function () {
        $('.reg').hide()
        $('.login').show()
    });
    // 注册验证
    layui.form.verify({
        psd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repsd: function (value, item) {
            // value就是表单所输入的内容  item是表单元素
            // console.log(value);
            // console.log(item);
            // 判断二次输入的密码与密码框的值是否一致 一致就进入登入页面
            // 获取密码框的值
            // console.log($('.reg [name="password"]').val());
            if (value !== $('.reg [name="password"]').val()) {
                return '两次密码不一致，请重新输入！';
            }
        }

    })
    $('.reg').on('submit', function (e) {
        e.preventDefault()
        // 获取用户名和密码框的值
        var username = $('.reg [name="username"]').val()
        var password = $('.reg [name="password"]').val()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                // console.log(res);
                if (res.status!==0) {
                    return layui.layer.msg(res.message)
                }
                // 注册成功后进入登录页面 
                $('.link_login').click()
                // 把注册页面的username和password文本框值赋值给登录页面的username和password文本框
                $('.login [name="username"]').val(username)
                $('.login [name="password"]').val(password)
            }
        });
    });
    // 登录验证
    // 给login表单绑定监听提交表单事件
    $('#login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户名或密码输入有误')
                }
                // console.log(res);
                // 登录成功,把token数据保存在本地存储中，用于有权限接口的身份认证
                localStorage.setItem('token',res.token)
                // 跳转到index页面
                location.href = '/index.html'
            }
        });
    });

})