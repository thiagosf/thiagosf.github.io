import { CHANGE_LANGUAGE } from '../constants'
import enUsLocaleData from '../locales/en-US.json'
import ptBrLocaleData from '../locales/pt-BR.json'

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'
import { intlReducer } from 'react-intl-redux'

addLocaleData([...en, ...pt])

const messages = {
  'en-US': enUsLocaleData,
  'pt-BR': ptBrLocaleData
}

let initialState = {
  defaultLocale: 'pt-BR',
  locale: 'pt-BR',
  messages: messages['pt-BR'],
  options: [{
    locale: 'en-US',
    name: 'English'
  }, {
    locale: 'pt-BR',
    name: 'Português'
  }]
}

const intl = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return Object.assign({}, state, {
        locale: action.locale,
        messages: messages[action.locale]
      })

    default:
      return state
  }
}

export default intl
