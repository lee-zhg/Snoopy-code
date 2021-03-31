import React, { Component } from "react";
import DisplayForm from "../pattern-components/DisplayForm";
import ValidatingForm from "../pattern-components/ValidatingForm";
import UpdateForm from "../pattern-components/UpdateForm";
import CreateReadUpdateDelete from "../pattern-components/CreateReadUpdateDelete";
import "../pattern-components/patterns.scss";

class UIShellBody extends Component {
  components = {
    "Display Form": DisplayForm,
    "Validating Form": ValidatingForm,
    "Update Form": UpdateForm,
    "Grocery List": CreateReadUpdateDelete
  };
  defaultComponent = "Display Form";

  render() {
    const PatternName = this.components[
      this.props.patternName || this.defaultComponent
    ];
    return (
      <div className="pattern-container">
        <PatternName showDescription={true} />
      </div>
    );
  }
}
export default UIShellBody;
