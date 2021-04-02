import React, { Component } from 'react'
import CreateReadUpdateDelete from '../pattern-components/CreateReadUpdateDelete'
import '../pattern-components/patterns.scss'

class UIShellBody extends Component {
  components = {
    'Grocery List': CreateReadUpdateDelete,
  }
  defaultComponent = 'Display Form'

  render() {
    const PatternName = this.components[
      this.props.patternName || this.defaultComponent
    ]
    return (
      <div className='pattern-container'>
        <PatternName showDescription={true} />
      </div>
    )
  }
}
export default UIShellBody
