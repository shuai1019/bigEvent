$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 点击上传按钮触发文件选择按钮
    $('#upDate').on('click', function () {
        // 触发文件选择按钮
        $('#selectFile').click()
    });
    // 为文件选择框绑定 change 事件
    $('#selectFile').on('change', function (e) {
        console.log(e.target.files);
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请选择图片')
        }
        var file = filelist[0]
        var newImgURL = URL.createObjectURL(file)
        console.log(newImgURL);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#sure').on('click', function () {
        // 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            $.ajax({
                type: "post",
                url: "/my/update/avatar",
                data: {
                    avatar:dataURL
                },
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    // 数据上传成功后，重新加载用户信息
                    layui.layer.msg(res.message)
                    window.parent.getUserInfo()
                }
            });
    });
})