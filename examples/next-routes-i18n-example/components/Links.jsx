import { Link, Router } from '../routes';

const Links = () => (
    <div>
        <Link href="index">Index</Link>
        <Link href="profile">Profile</Link>
        <Link href="main">Main</Link>

        <div>
            <button onClick={() => Router.pushRoute('index', {}, 'fr')}>Index</button>
            <button onClick={() => Router.pushRoute('profile', {}, 'fr')}>Profile</button>
            <button onClick={() => Router.pushRoute('main', {}, 'fr')}>Main</button>
        </div>
    </div>
);

export default Links;