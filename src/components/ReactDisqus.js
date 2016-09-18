import React from 'react'

class ReactDisqus extends React.Component{
  componentDidMount() {
    this.embedDisqus()
  }
  render() {
    return(
      <div>
        <div id="disqus_thread">
          <noscript>
            <span>
              Please enable JavaScript to view the
              <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
            </span>
          </noscript>
        </div>
      </div>
    )
  }
  embedDisqus() {
    let disqus_config = function() {
      this.page.url = this.props.pageurl
      this.page.identifier = this.props.identifier
    }
    let protocol = this.props.protocol
    let dsq = document.createElement('script')
    dsq.type = 'text/javascript'
    dsq.async = true
    dsq.src = protocol + '://' + this.props.shortname + '.disqus.com/embed.js'
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq)
  }
}

ReactDisqus.propTypes = {
  shortname: React.PropTypes.string.isRequired,
  pageurl: React.PropTypes.string,
  identifier: React.PropTypes.string,
  protocol: React.PropTypes.string
}

ReactDisqus.defaultProps = {
  shortname: null,
  pageurl: window.location.href,
  identifier: null,
  protocol: 'http'
}

export default ReactDisqus
