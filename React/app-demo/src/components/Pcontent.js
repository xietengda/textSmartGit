import React from 'react';

import Api from '../util/api';

class Pcontent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            goodsId:'',//商品id
            goodsMsg:'',//商品细信息
         };
    }

    getShopDetail=(goodsId)=>{
        var that = this;
        Api.shopDetail('c0661f020c95e8f339d19676a1ab46f3','japan',goodsId)
            .then(res =>{
                console.log(res)
                that.setState({
                    goodsMsg:res.data.detail
                })
            })
    }

    componentWillMount() {
        //console.log(this.props.match.params);
        console.log(this.props.match.params.id);

        this.getShopDetail(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                这是商品详情组件
                <div>商品详情</div>
                <div dangerouslySetInnerHTML={{__html: this.state.goodsMsg.content}} ></div>
            </div>
        );
    }
}

export default Pcontent;