import React, { Component } from 'react'

const icons = {
  comment: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>',
  time: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
  compass: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/></svg>',
  logo: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 128 128" enable-background="new 0 0 128 128" xml:space="preserve"> <polygon fill-rule="evenodd" clip-rule="evenodd" points="43,38 43,48 58,48 58,88 68,88 68,48 83,48 83,38 "/> <path d="M0,0v128h128V0H0z M118,118H10V10h108V118z"/> </svg>',
  nib: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 158.4 26" enable-background="new 0 0 158.4 26" xml:space="preserve"> <polygon points="0,0 79.2,26 158.4,0 "/> </svg>'
}

class Icon extends Component {
  htmlIcon() {
    const { name } = this.props
    return {
      __html: icons[name]
    }
  }
  render() {
    const { name } = this.props
    return(
      <span className={`icon-${name}`} dangerouslySetInnerHTML={this.htmlIcon()}></span>
    )
  }
}

export default Icon
