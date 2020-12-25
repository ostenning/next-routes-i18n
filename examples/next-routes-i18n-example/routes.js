const RoutesI18n = require('./lib.js')

const options = {
  locale: 'fr',               // Locale
  defaultLocale: 'fr',        // Default locale
  hideDefaultLocale: false,   // hide locale prefix when default is detected
  hideLocalePrefix: true,     // hide all locale prefixes
}

const routes = RoutesI18n(options)

routes
  .add('homepage')
  .add('main', 'en', '/main')
  .add('main', 'fr', '/principal')
  .add('profile', 'en', '/profile')
  .add('profile', 'fr', '/profil')

module.exports = routes
