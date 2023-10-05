import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/loading';

function Login() {
  const [userName, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (userName.length >= 3) {
      setIsLoading(true);

      try {
        await createUser({ name: userName });
        navigate('/search');
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // const handleClick = async (event:React.MouseEvent) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   await createUser({ name: userName });
  //   navigate('/search');
  // };

  return (
    <div>
      {isLoading ? <Loading />
        : (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              onChange={ (e) => setName(e.target.value) }
              placeholder="Digite seu nome"
              value={ userName }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ userName.length <= 2 }
              onClick={ handleClick }
            >
              Entrar
            </button>
          </form>
        )}
    </div>
  );
}

export default Login;
