import requests
import json


def analyzeEmotion(comment):
    params = {
        'access_token': '24.69f15e53a57c0cedc2797b406eed6697.2592000.1620701647.282335-23968656',
        'charset': 'UTF-8',
    }
    emotionRes = requests.post(
        url='https://aip.baidubce.com/rpc/2.0/nlp/v1/sentiment_classify', params=params, timeout=10,
        data=json.dumps({
            "text": comment
        }))
    pointRes = requests.post(
        url='https://aip.baidubce.com/rpc/2.0/nlp/v2/comment_tag', params=params, timeout=10,
        data=json.dumps({
            "text": comment,
            "type": 13,
        }))
    return {
        "emotion": json.loads(emotionRes.text),
        "point": json.loads(pointRes.text),
    }
