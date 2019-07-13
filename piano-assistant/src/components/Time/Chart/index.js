import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./chart.css";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };

  log() {
    console.log(this.state.chartData);
  }

  render() {
    this.log();
    return (
      <div className="Chart">
        <Bar
          data={this.props.chartData}
          options={{
            title: {
              display: "Time Played",
              text: "Time Played",
              fontSize: 25,
            },
            legend: {
              display: "Time Played",
              position: this.props.legendPosition,
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
