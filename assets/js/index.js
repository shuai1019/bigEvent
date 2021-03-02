$(function () {
    // console.log(1);
    // 1.获取用户基本信息
    // 2.根据信息来判断是否存在用户图片
    // 3.渲染用户信息
    // 3.1有图片就让图片模块显示，隐藏文本模块
    // 3.2没有就让文本模块显示，隐藏图片模块
    getUserInfo()
    // 点击退出 弹出提示框 点击确定退出当前页面，进入登录页面
    // 绑定点击事件
    $('#exit').on('click', function () {
        // console.log(1);
        layui.layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log(index);
            // 点击确定后，清楚缓存中的token，页面跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.layer.close(index);
        });
    });

})
function getUserInfo() {
    // 获取用户信息
    $.ajax({
        type: "GET",
        url: "/my/userinfo", // 导入封装好的baseApi会自动拼接根目录
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        // 在本地存储中获取'token' 用于有权限的接口。因为有权限接口都需要添加这一项，所以把它封装在baseApi中
        success: function (res) {
            // console.log(res);
            if (res.status === 0 && res.message === "获取用户基本信息成功！") {
                // 根据数据来渲染用户栏
                renderUserInfo(res)
            }
        }
        // 无论接口调用是否成功，都会调用此函数
        // complete: function (res) {
            // 控制用户的访问权限，在地址栏中直接输入index页面，如果服务器返回的数据中 "status":1,"message":"身份认证失败！" 不让其跳转到index页面
        //     console.log(res.response);
            // res.responseJSON获取后台返回的数据
        //     console.log(res.responseJSON);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message) {
                // 强制清空后台存储的token数据
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    });
}
function renderUserInfo(res) {
    var name = res.data.nickname || res.data.username
    // console.log(name[0]);
    var first = name[0].toUpperCase()
    // 更改用户栏的欢迎信息
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (res.data.user_pic == null) { // 没有图片，文字显示，图片隐藏
        $('.layui-nav-img').hide()
        $('.text_avatar').show().html(first)

    } else {
        $('.layui-nav-img').attr('src',res.data.user_pic).show()
        $('.text_avatar').hide()
    }
}