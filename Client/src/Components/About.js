import './About.css';
import React, {Component} from "react";

class About extends Component{
  render() {
    return (
    <div className="About">
      <h1>About QBudge</h1>
      <p>QBudge is a budget management website targetted at university students. Many students living on their own stuggle to stay on top of their money. Ensuring there is enough money for food, rent, and other expenses based on your current income can be overwhelming; we're here to help. To get started, simply enter estimations for your expenses and income below. Our state-of-the-art algorithm will then calculate where you should move your money each month to maximize income from interest and to ensure that all expenses can be paid off. QBudge is completely free so why not get started today!</p>
    </div>
);
  }
}

export default About;
