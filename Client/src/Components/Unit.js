import React, {Component} from "react";

class Unit extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <select onChange={this.props.handler}>
        <option value="--">--</option>
        <option value="Monthly">Monthly</option>
        <option value="Semester">Semester</option>
        <option value="Yearly">Yearly</option>
      </select>
    );
  }
}

export default Unit;