import React, { useState, useContext, useEffect } from 'react';
import {
  List,
  Typography,
  Button,
  Spin,
  message,
} from 'antd'
import XLSX from 'xlsx';

import { AppContext } from '../../index'
import './index.scss';


export default () => {
  const context = useContext(AppContext)
  const [comments, setComments] = useState([])
  const [segComments, setSegComments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setComments(context.comments)
      setSegComments(context.segComments)
    });
  }, [context])

  const handleFenci = () => {
    setLoading(true)
    const comments = context.comments.map(cData => cData.comment)
    fetch('http://127.0.0.1:5001/fenci', {
      method: 'POST',
      body: JSON.stringify({ comments }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(res => {
        context.setSegComments(res.data)
        setLoading(false)
      })
  }

  const exportData = () => {
    if (segComments.length === 0) {
      return message.warning('没有数据', 1)
    }

    const jsonWorkSheet = XLSX.utils.json_to_sheet(segComments, { skipHeader: true });
    const workBook = {
      SheetNames: ['sheet1'],
      Sheets: {
        'sheet1': jsonWorkSheet,
      }
    };
    // 导出 Excel
    XLSX.writeFile(workBook, '分词导出.csv');
  }

  return (
    <div className="wash">

      {
        loading &&
        <div className="wash-loading">
          <Spin tip="正在处理..." />
        </div>
      }

      <div className="wash-left">
        <List
          size="small"
          header={<div>合计爬取到{context.comments.length}条数据</div>}
          // footer={<div>总计爬取到{sumListData.length}条评论</div>}
          bordered
          dataSource={comments}
          locale={{ emptyText: '暂无数据' }}
          style={{ minHeight: '80%', maxHeight: '80%', width: '100%', overflowY: 'auto' }}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>{item.score}星</Typography.Text> {item.comment}
            </List.Item>
          )}
        />
        <div className="wash-left-btnBox">
          <Button type="primary" value="large" onClick={handleFenci}>开始分词</Button>
          <Button onClick={exportData}>导出数据</Button>
        </div>
      </div>

      <div className="wash-right">
        <List
          size="small"
          header={<div>分词结果</div>}
          // footer={<div>总计爬取到{sumListData.length}条评论</div>}
          bordered
          dataSource={segComments}
          locale={{ emptyText: '' }}
          style={{ minHeight: '100%' }}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>{JSON.stringify(item)}</Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

