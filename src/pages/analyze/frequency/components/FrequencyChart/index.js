import React, { useEffect, useContext } from 'react';
import echarts from "echarts";
import 'echarts-wordcloud'

import { AppContext } from '../../../../../index'

export default () => {
  const context = useContext(AppContext)
  const { segComments } = context

  useEffect(() => {
    const counter = {}
    for (const segComment of segComments) {
      for (const word of segComment) {
        if (word && !counter[word]) {
          counter[word] = 1
        }
        else if (word) {
          counter[word] += 1
        }
      }
    }

    const wordData_ = []
    for (const key in counter) {
      wordData_.push({
        name: key,
        value: counter[key]
      })
    }

    console.log(wordData_)

    const myChart = echarts.init(document.getElementById('frequencyChart'))
    myChart.setOption({
      backgroundColor: "#fff",
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      series: [
        {
          type: "wordCloud",
          gridSize: 1,
          sizeRange: [12, 60],
          rotationRange: [-45, 0, 45, 90],
          textStyle: {
            normal: {
              color: function () {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ", " +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              }
            }
          },
          left: "center",
          top: "center",
          right: null,
          bottom: null,
          width: "90%",
          height: "110%",
          data: wordData_
        }
      ]
    })
  }, [segComments])


  return (
    <div id="frequencyChart" style={{ width: '100%', height: '100%' }}></div>
  )
}