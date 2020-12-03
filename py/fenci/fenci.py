import jieba


def stopwordslist():
    stopwords = [line.strip() for line in open(
        'py/fenci/stopwords.txt', encoding='UTF-8').readlines()]
    return stopwords


def handleList(comments):
    finalList = []
    stopwords = stopwordslist()
    for comment in comments:
        seg_comment = jieba.cut(comment, cut_all=False)
        goodList = []
        for word in list(seg_comment):
            if word not in stopwords:
                goodList.append(word)
        finalList.append(goodList)
    return finalList
