import showdown from 'showdown'
import emoji from 'node-emoji'

export default {
  convert: function(body) {
    const converter = new showdown.Converter({ strikethrough: true })
    body = emoji.emojify(body)
    body = converter.makeHtml(body)
    return { __html: body }
  }
}
