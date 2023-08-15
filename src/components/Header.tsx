import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';
import { UserType } from '../types';

function Header() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  async function fetch() {
    setLoading(true);
    const userName = await getUser();
    setUser(userName);
    setLoading(false);
  }

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <LoadingMessage />;

  return (
    <header data-testid="header-component">
      <h2 data-testid="header-user-name">{user?.name}</h2>
      <nav>
        <NavLink data-testid="link-to-search" to="/search">
          Search:
        </NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">
          Profile:
        </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">
          Favorites:
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
