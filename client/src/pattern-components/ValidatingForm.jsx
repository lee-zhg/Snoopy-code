import React, { Component } from "react";
import {
  TextInput,
  Form,
  DropdownV2,
  Button,
  Tile
} from "carbon-components-react";
import Header from "./Header";
import "./patterns.scss";

let checkFlag = true;

class ValidatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToSave: {},
      showDescription: props.showDescription || false
    };
    if (this.props.data) {
      let dataToLoad = this.convertData(this.props.data);
      this.state = {
        ...this.state,
        item: dataToLoad.item,
        qty: dataToLoad.qty,
        amt: dataToLoad.amt
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      let dataToLoad = this.convertData(nextProps.data);
      if (dataToLoad.Name === "Enter data below") {
        dataToLoad.Name = "";
      }
      this.setState({
        item: dataToLoad.item,
        qty: dataToLoad.qty,
        amt: dataToLoad.amt
      });
    }
  }

  convertData = inputData => {
    let output = {};
    inputData.forEach(dataRow => {
      output[dataRow.label] = dataRow.value;
    });
    return output;
  };

  saveData = event => {
    const target = event.target;
    let fieldName = target.name;
    let fieldValue = target.value;
    if (!fieldValue) {
      this.setState({ [fieldName]: fieldValue, [fieldName + "Invalid"]: true });
    } else {
      this.setState({
        [fieldName]: fieldValue,
        [fieldName + "Invalid"]: false
      });
    }
  };

  saveDataDropdown1 = ({ selectedItem }) => {
    this.setState({ state: selectedItem, stateInvalid: false });
  };

  saveDataDropdown2 = ({ selectedItem }) => {
    this.setState({ country: selectedItem, countryInvalid: false });
  };

  checkForm = () => {
    checkFlag = true;
    if (!this.state.item) {
      this.setState({ itemInvalid: true });
      checkFlag = false;
    }
    if (!this.state.qty) {
      this.setState({ qtyInvalid: true });
      checkFlag = false;
    }
    if (!this.state.amt) {
      this.setState({ amtInvalid: true });
      checkFlag = false;
    }
    return checkFlag;
  };

  saveForm = event => {
    event.preventDefault();
    if (this.checkForm()) {
      let dataToSave = {
        item: this.state.item,
        qty: this.state.qty,
        amt: this.state.amt
      };
      if (typeof this.props.updateRow === "function") {
        this.props.updateRow(dataToSave);
      } else {
        this.setState({ dataToSave });
      }
      if (this.props.adding) {
        this.props.toggleAdding();
      }
    }
  };

  render() {
    const showDescription = this.state.showDescription;
    return (
      <div className="bx--grid pattern-container">
        {showDescription && (
          <Header
            title="Validating Form"
            subtitle="Presents a model object as a data input form and interacts with a validation service for validation."
          />
        )}
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <Tile>
              <Form>
                <TextInput
                  id="item"
                  name="item"
                  value={this.state.item || ""}
                  onChange={this.saveData}
                  labelText="Item"
                  maxLength="100"
                  invalid={this.state.itemInvalid}
                  invalidText="Please enter an item..."
                />
                <br />
                <br />
                <TextInput
                  id="qty"
                  name="qty"
                  value={this.state.qty || ""}
                  onChange={this.saveData}
                  labelText="Qty"
                  maxLength="50"
                  invalid={this.state.qtyInvalid}
                  invalidText="Please enter the number of items..."
                />
                <br />
                <br />
                <TextInput
                  id="amt"
                  name="amt"
                  value={this.state.amt || ""}
                  onChange={this.saveData}
                  labelText="Amt"
                  maxLength="100"
                  // invalid={this.state.amtInvalid}
                  // invalidText="Please amount or size..."
                />
                <br />
                <br />
                <br />
                <br />
                <div className="left-align">
                  {showDescription && (
                    <Button onClick={this.saveForm}>Submit</Button>
                  )}
                  {!showDescription && (
                    <Button onClick={this.saveForm}>
                      {this.props.adding ? "Add" : "Update"}
                    </Button>
                  )}
                </div>
              </Form>
            </Tile>
          </div>
        </div>
        <br />
        <br />
        {Object.keys(this.state.dataToSave).length > 0 && (
          <div className="bx--row">
            <div className="bx--col-xs-12 left-align">
              <Tile>
                {Object.keys(this.state.dataToSave).map(item => (
                  <p>
                    &nbsp;&nbsp;
                    <strong>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1).replace(/([A-Z])/g, " $1")}
                      :
                    </strong>{" "}
                    {this.state.dataToSave[item]}
                  </p>
                ))}
              </Tile>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ValidatingForm;
