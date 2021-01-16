import './App.css';
import React, {Component} from "react";
import About from "./Components/About";

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


class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      chequingAndSavings: {
        chequing: "",
        savings: ""
      },
      income: {
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
      .then(resBody => {
        const data = resBody.data;
        console.log(data);
        const graph = document.getElementById('tester');
        const graph_lines = document.getElementById('lines');

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        var expensesTrace = {
          x: months,
          y: data.expensesMonthly,
          name: 'Expenses',
          type: 'bar',
        };

        var incomeTrace = {
          x: months,
          y: data.incomeMonthly,
          name: 'Income',
          type: 'bar'
        };

        var incomeData = [expensesTrace, incomeTrace];

        var layout = {barmode: 'group'};

        var line1 = {
          y: data.checking_balance,
          name: "Checking Account Balance",
          type: 'scatter'
        };

        var line2 = {
          y: data.savings_balance,
          name: "Savings Account Balance",
          type: 'scatter'
        };

        var line3 = {
          y: data.gic,
          name: "GICs Balance",
          type: 'scatter'
        };

        var lines = [line1, line2, line3];

        var line_layout = {
          grid: {
              rows: 1,
              columns: 1,
              pattern: 'independent',
              roworder: 'bottom to top'}
          };


        window.Plotly.newPlot(graph, incomeData, layout);
        window.Plotly.newPlot(graph_lines, lines, line_layout);

      });
    }

    const dispatch = (props, value) => {
      this.setState(prevState => {
        let obj = prevState;
        while(props.length > 1) {
          obj = obj[props.shift()];
        }
        if(props[0] === "value") {
          value = parseFloat(value)
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
          <h1>Welcome to QBudge</h1>
          <p>Helping students make the most of their budget</p>
        </header>
        <About/>
        </div>
        <form onSubmit={sendData}>
          <fieldset className="income">
          <div className="input_section">
              <label className="money">Money (from home):
                <input type="number" placeholder="" onChange={buildHandler(["income", "homeMoney", "value"])}></input>
              </label>
              <label className="money">Units:
                <Unit handler={buildHandler(["income", "homeMoney", "type"])} />
              </label>
          </div>
          <div className="input_section">
            <label className="loan">Loans:
              <input type="number" placeholder="" onChange={buildHandler(["income", "loans", "value"])}></input>
            </label>
            <label className="loan">Units:
              <Unit handler={buildHandler(["income", "loans", "type"])} />
            </label>
          </div>
          <div className="input_section">
            <label className="scholarship">Scholarship Amounts (total):
              <input type="number" placeholder="" onChange={buildHandler(["income", "scholarships", "value"])}></input>
            </label>
            <label className="scholarship">Units:
              <Unit handler={buildHandler(["income", "scholarships", "type"])} />
            </label>
          </div>
          <div className="input_section">
            <label className="salary">Job Salary:
              <input type="number" placeholder="" onChange={buildHandler(["income", "salary", "value"])}></input>
            </label>
            <label className="salary">Units:
              <Unit handler={buildHandler(["income", "salary", "type"])} />
            </label>
          </div>
          </fieldset>
          <fieldset>
            <div className="input_section">
            <label className="rent">Rent:
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "rent", "value"])}></input>
            </label>
            <label className="rent">Units:
              <Unit handler={buildHandler(["expenses", "rent", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="food">Food (average):
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "food", "value"])}></input>
            </label>
            <label className="food">Units:
              <Unit handler={buildHandler(["expenses", "food", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="tuition">Tutition:
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "tuition", "value"])}></input>
            </label>
            <label className="tuition">Units:
              <Unit handler={buildHandler(["expenses", "tuition", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="savings">Savings:
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "rent", "value"])}></input>
            </label>
            <label className="savings">Units:
              <Unit handler={buildHandler(["expenses", "rent", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="car">Car Payments:
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "carPayments", "value"])}></input>
            </label>
            <label className="car">Units:
              <Unit handler={buildHandler(["expenses", "carPayments", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="insurance-car">Car Insurance:
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "carInsurance", "value"])}></input>
            </label>
            <label className="insurance-car">Units:
              <Unit handler={buildHandler(["expenses", "carInsurance", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="utilities">Utilities (average):
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "utilities", "value"])}></input>
            </label>
            <label className="utilities">Units:
              <Unit handler={buildHandler(["expenses", "utilities", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="internet">Internet:
              <input type="number" placeholder="" onChange={buildHandler(["expenses", "internet", "value"])}></input>
            </label>
            <label className="internet">Units:
              <Unit handler={buildHandler(["expenses", "internet", "type"])} />
            </label>
            </div>
            <div className="input_section">
            <label className="rent">Entertainment:
              <input type="entertainment" placeholder="" onChange={buildHandler(["expenses", "entertainment", "value"])}></input>
            </label>
            <label className="entertainment">Units:
              <Unit handler={buildHandler(["expenses", "entertainment", "type"])} />
            </label>
            </div>
          </fieldset>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
);
  }
}

export default App;
