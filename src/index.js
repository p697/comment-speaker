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
import AnalyzeEmotionyPage from './pages/analyze/emotion'
import ResultPage from './pages/result/index'

import mock_comments from './assest/mock_comments'

// 爬到的评论 - 全局使用，下同
export const AppContext = React.createContext([]);
// 分词结果


const App = () => {
  const [comments, setComments] = React.useState(mock_comments)
  const [segComments, setSegComments] = React.useState([])
  const [emotionData, setEmotionData] = React.useState([])

  return (
    <AppContext.Provider
      value={{
        comments,
        setComments,
        segComments,
        setSegComments,
        emotionData,
        setEmotionData,
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

              <Route path="/analyze/emotion" component={AnalyzeEmotionyPage} />

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

