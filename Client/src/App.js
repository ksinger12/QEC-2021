import './App.css';
import React, {Component} from "react";
import About from "./Components/About";


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
      .then(data => {
        console.log(data);
        const graph = document.getElementById('tester');
        const graph_lines = document.getElementById('lines');

        let rent = [655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655, 655];
        let utils = [100, 100, 100, 65, 65, 65, 65, 65, 65, 65, 100, 100, 100];
        let groceries = [300, 390, 300, 220, 70, 150, 120, 100, 370, 250, 290, 350];
        let entertainment = [100, 120, 90, 50, 370, 1000, 300, 100, 200, 90, 50, 500,];
        let tuition = [6700, 0, 0, 0, 500, 0, 0, 0, 6700, 0, 0, 0];

        let expenses = [rent, utils, groceries, entertainment, tuition];
        let expenses_tot = expenses.reduce(function (r, a) {
          a.forEach(function (b, i) {
              r[i] = (r[i] || 0) + b;
          });
          return r;
        }, []);

        let income = [100, 100, 100, 100, 3000, 3000, 3000, 3000, 130, 130, 130, 75];;
        let scholarships = [0, 0, 0, 0, 0, 0, 0, 0, 5000, 0, 0, 0];
        let loans = [6540, 0, 0, 0, 0, 0, 0, 0, 6540, 0, 0, 0];

        let money = [income, scholarships, loans];
        let money_tot = money.reduce(function (r, a) {
          a.forEach(function (b, i) {
              r[i] = (r[i] || 0) + b;
          });
          return r;
        }, []);

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        var expensesTrace = {
          x: months,
          y: expenses_tot,
          name: 'Expenses',
          type: 'bar',
        };
        
        var incomeTrace = {
          x: months,
          y: money_tot,
          name: 'Income',
          type: 'bar'
        };
        
        var data = [expensesTrace, incomeTrace];
        
        var layout = {barmode: 'group'};

        var line1 = {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: 'scatter'
        };
        
        var line2 = {
          x: [1, 2, 3, 4],
          y: [16, 5, 11, 9],
          type: 'scatter'
        };

        var line3 = {
          x: [1, 2, 3, 4],
          y: [7, 15, 17, 7],
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
      

        window.Plotly.newPlot(graph, data, layout);
        window.Plotly.newPlot(graph_lines, lines, line_layout);

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
            <label className="chequing">Chequing Account Balance:
              <input type="text" placeholder="Example: 40000" onChange={buildHandler(["chequingAndSavings", "chequing"])}></input>
            </label>
            <label className="chequing">Savings Account Balance:
              <input type="text" placeholder="Example: 40000" onChange={buildHandler(["chequingAndSavings", "savings"])}></input>
            </label>
          </fieldset>
          <fieldset className="income">
          <div>
            <label className="money">Money (from home):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "homeMoney", "value"])}></input>
            </label>
            <label className="money">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "homeMoney", "type"])}></input>
            </label>
          </div>
          <div>
            <label className="loan">Loans:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "loans", "value"])}></input>
            </label>
            <label className="loan">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "loans", "type"])}></input>
            </label>
          </div>
          <div>
            <label className="scholarship">Scholarship Amounts (total):
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "scholarships", "value"])}></input>
            </label>
            <label className="scholarship">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "scholarships", "type"])}></input>
            </label>
          </div>
          <div>
            <label className="salary">Job Salary:
              <input type="number" placeholder="Example: 420000" onChange={buildHandler(["income", "salary", "value"])}></input>
            </label>
            <label className="salary">Units: 
              <input type="text" placeholder="Example: Yearly, Semester, Monthly" onChange={buildHandler(["income", "salary", "type"])}></input>
            </label>
          </div>
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
