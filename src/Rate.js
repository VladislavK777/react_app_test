import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';



class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      isClick: false
    };
    this.handleChange = this.handleChange.bind(this);
    }
  handleChange = (event) => {
    if (event.target.name === 'station_from') {
      this.setState({value1: event.target.value});
    } else if (event.target.name === 'station_to') {
      this.setState({value2: event.target.value});
    } else if (event.target.name === 'cargo') {
      this.setState({value3: event.target.value});
    } else if (event.target.name === 'volume') {
      this.setState({value4: event.target.value});
    } else if (event.target.name === 'ratesFile') {
      this.setState({value5: event.target.value});
    }
  }

  handleClick = () => {
	if (event.target.name === 'station_from') {
      this.setState({value1: event.target.value});
    } else if (event.target.name === 'station_to') {
      this.setState({value2: event.target.value});
    } else if (event.target.name === 'cargo') {
      this.setState({value3: event.target.value});
    } else if (event.target.name === 'volume') {
      this.setState({value4: event.target.value});
    } else if (event.target.name === 'ratesFile') {
      this.setState({value5: event.target.value});
    }
    this.setState({isClick: true});
  }

  render() {
    return (
      <div className="App">
      <table>
      <tbody>
        <tr>
          <td>
            <p className="inp">
              <label>
                <input type="text" id="stationFrom" placeholder="&nbsp;" name="station_from" onChange={this.handleChange} />
                <span className="label">Станция отправления</span>
                <span className="border" />
              </label>
            </p>
          </td>
          <td>
            <p className="inp">
              <label>
                <input type="text" id="stationTo" placeholder="&nbsp;" name="station_to" onChange={this.handleChange} />
                <span className="label">Станция назначения</span>
                <span className="border" />
              </label>
            </p>
          </td>
          <td>
            <p className="inp">
              <label>
                <input type="text" id="cargo" placeholder="&nbsp;" name="cargo" onChange={this.handleChange} />
                <span className="label">Груз</span>
                <span className="border" />
              </label>
            </p>
          </td>
          <td>
            <p className="inp">
              <label>
                <input type="text" placeholder="&nbsp;" name="volume" onChange={this.handleChange} />
                <span className="label">Объем</span>
                <span className="border" />
              </label>
            </p>
          </td>
          <td>
            <p className="inp_file">
            <label>
              <input type="file" name="ratesFile" multiple accept="xlsx" onChange={this.handleChange} />
              <span className="label">Файл ставок</span>
              <span className="border" />
              </label>
            </p>
          </td>
          <td>
            <input type="button" className="bot1" value="Рассчитать ставку" onClick={this.handleClick}/>
          </td>
          <td>
            <input type="button" className="bot1" value="Сбросить" />
          </td>
          <td>
            <form action="export" method="get" id="calc">
              <input type="image" form="calc" src="resources/img/excel.png" width="40px" height="40px" />
            </form>
          </td>
          <td>
            <a href="settings"><img className="setting" src="resources/img/setting.png"/></a>
          </td>
        </tr>
      </tbody>
      </table>
      {this.state.isClick &&
        <div>
          <WeatherDisplay value={this.state} />

        </div>
        }

      </div>
    );
  }
}
class WeatherDisplay1 extends Component {
  render() {
    return (
      <div>
      <p>1</p>
      </div>
    )
  }
}
class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const value = this.props.value;
    console.log(value.value1);
    const URL = "http://localhost:8889/calculaterate/rate/info";
    const data = {
      "stationFrom": value.value1,
      "stationTo": value.value2,
      "cargo": value.value3,
      "volume": value.value4,
      "file": value.value5
    };
    fetch(URL, {
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    console.log(weatherData);
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.totalList;
    console.log(weather);
    return (
      <div>
      <WeatherDisplay1/>
        <table className="table_calculate">
          <tbody>
          	<tr>
          		<td className="td_table1" rowSpan="3">Станция отправления</td>
          		<td className="td_table1" rowSpan="3">Дорога отправления</td>
          		<td className="td_table1" rowSpan="3">Станция назначения</td>
          		<td className="td_table1" rowSpan="3">Дорога назначения</td>
          		<td className="td_table1" rowSpan="3">Наименование груза</td>
          		<td className="td_table1" rowSpan="3">Расст., км</td>
          		<td className="td_table1" rowSpan="3">Время в пути, сут</td>
          		<td className="td_table1" rowSpan="3">Погр. / выгр.</td>
          		<td className="td_table1" rowSpan="3">Оборот, сут.</td>
          		<td className="td_table1" rowSpan="3">ВО</td>
          		<td className="td_table1" rowSpan="2">ДОХОД</td>
          		<td className="td_table1">РАСХОД</td>
          		<td className="td_table1" colSpan="2">ПРИБЫЛЬ</td>
          	</tr>
            <tr>
          		<td className="td_table1">Тариф в собств. вагонах</td>
          		<td className="td_table1">За нахождение в пути</td>
          		<td className="td_table1">В сутки</td>
          	</tr>
          	<tr>
          		<td className="td_table1">руб/ваг.</td>
          		<td className="td_table1">руб/ваг.</td>
          		<td className="td_table1">руб/ваг.</td>
          		<td className="td_table1">руб/ваг/сут.</td>
        	  </tr>
            <tr>
              <td className="td_table2">{weatherData.totalList[0].stationDeparture.nameStation}</td>
              <td className="td_table2">{weatherData.totalList[0].stationDeparture.road.nameRoad}</td>
              <td className="td_table2">{weatherData.totalList[0].stationDestination.nameStation}</td>
              <td className="td_table2">{weatherData.totalList[0].stationDestination.road.nameRoad}</td>
              <td className="td_table2">{weatherData.totalList[0].cargo.nameCargo}</td>
              <td className="td_table2">{weatherData.totalList[0].distance}</td>
              <td className="td_table2">{weatherData.totalList[0].countDays}</td>
              <td className="td_table2">{weatherData.totalList[0].countDaysLoadAndUnload}</td>
              <td className="td_table2">{weatherData.totalList[0].fullCountDays}</td>
              <td className="td_table2">поваг</td>
              <td className="td_table2">{weatherData.totalList[0].rate}</td>
              <td className="td_table2">{weatherData.totalList[0].tariff}</td>
              <td className="td_table2">{weatherData.totalList[0].rate - weatherData.totalList[0].tariff}</td>
              <td className="td_table2"></td>
            </tr>
            <tr>
              <td className="td_table2">{weatherData.totalList[1].stationDeparture.nameStation}</td>
              <td className="td_table2">{weatherData.totalList[1].stationDeparture.road.nameRoad}</td>
              <td className="td_table2">{weatherData.totalList[1].stationDestination.nameStation}</td>
              <td className="td_table2">{weatherData.totalList[1].stationDestination.road.nameRoad}</td>
              <td className="td_table2">{weatherData.totalList[1].cargo.nameCargo}</td>
              <td className="td_table2">{weatherData.totalList[1].distance}</td>
              <td className="td_table2">{weatherData.totalList[1].countDays}</td>
              <td className="td_table2">{weatherData.totalList[1].countDaysLoadAndUnload}</td>
              <td className="td_table2">{weatherData.totalList[1].fullCountDays}</td>
              <td className="td_table2">поваг</td>
              <td className="td_table2">{weatherData.totalList[1].rate}</td>
              <td className="td_table2">{weatherData.totalList[1].tariff}</td>
              <td className="td_table2">{weatherData.totalList[1].rate - weatherData.totalList[0].tariff}</td>
              <td className="td_table2"></td>
            </tr>
            <tr>
              <td className="td_table3" colSpan="5"></td>
              <td className="td_table3">{weatherData.sumDistance}</td>
              <td className="td_table3">{weatherData.sumCountDays}</td>
              <td className="td_table3"></td>
              <td className="td_table3">{weatherData.sumFullCountDays}</td>
              <td className="td_table3"></td>
              <td className="td_table3"></td>
              <td className="td_table3"></td>
              <td className="td_table3">{weatherData.sumRateOrTariff}</td>
              <td className="td_table3">{weatherData.yield}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
