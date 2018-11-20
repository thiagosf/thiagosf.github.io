var App = function () {
  this.el = {
    mobileNav: document.querySelector('.mobile-nav')
  }
  this.contents = {}
}

App.prototype.init = function () {
  this.addEvents()
}

App.prototype.addEvents = function () {
  var links = [].slice.call(this.el.mobileNav.querySelectorAll('a'))
  var startTop = 0
  for (var i in links) {
    var link = links[i]
    var href = link.getAttribute('href')
    var content = document.querySelector(href)
    this.contents[href] = {
      startTop: startTop,
      endTop: content.offsetTop,
      link: link
    }
    startTop = content.offsetTop
  }
  window.addEventListener('scroll', this.onScroll.bind(this))
}

App.prototype.onScroll = function () {
  var top = window.scrollY - window.innerHeight + 100
  if (top < 0) top = 0
  for (var i in this.contents) {
    var item = this.contents[i]
    if (top >= item.startTop && top <= item.endTop) {
      this.el.mobileNav.querySelector('.active').classList.remove('active')
      item.link.classList.add('active')
      break
    }
  }
}

var app = new App()
window.addEventListener('load', app.init.bind(app))
