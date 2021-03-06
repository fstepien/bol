import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import OrderInfo from './BolOrderInfo';
import Consignor from './BolConsignor';
import Consignee from './BolConsignee';
import BolListHeader from './BolListHeader';
import Product from './Product';
import Pallets from './BolPallets';
import BolFooter from './BolFooter';
import Terms from './Terms';


class Bol extends Component {

hiddenRef = React.createRef();

state = {
    termsDisplay: false,
    bottomDisplay: true
}

toggleTerms = () => {
  this.setState({termsDisplay: !this.state.termsDisplay});

}    

executePrint = () => {
const link = document.querySelector('#printHidden');
link.click();

this.setState({termsDisplay: !this.state.termsDisplay});
}

render() {
const orderIds = Object.keys(this.props.order);
const total = orderIds.reduce((prevTotal, key) => {
  const product = this.props.products[key];
  const count = this.props.order[key];
  if(product){
    return prevTotal + (count * product.kg)
  } 
  return prevTotal;
}, 0)

    return (
       <React.Fragment> 
        
        <div className="container mt50">
        <ReactToPrint
          termsDisplay={this.state.termsDisplay}
          trigger={() => {

          return <button id="printHidden" 
          style={{display: 'none'}}
          ref={this.hiddenRef}
          >Print Trigger</button>}}
          // trigger={() => <button id="printBtn"><img src="/assets/print.svg" alt="print button" title="Print BOL" /></button>}
          content={() => this.bolRef}
          
        /> 
        <button id="printBtn" ><img src="/assets/print.svg" alt="print button" title="Print BOL" onClick={this.toggleTerms} /></button>
        <button id="logoutBtn"><img  src="/assets/exit.svg" alt="logout" title="Logout" onClick={this.props.logout}/></button>
        <button id="eraseBtn"><img  src="/assets/eraser.svg" alt="Erase ALL" title="Erase All" onClick={this.props.eraseAll}/></button>
          <div className="box bol-form" ref={el => (this.bolRef = el)}>  
              <div className="bol-list">
                <h2>Bill of Lading</h2>
                <OrderInfo orderInfo={this.props.orderInfo} changeOrderInfo={this.props.changeOrderInfo}/>
                <Consignor shipFrom={this.props.shipFrom} changeShipFrom={this.props.changeShipFrom}/>
                <Consignee shipTo={this.props.shipTo} changeShipTo={this.props.changeShipTo}/>
                <BolListHeader />
                {orderIds
                  .sort((a,b) => this.props.products[a].desc.toLowerCase() > this.props.products[b].desc.toLowerCase() ? 1: -1)
                  .map(key => {
                        console.log(`maped key: ${key}`)
                        return <Product 
                          key={key}
                          product={this.props.products[key]}
                          count={this.props.order[key]} />
                    })}
                <div className="total">
                <strong>Total Weight {Number(total).toFixed(2)} kg / {Number(total * 2.20462).toFixed(2)} lb.</strong>
                </div>
                <Pallets />
                <BolFooter 
                  changeShippingInfo={this.props.changeShippingInfo}
                  shippingInfo={this.props.shippingInfo}/>              
              </div>
          </div>
        </div>
        <Terms termsDisplay={this.state.termsDisplay} bottomDisplay={this.state.bottomDisplay} toggleTerms={this.toggleTerms} executePrint={this.executePrint} />
        
       </React.Fragment> 
       
    );
  }
}

export default Bol;