import React, { Component } from "react";


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      filteredItems: [],
      selectedItem: null,
      filterText: "",
	  value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      isClick: false
    };
  }

  onMouseOver = index => {
    this.setState({
      selectedItem: index
    });
  };

  onMouseOut = () => {
    this.setState({
      selectedItem: null
    });
  };

  onFilterTextChanged = event => {
    event.preventDefault();
    const { items } = this.props;
    this.setState({
      filterText: event.target.value,
      filteredItems: items
        .filter(el =>
          el.toLowerCase().includes(event.target.value.toLowerCase())
        )
        .slice(0, 20)
    });
  };

  onKeyUp = ({ keyCode }) => {
    const { selectedItem, filteredItems } = this.state;
    if (keyCode === 40) {
      if (selectedItem === null) {
        this.setState({ selectedItem: 0 });
      } else if (selectedItem < filteredItems.length - 1) {
        this.setState({ selectedItem: selectedItem + 1 });
      }
    }
    if (keyCode === 38) {
      if (selectedItem > 0) {
        this.setState({ selectedItem: selectedItem - 1 });
      }
    }
    if (keyCode === 27) {
      this.setState({ visible: false });
    }
    if (keyCode === 13) {
      this.setState({ filterText: filteredItems[selectedItem] });
      this.handlerOnBlur();
    }
  };

  changeValue = e => {
    this.setState({ filterText: e });
    this.handlerOnBlur();
  };

  handlerOnBlur = () => {
    this.setState({
      visible: false,
      selectedItem: null
    });
  };

  handlerOnFocus = () => {
    const { items } = this.props;
    const { filterText } = this.state;
    if (!this.state.visible) {
      this.setState({
        visible: true,
        filteredItems: items
          .filter(el => el.toLowerCase().includes(filterText.toLowerCase()))
          .slice(0, 20)
      });
    }
  };

  render() {
    const { selectedItem, filteredItems } = this.state;
    return (
      <p className="inp">
        <label>
          <input
            type="text"
            value={this.state.filterText}
			name={this.props.name}
            placeholder="&nbsp;"
			autocomplite="off"
            onChange={this.onFilterTextChanged}
            onKeyUp={this.onKeyUp}
            onFocus={this.handlerOnFocus}
            onBlur={this.handlerOnBlur}
          />
          <span className="label">{this.props.label}</span>
          <span className="border" />
          {this.state.visible && (
            <div className="sf_suggestion">
              <ul tabIndex="-1" className="ul_block">
                {filteredItems.map((items, i) => (
                  <li
                    key={`item-${i}`}
                    className={selectedItem === i ? `selected` : ``}
                    onMouseOver={() => this.onMouseOver(i)}
                    onMouseOut={() => this.onMouseOut()}
                  >
                    <a
                      href="javascript:void(0);"
                      onMouseDown={() => this.changeValue(items)}
                    >
                      {items}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </label>
      </p>
    );
  }
}

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      station: window.sessionStorage.getItem("stationSearch").split(","),
	  cargo: window.sessionStorage.getItem("cargoSearch").split(",")
    };
  }
  render() {
    const { station, cargo } = this.state;
    return (
	<div>
      <table>
        <tbody>
          <td>
            <SearchBar items={station} label={"Станция отправления"} name={"station_from"} />
          </td>
		  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		  <td>
            <SearchBar items={station} label={"Станция назначения"} name={"station_to"} />
          </td>
		  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		  <td>
            <SearchBar items={cargo} label={"Груз"} name={"cargo"} />
          </td>
		  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		  <td>
            <p class="inp">
              <label>
              <input type="text" autocomplete="off" placeholder="&nbsp;" name="volume" />
              <span class="label">Объем</span>
              <span class="border" />
            </label>
            </p>
          </td>
		  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <p class="inp_file">
              <label>
              <input type="file" name="ratesFile" multiple accept="xlsx" />
              <span class="label">Файл ставок</span>
              <span class="border" />
            </label>
            </p>
          </td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <input type="button" onclick="calcRate()" class="bot1" value="Рассчитать ставку" />
          </td>
          <td>
            <input type="button" onclick="reload()" class="bot1" value="Сбросить" />
          </td>
          <td>
            <form action="export" method="get" id="calc">
              <input type="image" form="calc" src="excel.png" width="40px" height="40px" />
            </form>
          </td>
          <td>
            <a href="settings"><img class="setting" src="setting.png" /></a>
          </td>
        </tbody>
      </table>
	  </div>
    );
  }
}

export default App;
