import Header from '../components/Header';

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="iframe_container">
        <iframe sandbox='allow-scripts allow-same-origin' src="https://sense-demo.qlik.com/sso/single/?appid=cd840389-f841-4477-86be-532fb0b13775&sheet=aLvPhq&opt=ctxmenu,currsel" />
      </div>
    </>
  );
};

export default Dashboard;
