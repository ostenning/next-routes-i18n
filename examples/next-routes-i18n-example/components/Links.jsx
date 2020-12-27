import { useState } from 'react'
import { Link, Router } from '../routes'

const Links = () => {
  const [locale, setLocale] = useState('fr')
  return (
    <div className="links">
      <div>
        <h3>Locale selector</h3>
        <button onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}>
          Locale: {locale}
        </button>
      </div>

      <div>
        <h3>Next/Link</h3>
        <Link href="index" locale={locale} params={{ other: 'maybe' }}>- Index</Link>
        <Link href="profile" locale={locale}>- Profile</Link>
        <Link href="profile" locale={locale} params={{ something: 'yes' }} shallow>- Profile with param (shallow)</Link>
        <Link href="main" locale={locale} params={{ something: 'else' }} passHref><a className="test">- Main</a></Link>
      </div>

      <div>
        <h3>Next/Router</h3>
        <button onClick={() => Router.pushRoute('index', {}, locale, { shallow: false })}>Index</button>
        <button onClick={() => Router.pushRoute('profile', {}, locale, { shallow: true })}>Profile</button>
        <button onClick={() => Router.replaceRoute('profile', { hello: 'joe' }, locale, { shallow: true })}> Profile with param (shallow)</button>
        <button onClick={() => Router.pushRoute('main', {}, locale, { shallow: false })}>Main</button>
      </div>
    </div>
  );
};

export default Links;