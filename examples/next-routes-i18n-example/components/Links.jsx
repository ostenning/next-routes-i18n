import { useState } from 'react';
import { Link, Router } from '../routes';

const Links = () => {
    const [locale, setLocale] = useState('fr');

    return (
        <div className="links">
            <Link href="index" locale={locale}>Index</Link>
            <Link href="profile" locale={locale}>Profile</Link>
            <Link href="main" locale={locale}>Main</Link>
            <div>
                <button onClick={() => Router.replaceRoute('index', {}, locale, { shallow: true })}>Index</button>
                <button onClick={() => Router.pushRoute('profile', { other: 'yes' }, locale)}>Profile</button>
                <button onClick={() => Router.pushRoute('main', {}, locale)}>Main</button>
            </div>

            <div> 
                <button onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}>
                    Locale: {locale}
                </button>
            </div>
        </div>
    );
};

export default Links;