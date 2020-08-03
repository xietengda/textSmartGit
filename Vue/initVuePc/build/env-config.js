/*
 * 使用方法示例：
 * 打包：
 * 打包dev环境：npm run build --dev-8212
 * 打包test环境：npm run build --test-8212
 * 打包pro环境：npm run build --pro-8212
 *
 * 本地运行：
 * 本地运行dev环境：npm run dev --dev-8212
 * 本地运行test环境：npm run dev --test-8212
 * 无【--xxx】参数，则默认为dev环境：npm run dev
 */
'use strict'
 
const chalk = require('chalk')
const os = require('os')
const log = console.log

//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
const DEVHOST = argv[2] ? argv[2].replace(/[^0-9]+/ig,"") : '8212'

/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * proUrl: 这个环境下面的项目运行的域名
 * devHost: 这个环境下面的项目运行的端口，开发状态使用
 * report: 启用可视化资源分析(在build的时候使用)
 * baseUrl: 这个环境下面的 api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
    {
        //开发环境
        envName: 'dev',
        proUrl: getIPv4(),
        devHost: 80,
        report: false,
        baseUrl: `http://192.168.1.134:${DEVHOST}/`,
        assetsPublicPath: '/'
    },
    {
        //测试环境
        envName: 'test',
        proUrl: getIPv4(),
        devHost: 80,
        report: false,
        baseUrl: `http://akang.asika.cn/`,
        assetsPublicPath: '/'
    },
    {
        //生产环境（命令行参数（process.arg）中prod是保留字，所以使用pro）
        envName: 'pro',
        proUrl: getIPv4(),
        devHost: 81,
        report: true,
        baseUrl: `http://211.149.228.58:${DEVHOST}/`,
        assetsPublicPath: '/'
    },
 
]
//没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV  ? ENV_LIST.find(item => item.envName === HOST_ENV) : ENV_LIST[1]
// 把环境常量挂载到process.env.HOST_ENV方便客户端使用
process.env.BASE_URL = HOST_CONF.baseUrl
// 把环境常量挂载到process.env.HOST方便客户端使用  (项目启动域名)
process.env.HOST = HOST_CONF.proUrl
// 把环境启动类型挂载到process.env.HOST_ENVNAME方便客户端使用  (项目启动环境)
process.env.HOST_ENVNAME = HOST_ENV
// process.env.ENV_NAME = HOST_CONF.envName

log(chalk.green('当前环境项目指向域名：'))
log(process.env.HOST)
log(chalk.green('当前环境：'))
log(HOST_ENV)
log(chalk.green('当前环境对应的常量：'))
log(HOST_CONF)
 

function getIPv4() {
    var interfaces = os.networkInterfaces(); // 获取网络接口列表
    var ipv4s = []; // 同一接口可能有不止一个IP4v地址，所以用数组存
    Object.keys(interfaces).forEach(function (key) {
        interfaces[key].forEach(function (item) {
            // 跳过IPv6 和 '127.0.0.1'
            if ( 'IPv4' !== item.family || item.internal !== false  || item.address.indexOf('192.168') == -1) { return false; }
            ipv4s.push(item.address); // 可用的ipv4s加入数组
        })
    });
    return ipv4s[0]; // 返回一个可用的即可
}

module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST