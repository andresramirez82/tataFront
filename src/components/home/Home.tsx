import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from 'components/sidebar/Sidebar';
import SearchBar from "components/searchbar/SearchBar";

function Home(): JSX.Element {
    return (<div>
        <SearchBar />
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-1">
              <Sidebar />
            </div>
            <div className="col-md-11 dashboard">
              <div className="main-content">
                <h1>Main Content</h1>
              </div>
            </div>
          </div>
        </div>
      </div>)
}

export default Home;