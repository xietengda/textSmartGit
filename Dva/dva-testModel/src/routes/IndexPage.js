import React from 'react';
//引入connect 
import {connect} from 'dva';

import * as apis from '../services/example';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  handleSetName = () =>{
    console.log(this.props)
    //获取到props中dispatch方法修改model的数据
    //type:配置方法名称 type:"模块‘namespace’/方法名"传 要修改的值
    this.props.dispatch({
      type:'indexTest/setName',
      data:{
        name:'掏粪的小仙女'
      }
    })
  }

  //使用effects  异步调用方法
  handleSetNameAsync = () =>{
    this.props.dispatch({
      type:'indexTest/setNameAsync',
      //payload需要跟model中setNameAsync方法第一个参数相同
      payload:{
        name:'猪肉佬卖西瓜'
      }
    })
  }

  //调用接口
  handleTestCnode = () =>{
    this.props.dispatch({
      type:'indexTest/testCnode',
    });
  }

  componentDidMount(){
    apis.mockdata().then( res =>{
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <h2>我是首页</h2>
        <h4>我是model/indexTest.js的name:{this.props.name}</h4>
        <br/>
        {/* 添加修改model中state按钮 */}
        <button onClick={this.handleSetName}>setName</button> 
        <br/>
        <br/>
        {/* 添加异步修改model中state按钮 */}
        <button onClick={this.handleSetNameAsync}>setNameAsync</button>
        <br/>
        <br/>
        {/* 添加获取接口按钮 */}
        <button onClick={this.handleTestCnode}>testCnode</button> 
        <br/>
        <br/>
        <ul>
          {
            this.props.cnodeData.map((item,key) =>{
              return (
                <li key={key}>{item.title}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

//mapStateToProps 是一个函数(函数名可以自定义)，它的作用就像它的名字那样，建立一个从（外部的）state对象到（UI组件的）props对象的映射关系。
//说白就是获取model中定义的state
const mapStateToProps = state =>{
  //这里可以输出看一下，已经获取到model的数据
  console.log(state)
  return {
    msg:'这里是获取model中的数据',
    name:state.indexTest.name,//获取model/indexTest.js中的数据
    cnodeData:state.indexTest.cnodeData
  }
}

export default connect(mapStateToProps)(IndexPage);
