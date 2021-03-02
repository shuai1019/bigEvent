// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {

  // 如果url中包括 /my/ 就说明要调用有权限的接口，就添加headers
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  options.complete = function (res) {
    // 无论接口调用是否成功，都会调用此函数
      // 控制用户的访问权限，在地址栏中直接输入index页面，如果服务器返回的数据中 "status":1,"message":"身份认证失败！" 不让其跳转到index页面
      // console.log(res.response);
      // res.responseJSON获取后台返回的数据
      // console.log(res.responseJSON);
      if (res.responseJSON.status === 1 && res.responseJSON.message==="身份认证失败！") {
        // 强制清空后台存储的token数据
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
  }
})