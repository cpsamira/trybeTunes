import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './loading';

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUser()
      .then((user) => {
        setUserName(user.name);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuário:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">
        Search
      </NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">
        Favorites
      </NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">
        Profile
      </NavLink>
      {isLoading ? (
        <Loading />
      ) : (
        <p data-testid="header-user-name">
          {userName}
        </p>
      )}
    </header>
  );
}

export default Header;
