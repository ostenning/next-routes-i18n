const RoutesI18n = require('next-routes-i18n')

const options = {
  locale: 'fr',                // Locale
  defaultLocale: 'fr',         // Default locale
  hideDefaultLocale: false,    // hide locale prefix when default is detected
  hideLocalePrefix: false,     // hide all locale prefixes
}

const routes = RoutesI18n(options)

routes
  .add('index', 'en', '/')
  .add('index', 'fr', '/')
  .add('main', 'en', '/main/:id')
  .add('main', 'fr', '/principal/:id')
  .add('profile', 'en', '/profile')
  .add('profile', 'fr', '/profil')

module.exports = routes
