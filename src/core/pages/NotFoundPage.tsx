import { RoutePath } from '@/router/routePath';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate(RoutePath.CurrentWeather);
    }, 5000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem 0',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'var(--error)', fontSize: '2rem' }}> Page Not Found </h1>

      <div
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => navigate(RoutePath.CurrentWeather)}
      >
        Go to Weather page
      </div>
    </div>
  );
};

export default NotFoundPage;
