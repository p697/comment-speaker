import React, { useState, useContext, useEffect } from "react";
import XLSX from 'xlsx';

import { Form, Input, Button, InputNumber, List, Typography, message, Select, Progress, notification } from "antd";

import { AppContext } from '../../index'
import "./index.scss";

const { TextArea } = Input;
const { Option } = Select;
let sumListData = []


export default (props) => {
  // 目标平台
  // const { match: { params: { plat } } } = props;
  const [listData, setListData] = useState({ page: 0 })
  const [comments, setComments] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const context = useContext(AppContext)

  useEffect(() => {
    setTimeout(() => {
      setComments(context.comments)
    });
  }, [context])

  const requestOnePage = async (e) => {
    setLoading(true)
    sumListData = []
    const { id, pageSum, score } = e
    setTotalPage(pageSum)
    for (let page = 1; page <= pageSum; page++) {
      await new Promise((resolve) => setTimeout(() => resolve(), Math.random() * 1000 + 500))
      const fetchData = await fetch(`http://127.0.0.1:5001/jingdong_spider/${id}/${page}/${score}`)
        // eslint-disable-next-line no-loop-func
        .then(async function (response) {
          const res = await response.json()
          sumListData = [...res.data, ...sumListData]
          setListData({
            page,
            data: res.data
          })
          context.setComments(sumListData)
          return res.data
        })
      if (!fetchData || fetchData.length === 0) {
        break
      }
    }
    notification['success']({
      message: '爬取结束',
      description: `爬取结束，共爬取到${sumListData.length}条数据`,
      placement: 'bottomLeft',
    });
    setLoading(false)
  }

  const exportData = () => {
    if (comments.length === 0) {
      return message.warning('没有数据', 1)
    }

    const jsonWorkSheet = XLSX.utils.json_to_sheet(sumListData, { skipHeader: true });
    const workBook = {
      SheetNames: ['sheet1'],
      Sheets: {
        'sheet1': jsonWorkSheet,
      }
    };
    // 导出 Excel
    XLSX.writeFile(workBook, '导出.xlsx');
  }

  console.log(parseInt((listData.page / totalPage) * 100))

  return (
    <div className="spider">
      <div className="spider-left">

        <div className="spider-left-box">
          {
            listData.page !== 0 &&
            <Progress type="dashboard" percent={parseInt((listData.page / totalPage) * 100)} />
          }
        </div>

        <div className="spider-left-box">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={requestOnePage}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            initialValues={{
              id: '',
              pageSum: 100,
              score: 0,
            }}
          >
            <Form.Item
              name="id"
              rules={[{ required: true, message: '请输入商品id' }]}
            >
              <TextArea placeholder="输入商品id，一次一个" autoSize />
            </Form.Item>

            <Form.Item
              label="爬取页数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
              colon={false}
              name="pageSum"
              rules={[{ required: true, message: '请输入爬取页数' }]}
            >
              <InputNumber min={1} max={100} />
            </Form.Item>

            <Form.Item
              label="评论类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
              name="score"
              colon={false}
              rules={[{ required: true, message: '请选择评论类型' }]}
            >
              <Select>
                <Option value={0}>全部</Option>
                <Option value={3}>好评</Option>
                <Option value={2}>中评</Option>
                <Option value={1}>差评</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <div className='spider-left-box-item'>
                <Button type="primary" htmlType="submit" loading={loading}>
                  开始爬取
                </Button>
                <Button onClick={exportData}>
                  导出数据
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>

        <div className="spider-left-box"></div>

      </div>

      <div className="spider-right">
        <List
          size="small"
          header={<div>正在爬取第{listData.page}页，总计爬取到{sumListData.length}条数据</div>}
          footer={<div></div>}
          bordered
          dataSource={comments}
          locale={{ emptyText: '暂无数据' }}
          style={{ minHeight: '100%' }}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>{item.score}星</Typography.Text> {item.comment}
            </List.Item>
          )}
        />

      </div>
    </div>
  );
};
