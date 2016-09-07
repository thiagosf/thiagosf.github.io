import React, { Component } from 'react'

class CommonSectionContainer extends Component {
  render() {
    return(
      <section className="common-section">
        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-body panel-body-large">
              {this.props.children}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CommonSectionContainer
