import './About.css';
import React, {Component} from "react";

class About extends Component{
  render() {
    return (
    <div className="About">
      <h1>About QBudge</h1>
      <p>QBudge is a budget management website targeted at university students. Many students living on their own 
        stuggle to stay on top of their money. Ensuring there is enough money for food, rent, and other expenses 
        based on your current income can be overwhelming; we're here to help. </p>
      <p>To get started, simply enter estimations for your expenses and income. QBudge provides two services to 
        our users: intuitive visualizations of their expenses and income sources, and custom built plans for the 
        student to save money when they can. QBudge is completely free so why not get started today!</p>
    </div>
);
  }
}

export default About;
