import React from 'react';

import { BrowserRouter as Router, Route ,Link} from "react-router-dom";
import Api from '../util/api';


require('../assets/css/Home.css');

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
           list:[],
        }


    }
    //获取列表
    requestData=()=>{
        var that = this;
        
        Api.indexCommend('c0661f020c95e8f339d19676a1ab46f3','japan','23.137865','113.333642')
            .then(res =>{
                console.log(res);
                that.setState({
                    list:res.data.list
                });
            })
    }


    componentWillMount(){
        this.requestData();
    }


    render(){
        
        return(
            <div className="Home div_float">
                
                {
                    this.state.list.map((value,key)=>{
                        return (
                            <div key={key}>
                                <Link to={`/Pcontent/${value.goods_id}`}>
                                    <div className='list'  data-goods-id={value.goods_id}>
                                            <div className='sub'>
                                                <img alt='' src={value.thumbnail}/>
                                                <div className='til'>{value.goods_name}</div>
                                                <div className='price'>¥{value.price}</div>
                                            </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }

            </div>
        )

    }


}

export default Home;
