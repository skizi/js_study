const GlobalHeader: React.FC = () => {
  return (
    <>
      <style jsx>{`
        header {
          border-bottom: 1px solid #ddd;
        }
        h1 {
          margin-left: 30px;
          font-size: 25px;
        }
      `}</style>
      <header>
        <h1>Header</h1>
      </header>
    </>
  );
};

export default GlobalHeader;
