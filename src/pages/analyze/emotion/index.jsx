import React, { useEffect, useContext } from 'react';
import { Card, Spin, Progress, Collapse } from 'antd';
import axios from 'axios'

import { AppContext } from '../../../index'
import './index.scss';

const { Panel } = Collapse;


export default () => {
  const context = useContext(AppContext)
  const { comments, emotionData, setEmotionData } = context

  useEffect(() => {
    setEmotionData([])

    const params = {
      'access_token': '24.69f15e53a57c0cedc2797b406eed6697.2592000.1620701647.282335-23968656',
      'charset': 'UTF-8',
    }

    const getData = async () => {
      
      for (const commentObj of comments) {
        const { comment } = commentObj

        // eslint-disable-next-line no-loop-func
        await new Promise(async (resolve) => {
          const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:5001/emotion',
            params,
            data: { comment }
          })
          setEmotionData(preState => ([...preState, {
            emotion: res.data.data.emotion.items,
            point: res.data.data.point.items,
          }]))
          setTimeout(() => {
            resolve()
          }, 800);
        })


      }
    }

    getData()
  }, [comments, setEmotionData])

  return (
    <div className="emotion">
      {
        emotionData.length > 0 &&
        comments.map((comment, index) => {

          return (
            <div className="emotion-item" key={index}>
              <div className="emotion-item-header">
                <div className="emotion-item-header-left">
                  <Card>{comment.comment}</Card>
                </div>
                <div className="emotion-item-header-right">
                  {
                    !emotionData[index] && <Spin />
                  }
                </div>
              </div>

              <div className="emotion-item-content">
                <div className="emotion-item-content-top">
                <div className="emotion-item-content-text">正向情感：{emotionData[index] && emotionData[index].emotion[0].positive_prob}</div>
                <div className="emotion-item-content-text">负向情感：{emotionData[index] && emotionData[index].emotion[0].negative_prob}</div>
                </div>
                <Progress
                  showInfo={false}
                  percent={emotionData[index] ? emotionData[index].emotion[0].negative_prob * 100 : 0}
                />
              </div>

              

              <div className="emotion-item-footer">

                <Collapse>
                  {
                    emotionData[index] &&
                    emotionData[index].point.map((point, index) => {
                      let sentiment = ''
                      if (point.sentiment === 0) {
                        sentiment = '消极'
                      } else if (point.sentiment === 1) {
                        sentiment = '中性'
                      } else if (point.sentiment === 2) {
                        sentiment = '积极'
                      }
                      return (
                      <Panel header={<div>
                        <span >{point.abstract.split('<span>')[0]}</span>
                        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{point.abstract.split('<span>')[1].split('</span>')[0]}</span>
                        <span>{point.abstract.split('</span>')[1]}</span>
                      </div>} key={index}>
                        <p>属性词：{point.prop}</p>
                        <p>描述词：{point.adj}</p>
                        <p>极性：{sentiment}</p>
                      </Panel>
                    )
                    })
                  }
                </Collapse>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

