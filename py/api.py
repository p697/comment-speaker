import sys
from flask import Flask
from flask.globals import request
from flask_cors import cross_origin
import json

from spider.jing_dong import jingDongSpider
from fenci.fenci import handleList
 

app = Flask(__name__)

# 京东爬虫
@app.route("/jingdong_spider/<id>/<page>/<score>")
@cross_origin()
def jingdong_spider(id, page, score):
    resList = jingDongSpider(id, page, score)
    return {
        'success': True,
        'data': resList,
    }

# 分词处理
@app.route("/fenci", methods=['POST'])
@cross_origin()
def fenci():
    data = request.get_data()
    data = json.loads(data.decode('utf-8'))
    data.setdefault('comments', [])
    seg_data = handleList(data['comments'])
    return {
        'success': True,
        'data': seg_data,
    }
 
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)