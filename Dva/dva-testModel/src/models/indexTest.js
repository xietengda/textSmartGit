//引入api
import * as apis from '../services/example';

export default {
  //命名空间
  namespace:'indexTest',
  //数据
  state:{
    name:'message',
    cnodeData:[],//接口获取的数据
  },
  
  //reducers：以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方
  reducers:{
    //修改state函数
    //state：代表上面的state，paylocad:代表组件传过来的值
    setName(state,payLoad){
      //react中如果要修改视图，需要创建一个新的地址才可以重新渲染，如果只是动态修改值视图是不会重新渲染的
      let _state = JSON.parse(JSON.stringify(state));
      _state.name = payLoad.data.name;
      //必须返回_state,不然会报错
      return _state;
    },
    
    //修改cnodeData 数据
    setCnodeDataList(state,payLoad){
      let _state = JSON.parse(JSON.stringify(state));
      _state.cnodeData = payLoad.data;
      console.log(_state)
      return _state;
    },


    //用户页面
    testPath(state,payload){
      console.log('触发用户页函数')
      return state;
    }
  },

  //effects:以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据
  //主要是用到es6中的Generator 函数
  //Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
  //Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
  effects:{
    //payload:页面传过来的值, put：理解成一个动作，通知reducers中的方法修改state
    *setNameAsync ({payload},{put,call}){
        console.log(payload)
        //调用reducers中的方法
        yield put({
          type:'setName',
          data:{
            name:payload.name
          }
        });
    },

    //获取接口信息
    *testCnode({payLoad},{put,call}){
      //call 发起请求接口 
      //第一个是接口地址，其后是接口参数（目前没有参数，所以为空）
      let rel = yield call(apis.testCnode);
      
      
      if(rel.data){
        //调用setCnodeDataList方法修改cnodeData数据
        yield put({
          type:'setCnodeDataList',
          data:rel.data.data
        });
      }

    }
  },

  subscriptions:{
    toPath({dispatch,history})  {
      history.listen( ({pathname}) =>{
        if(pathname === '/user'){
          dispatch({
            type:'testPath'
          })
        }
      })
    }
  }

}