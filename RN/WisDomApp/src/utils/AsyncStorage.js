/*
* @Created by liqihui on 2019-05-08.
* @Desc RNAsyncStorage_asyn
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

// 创建一个js文件RNAsyncStorage_asyn
const sync = {
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    user(params){
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag, url, key } } = params;
        //resolve, reject只有在syncInBackground为false时候才被定义
        return fetch(url).then(response => response.json()).then(json=>{
            console.log('json-x-x-x-x--', json);
            if (json) {
                storage.save(key, json);
                return json
            } else {
                return null
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    }
};
//导出sync
exports.sync = sync;


// fetch(url, {
//     method: 'GET',
//     // body: 'id=' + id,
//     ...extraFetchOptions,
// }).then(response => {
//     return response.json();
// }).then(json => {
//     //{"name":"B","age":18,"tags":["geek1","nerd1","otaku1"]}
//     console.log('fetch数据22 === ' + JSON.stringify(json));
//     if(json){
//         storage.save({
//             key: key,
//             id,
//             data: json,
//             expires: 1000 * 6,
//         });
//
//         if (someFlag) {
//             // 根据syncParams中的额外参数做对应处理
//         }
//         // 成功则调用resolve
//         resolve && resolve(json);
//     } else {
//         // 失败则调用reject
//         reject && reject(new Error('data parse error'));
//     }
// }).catch(err => {
//     console.warn('bbbbbbbb' + err);
//     reject && reject(err);
// });
