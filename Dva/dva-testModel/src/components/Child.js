import React from 'react';
//引入 withRouter
import { withRouter } from 'dva/router';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  //组件跳转首页
  handleToIndex = () =>{
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div>通用组件</div>
        <button onClick={this.handleToIndex}>首页_child</button>
      </div>
    );
  }
}

//写入路由
export default withRouter(Child);
