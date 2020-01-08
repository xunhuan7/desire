const qiniu = require('qiniu')
const moment = require('moment')
const {QI_NIU} = require('../../config/environment')
const {isLimited} = require('../../core/checkAuthority')

function uploadProcess(ctx) {
    console.log(ctx.request)
    const {name, path} = ctx.request.files.file
    const {BUCKET, ACCESS_KEY, SECRET_KEY} = QI_NIU
    const putPolicy = new qiniu.rs.PutPolicy({scope: BUCKET})           //  指定七牛云存储空间
    const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)       //  鉴权对象
    const uploadToken = putPolicy.uploadToken(mac)                      //  获取上传凭证

    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2                                  //  空间对应机房
    const formUploader = new qiniu.form_up.FormUploader(config)       //  生成表单上传的类
    const putExtra = new qiniu.form_up.PutExtra()                     //  生成表单提交额外参数
    // TODO:hash码
    const key = path.split('/')[path.split('/').length - 1] + '.' + name.split('.')[name.split('.').length - 1]   //  重命名文件

    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, path, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respInfo)
            }
            if (respInfo.statusCode === 200) {
                resolve(respBody)
            } else {
                reject(respInfo)
            }
        })
    })
}

async function uploadFile(ctx, next) {

    // 用户必需为非禁用
    if (await isLimited(ctx)) {
        ctx.status = 401
        ctx.body = {
            code: 401,
            message: '用户处于被禁用状态',
        }
        return true
    }

    try {
        const response = await uploadProcess(ctx)
        ctx.body = {
            code: 200,
            message: '图片上传成功',
            data: response
        }
    } catch (error) {
        console.log(error)
        ctx.status = 500
        ctx.body = {
            code: 500,
            message: '图片上传遇到一些问题',
            data: error
        }
    }
}

module.exports = uploadFile
