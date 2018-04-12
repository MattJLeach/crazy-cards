import React, { Component } from 'react';
import './results.scss';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      cards: {
        studentLifeCard: {
          name: 'Student Life Card',
          apr: 18.9,
          balanceTransferMonths: 0,
          purchaseOfferMonths: 6,
          credit: 1200,
          available: false,
          selected: false
        },
        anywhereCard: {
          name: 'Anywhere Card',
          apr: 33.9,
          balanceTransferMonths: 0,
          purchaseOfferMonths: 6,
          credit: 300,
          available: true,
          selected: false
        },
        liquidCard: {
          name: 'Liquid Card',
          apr: 33.9,
          balanceTransferMonths: 12,
          purchaseOfferMonths: 6,
          credit: 3000,
          available: false,
          selected: false
        }
      }
    }
  }

  componentDidMount() {
    this.setState({cards: this.updateDetails()});
  }

  componentWillUpdate(nextProps, nextState) {
    const details = this.updateDetails();
    if(nextProps.status !== this.props.status || nextProps.income !== this.props.income) {
      this.setState({cards: details});
    }
  }

  updateDetails() {
    const details = {...this.state.cards};
    details.studentLifeCard.available = this.props.status === 'student';
    details.liquidCard.available = this.props.income > 16000;
    return details;
  }

  availableBalance = () => {
    const balances = [];
    for(let key in this.state.cards) {
      if(this.state.cards[key].selected) {
        balances.push(this.state.cards[key].credit);
      }
    }
    return balances.reduce((total, num) => {
      return total + num;
    }, 0);
  }

  handleCardSelect = event => {
    const details = {...this.state.cards};
    details[event.target.id].selected = event.target.value;
    this.setState({cards: details});
  }

  render() {
    const cardsArray = [];
    for(let key in this.state.cards) {
      cardsArray.push({
        id: key,
        config: this.state.cards[key]
      });
    }
    let cards = (
      <div>
        {cardsArray.map(card => {
          if(card.config.available) {
            return (
              <div key={card.id} className="col-md-4">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    {card.config.name}
                    <span className="pull-right">Select <input type="checkbox" id={card.id} onChange={this.handleCardSelect} /></span>
                  </div>
                  <div className="panel-body">
                    APR: {card.config.apr}%<br />
                    Balance Transfer: {card.config.balanceTransferMonths} months<br />
                    Purchase Offer: {card.config.purchaseOfferMonths} months<br />
                    Credit: {card.config.credit}
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    )
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Your cards
            <span className="pull-right">Available Balance: £{this.availableBalance()}</span>
        </div>
        <div className="panel-body">
          <div className="row">
            {cards}
          </div>
        </div>
      </div>
    )
  }
}

export default Results;