import React from 'react';


import Api from '../util/api';


const logo = require('../assets/images/logo.svg');

require('../assets/css/Home.css');

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
           list:[],
        }


    }

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
                
                <div className='list'>

                    <div className='sub'>
                        <img alt='' src={logo}/>
                        <div className='til'>标题</div>
                        <div className='price'>价格</div>
                    </div>

                </div>

            </div>
        )

    }


}

export default Home;
