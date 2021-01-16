import './App.css';
import React, {Component} from "react";
import About from "./Components/About";


class App extends Component{
  constructor(props) {
    super(props);

    this.data = {};

    this.state = {
      income: {
        date: "",
        homeMoney: {
          value: "",
          type: ""
        },
        loans: {
          value: "",
          type: ""
        },
        scholarships: {
          value: "",
          type: ""
        },
        salary: {
          value: "",
          type: ""
        },
      },
      expenses: {
        rent: {
          value: "",
          type: ""
        },
        food: {
          value: "",
          type: ""
        },
        tuition: {
          value: "",
          type: ""
        },
        savings: {
          value: "",
          type: ""
        },
        carPayments: {
          value: "",
          type: ""
        },
        carInsurance: {
          value: "",
          type: ""
        },
        utilities: {
          value: "",
          type: ""
        },
        internet: {
          value: "",
          type: ""
        },
        entertainment: {
          value: "",
          type: ""
        }
      },
    }
  }

  render() {
    console.log(this.state)

    const sendData = event => {
      event.preventDefault();

      fetch('http://kingston.andrewfryer.ca:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(data => {
        this.data = data;
      })
      .then(() => {
        const graph = document.getElementById('tester');
        window.Plotly.newPlot( graph, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }], {
        margin: { t: 0 } } );
      });
    }

    const dispatch = (props, value) => {
      this.setState(prevState => {
        let obj = prevState;
        while(props.length > 1) {
          obj = obj[props.shift()];
        }
        obj[props.pop()] = value;
        return prevState;
      });
    }

    const buildHandler = props => (e => dispatch(props, e.target.value));

    return (    
    <div className="App">
      <div className="form">
        <div className="topping">
        <header>
          <h1>Name of Website</h1>
          <p>This will be the header</p>
        </header>
        </div>
        <About/>
        <form onSubmit={sendData}>
          <fieldset className="today-info">
            <label>Date:
              <input type="text" placeholder="Example: 11/01/21" onChange={buildHandler(["income", "date"])}></input>
            </label>
          </fieldset>
          <fieldset className="income">
            <label className="money">Money (from home):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "homeMoney", "value"])}></input>
            </label>
            <label className="money">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "homeMoney", "type"])}></input>
            </label>
            <label className="loan">Loans:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "loans", "value"])}></input>
            </label>
            <label className="loan">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "loans", "type"])}></input>
            </label>
            <label className="scholarship">Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "scholarships", "value"])}></input>
            </label>
            <label className="scholarship">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "scholarships", "type"])}></input>
            </label>
            <label className="salary">Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "salary", "value"])}></input>
            </label>
            <label className="salary">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "salary", "type"])}></input>
            </label>
          </fieldset>
          <fieldset>
            <label className="rent">Rent:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "rent", "value"])}></input>
            </label>
            <label className="rent">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "rent", "type"])}></input>
            </label>
            <label className="food">Food (average):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "food", "value"])}></input>
            </label>
            <label className="food">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "food", "type"])}></input>
            </label>
            <label className="tuition">Tutition:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "tuition", "value"])}></input>
            </label>
            <label className="tuition">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "tuition", "type"])}></input>
            </label>
            <label className="savings">Savings:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "rent", "value"])}></input>
            </label>
            <label className="savings">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "rent", "type"])}></input>
            </label>
            <label className="car">Car Payments:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "carPayments", "value"])}></input>
            </label>
            <label className="car">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "carPayments", "type"])}></input>
            </label>
            <label className="insurance-car">Car Insurance:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "carInsurance", "value"])}></input>
            </label>
            <label className="insurance-car">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "carInsurance", "type"])}></input>
            </label>
            <label className="utilities">Utilities (average):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "utilities", "value"])}></input>
            </label>
            <label className="utilities">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "utilities", "type"])}></input>
            </label>
            <label className="internet">Internet:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["expenses", "internet", "value"])}></input>
            </label>
            <label className="internet">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "internet", "type"])}></input>
            </label>
            <label className="rent">Entertainment:
              <input type="entertainment" placeholder="Example: 420000" onChange={buildHandler(["expenses", "entertainment", "value"])}></input>
            </label>
            <label className="entertainment">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["expenses", "entertainment", "type"])}></input>
            </label>
          </fieldset>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
   
);
  }
}

export default App;
