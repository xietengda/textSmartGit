//引入Fragment 作为根节点
import React,{Fragment} from 'react';
//引入Link
import { Link } from 'dva/router';

//引入通用组件
import Child from '../components/Child';

class userPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  //跳转首页函数
  handleToIndex = () =>{
    this.props.history.push('/');
  }

  render() {
    return (
      <Fragment>
        <div>用户页面</div>
        <br/>
        <Link to="/">跳转首页</Link>
        <br/>
        <br/>
        <button onClick={this.handleToIndex}>首页</button>
        <br/>
        <br/>
        <Child/>
      </Fragment>
    );
  }
}

export default userPage;