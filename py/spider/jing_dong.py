import requests
import json
import time
import random
import csv

url = 'https://club.jd.com/comment/productPageComments.action'


def saveSingleComment(productId, commentData):
    comment = commentData['content'].replace('\n', '').replace('\r', '')
    score = commentData['score']
    with open('好评/{}.csv'.format(productId), 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([comment, score])


# 爬取单个商品的评论
def productSpider(productId, page, score):

    params = {
        "callback": "fetchJSON_comment98",
        "productId": productId,
        "score": score,
        "sortType": 5,
        "page": page,
        "pageSize": 10,
        "isShadowSku": 0,
        "fold": 1,
    }
    headers = {
        "cookie": "__jdu=322589164; shshshfpa=32a5fa8f-3745-d65c-6d77-79cc2414870e-1606736952; shshshfpb=pKUTrAya%20mHUWAevCJgQuWw%3D%3D; _hjid=94a645f6-09f0-41e2-acf1-827a3dda898c; __jda=122270672.322589164.1606736950.1614003565.1616567716.19; __jdv=122270672|direct|-|none|-|1616567716229; __jdc=122270672; shshshfp=94b2ecdbe9c8e3da5ea5d1b8cb63876f; areaId=14; ipLoc-djd=14-1116-3431-57939; jwotest_product=99; wlfstk_smdl=e1oo67b8nei02xzlsqqp1tlum80185mm; 3AB9D23F7A4B3C9B=IQ3E4D6C4TKTSWWC3IZTIEMD2P3XLVNMCVCVSUJHTLPQKSMZMP7LUELWLQOBUA5EPADAC5MLZS4T5PRVE4JQFEJECY; _pst=jd_6d7eea6ded658; logintype=wx; unick=jd_6d7eea6ded658; pin=jd_6d7eea6ded658; npin=jd_6d7eea6ded658; thor=2D955462293BC1A437BF7E448F834D8B1E410031F7A99446FDDDF12F77BEEC40EF30AFEBCDCCBA83E7E2C39AD67497FB523F2306A30D6400FB5D346B630E764D0B378D1D2C0DEAD00230415A44726B70BA8C139BB15E9A7AB1D19C73F06302477DD7141705C24A3B0D68CFC4317D464349AA0C85EC0768550B813F4DC841A520EE01595E9F17F5A962F02E8EB594A2AD4DF83B0839C09C8B8DD80A5B7EDD4BD9; _tp=uPkh6%2BQQ4jCEIW%2FziwZbHEpIQnEayl6UU3UmZ8Rsp%2Bg%3D; pinId=SlVbCrFVcb9glMafqpbGCbV9-x-f3wj7; __jdb=122270672.8.322589164|19.1616567716; shshshsID=07cd46167cf87d552d2876080a46f213_6_1616568029891; JSESSIONID=A5D536E346966F70A2ADCA838F5F86BE.s1",
        "host": "club.jd.com",
        "referer": "https://item.jd.com/",
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    }
    res = requests.get(url=url, params=params, headers=headers, timeout=5)
    try:
        resJSON = str(res.content, encoding="GBK")[20: -2]
        resDic = json.loads(resJSON)

        comments = []
        for commentData in resDic['comments']:
            comment = commentData['content'].replace(
                '\n', '').replace('\r', '')
            score = commentData['score']
            comments.append({
                'comment': comment,
                'score': score
            })
        print('success - id={} - page={} - number={}'.format(productId,
                                                             page, len(resDic['comments'])))
        return comments

    except:
        print('fail - id={} - page={}'.format(productId, page))
        return []


def jingDongSpider(id, page, score):
    return productSpider(id, page, score)

