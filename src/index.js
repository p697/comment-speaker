import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './index.css';

import Menu from './coms/menu/menu'
import HomePage from './pages/home/index'
import SpiderPage from './pages/spider/index'
import WashPage from './pages/wash/index'
import AnalyzeFrequencyPage from './pages/analyze/frequency'
import ResultPage from './pages/result/index'
import MonitorPage from './pages/monitor/index'

// 爬到的评论 - 全局使用，下同
export const AppContext = React.createContext([]);
// 分词结果


const App = () => {
  const [comments, setComments] = React.useState([])
  const [segComments, setSegComments] = React.useState([])

  return (
    <AppContext.Provider
      value={{
        comments,
        setComments,
        segComments,
        setSegComments,
      }}
    >
      <Router>
        <div className="app">
          <Menu />
          <div className="page">
            <Switch>

              <Route exact path="/home" component={HomePage} />

              <Route path="/spider/:plat" component={SpiderPage} />

              <Route path="/wash" component={WashPage} />

              <Route path="/analyze/frequency" component={AnalyzeFrequencyPage} />

              <Route path="/result" component={ResultPage} />

            </Switch>
          </div>
        </div>
      </Router>
    </AppContext.Provider>

  );
}


ReactDOM.render((
  <App />
), document.getElementById("root"))

