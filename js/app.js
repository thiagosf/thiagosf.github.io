var titleEl = document.querySelector('.main-header h1 span')
var titleValue = titleEl.innerText
var newTitleContent = []
var letters = titleValue.length
var middle = Math.round(letters / 2)
var minFontVariation = 100
var maxFontVariation = 900
var variation = (middle / 800) * minFontVariation

titleEl.innerHTML = ''

var fontVariation = minFontVariation

for (var i = 0; i < letters; i++) {
  var letter = titleValue[i]
  var letterEl = document.createElement('span')
  var fontVariationFixed = fontVariation
  if (fontVariationFixed > maxFontVariation) {
    fontVariationFixed = maxFontVariation
  }
  letterEl.innerText = letter
  letterEl.style = "font-variation-settings: 'wght' " + fontVariationFixed
  titleEl.appendChild(letterEl)
  if (letter != ' ') {
    if (i < middle) {
      fontVariation *= variation
    } else {
      fontVariation /= variation
    }
    fontVariation = Math.ceil(fontVariation)
  }
}
