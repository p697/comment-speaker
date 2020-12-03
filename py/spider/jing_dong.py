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
        "cookie": "__jdu=322589164; areaId=14; PCSYCityID=CN_340000_340100_0; shshshfpa=32a5fa8f-3745-d65c-6d77-79cc2414870e-1606736952; shshshfpb=pKUTrAya%20mHUWAevCJgQuWw%3D%3D; ipLoc-djd=14-1116-3431-57939; 3AB9D23F7A4B3C9B=IQ3E4D6C4TKTSWWC3IZTIEMD2P3XLVNMCVCVSUJHTLPQKSMZMP7LUELWLQOBUA5EPADAC5MLZS4T5PRVE4JQFEJECY; unpl=V2_ZzNtbUQEER10CBVQeBxdAWIKQg8RAEoQcwBCVH8fD1YzAxpVclRCFnQURldnGFwUZwUZXkdcQhxFCEdkeBBVAWMDE1VGZxBFLV0CFSNGF1wjU00zQwBBQHcJFF0uSgwDYgcaDhFTQEJ2XBVQL0oMDDdRFAhyZ0AVRQhHZHkaXwFuCxJaR2dzEkU4dlZ9EFkNYDMTbUNnAUEpDkZUcxpZSGUAEVlLX0MScDhHZHg%3d; CCC_SE=ADC_XAHtgvliqiYNp5SlJV29FtUzpTqf9h0GdgcFId3ny0lP3AseZbKBYzZ5FRIqVvrNDJ36RQYQydkfYTI1nFjRRAIjrTTK8k5L8u197pFnVZVJBymY0tDyuFpIFkmHlYOt11zhEsCBsB3eiJENnxq7QSyxmYJEyzJoeAJr%2bFari5guEf9Ofzn5mSjeITsq2prnQCfG0s05wRvbObPDIUI22qMMppK9RDk61odyGnh7RZZ7HVWwUvi%2baroIb1CbWeMYKy2uxYzFP0yIqRG3hSoWrqMb8M6pN6mRKlx%2fPy%2bMMBA9Mlbuuxu0pDv5JIILyWxkohNjhbYqt%2fRgA0zoJOShzEwrqelErLb2JuT1dgykbg9TiPhjxtIVIJaCMBpM2SriCTFFiXg1RUvFkeCQhzFtAWCm6ZnVDhTjY2dpDSUqkxUk0CbsEEdd0nsPH9EbXpeR4mZJaqMeuvThwP2eE5usTAGJ5pW6g97HEW%2fWoM5%2bRjEz%2bQL04QklqR7jVKTIfx3XkOSxccvyECD8kqbrQV8Cg0s%2bLFhGPaG1AyLoYzHdbrVdLaiQ6ZxCdpPNkrZYCiJH; __jdv=76161171|baidu-pinzhuan|t_288551095_baidupinzhuan|cpc|0f3d30c8dba7459bb52f2eb5eba8ac7d_0_7bc901b5240548acbf84795157bbe199|1606814650479; __jdc=122270672; jwotest_product=99; shshshfp=8aad733fa91de59fdad0ffc5960ce579; shshshsID=41053bb9f7c71ee57685d4862a3302df_1_1606867513326; __jda=122270672.322589164.1606736950.1606865687.1606867513.5; __jdb=122270672.1.322589164|5.1606867513; JSESSIONID=F71E7A48765A359053A739754D60AB21.s1",
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

