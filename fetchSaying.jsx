  // Main App functions that is rendered whenever the React virtual DOM element is updated
function App() {
  const { Button, Card } = ReactBootstrap;
  const { useState, useEffect} = React;
  const url="https://api.quotable.io/random";
  const [data, setData] = useState(null);

  // Updates the saying in the "root" page element.  This occurs in the initial page load and when the botton is clicked.   Data is pulled using the third party software "axios" from the quotable.io site randomly
  async function updateSaying() {
    try {
      const { status, statusText, data } = await axios(url);
      if (!statusText == "OK") throw new Error(`${status} ${statusText}`);
      setData(data);
    } catch (error) {
        console.error(error);
        setData({content: "Problem with load"});
      }
  };

  useEffect(() => {
    updateSaying();
  },[]);
  
 if (!data) return null;

  return (
    <div className="App">
      <Card style={{ width: "90%", maxWidth: "40rem" }}>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{data.content}</p>
            {data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title">{data.author}</cite>
              </footer>
            )}
          </blockquote>
        </div>
        <div className="card-footer">
          <Button 
          variant="primary" onClick={() => updateSaying()}>
            New Quote
          </Button>
        </div>
      </Card>
    </div>
);
}
// ========================================
  ReactDOM.render(<App />, document.getElementById("root"));
