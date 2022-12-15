import React, { Component } from 'react';

import './cards.css';

export default class Cards extends Component {
  render(props) {
    const { staff } = this.props;

    return (
      <div className="card-list" >
        {staff.map((staff) => {
          const { id, name, email } = staff;
          return (
            <div className="card-container" key={id}>
              <img src={`https://robohash.org/${id}?set=set2&size=180x180`} alt="profile" />
              <h2>{name}</h2>
              <p>{email}</p>
            </div>
          )
        })
        }
      </div >
    )
  }
}
