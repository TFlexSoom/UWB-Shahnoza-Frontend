import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ReactUploadImage from './Components/ReactUploadImage.jsx';
import AppNavBar from "./Components/AppNavBar.jsx";
import AppFooter from "./Components/AppFooter.jsx";
import PhotoDrawer from "./Components/PhotoDrawer";
import ResultsList from "./Components/ResultsList";
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import "./baseStyles.css";

//import testoutput from './output.json'

var domainName = "https://shahnoza-app.software";
var photoDrawer = React.createRef(); // undefined until photo drawer instance
var resultsList = React.createRef();

function newResults(results){
  //resultsList.current.changeResults(testoutput);
  if(results === null){
    console.error("No Results!");
    resultsList.current.changeResults([]);
    return;
  }
  console.log(results.data);
  resultsList.current.changeResults(results.data);
}

function onClickChangeDrawer(e){
  photoDrawer.current.openCloseDrawer();
}

export default function ShahnozaApplication() {
  return (
  <React.StrictMode>
      <CssBaseline />
      <AppNavBar onCameraClick={onClickChangeDrawer} onResponse={newResults} url={domainName + "/upload"} />
      <Container width="100%" id="main-container">
        <Typography variant="h1">Welcome to #snza</Typography>
        <Typography variant="h6">Upload a file or take a photo to begin.</Typography>
        <ReactUploadImage onResponse={newResults} onCameraClick={onClickChangeDrawer} url={domainName + "/upload"} formClass="app-form" />
        <ResultsList results={[]} ref={resultsList}  />
        <PhotoDrawer ref={photoDrawer} url={domainName + "/upload"} onResponse={newResults}/>
      </Container>
      <AppFooter />
  </React.StrictMode>
  );
}

export function WelcomeTitle(props){
  return <h1 className="welcome-title">{props.text}</h1>;
}

ReactDOM.render(<ShahnozaApplication />, document.getElementById("root"));
serviceWorker.unregister();
