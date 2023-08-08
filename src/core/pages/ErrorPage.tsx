const ErrorPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: 'var(--error)', fontSize: '2rem' }}> Something went wrong... </h1>
    </div>
  );
};

export default ErrorPage;
