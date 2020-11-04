# 小程序接口文档

# 说明

前缀: `/v1` ，通过小程序wx.login返回的code, 进行jwt加密后存入数据库返回token。请求其他接口使用 Basic Auth, Username 为token即可请求

# 令牌

## 获取令牌

**URL**:

``` http
POST      /token
```

**Parameters**:

* account: 邮箱/手机账号或者小程序wx.login登录后返回的code
* type：登录类型分为四种：100 小程序登录 101 邮箱登录 102 手机登录 200 管理员邮箱登录
* secret：密码（小程序登录时不需要密码）

**Response Status** 201:

``` json
{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInNjb3BlIjo4LCJpYXQiOjE2MDQyNzkzNTksImV4cCI6MTYwNjg3MTM1OX0.RC8OlbAgVBxwUNFc04NvzqLKRHS_ORUYIqvYMqrl-Iw",
        "msg": "ok",
        "request": "POST  /token"
}
```

## 验证令牌

**URL**:

``` http
POST     /token/verify
```

**Parameters**:

 - token: 令牌

**Response Status** 201:

``` json
{
    "is_valid": true
}
```

# 期刊

## 获取最新一期

**URL**:

``` http
GET      /classic/latest
```

**Response** 200:

``` json
{
        "content": "人生不能像做菜，把所有的料准备好才下锅",
        "fav_nums": 0,
        "id": 1,
        "image": "http://127.0.0.1:5000/images/movie.7.png",
        "index": 7,
        "like_status": 0,
        "pubdate": "2018-06-22",
        "title": "李安<<饮食男女>>",
        "type": 100
}
```

**Response_description**:

* content：期刊内容
* fav_nums: 点赞次数
* image: 图片
* index: 期号
* like_status: 是否点赞
* pubdate: 发布日期
* title: 期刊题目
* type: 期刊类型, 这里的类型分为:100 电影 200 音乐 300 句子
* id: 期刊在数据中序号，供点赞使用

返回期刊的详细信息

## 获取当前一期的下一期

**URL**:

``` http
GET      /classic/<int:index>/next
```

**Parameters**:

* index：期号, 必填, 必须是正整数

**Response** 200:

``` json
{
        "content": "这个夏天又是一个毕业季",
        "fav_nums": 0,
        "id": 2,
        "image": "http://bl.yushu.im/images/sentence.2.png",
        "index": 2,
        "like_status": 0,
        "pubdate": "2018-06-22",
        "title": "未名",
        "type": 300
}
```

## 获取某一期详细信息

**URL**:

``` http
GET      /classic/<int:type>/<int:id>
```

**Parameters**:

* id：id号, 必填, 必须是正整数
* type: 类型号，必填，为100, 200, 300的一种，分别表示电影，音乐，句子

**Response** 200:

``` json
{
        "content": "这个夏天又是一个毕业季",
        "fav_nums": 0,
        "id": 2,
        "image": "http://bl.yushu.im/images/sentence.2.png",
        "index": 2,
        "like_status": 0,
        "pubdate": "2018-06-22",
        "title": "未名",
        "type": 300
}
```

## 获取当前一期的上一期

**URL**:

``` http
GET     /classic/<int:index>/previous
```

**Parameters**:

* index: 期号, 必填, 必须是正整数

**Response** 200

``` json
{
        "content": "你陪我步入蝉夏 越过城市喧嚣",
        "fav_nums": 0,
        "image": "http://bl.yushu.im/images/music.1.png",
        "id": 3,
        "index": 1,
        "like_status": 0,
        "pubdate": "2018-06-22",
        "title": "纸短情长",
        "type": 200,
        "url": "http://music.163.com/song/media/outer/url?id=557581284.mp3"
}
```

## 获取点赞信息

**URL**:

``` http
GET     classic/<int:type>/<int:id>/favor
```

**Parameters**:

* type: 必填, 点赞类型
* id: 必填, 点赞对象的id号

**Response** 200

``` json
{
        "fav_nums": 1,
        "id": 1,
        "like_status": 1
}
```

## 获取我喜欢的期刊

**URL**:

``` http
GET    /classic/favor
```

**Parameters**:

* start 开始的页数, 默认为1
* count: 每页的内容条数, 不超过20, 默认为20

**Response** 200

``` json
[
            {
                    "content": "人生不能像做菜，把所有的料准备好才下锅",
                    "fav_nums": 1,
                    "id": 1,
                    "image": "http://bl.yushu.im/images/movie.7.png",
                    "pubdate": "2018-06-22",
                    "title": "李安<<饮食男女>>",
                    "type": 100
            }
            {
                    "content": "你陪我步入蝉夏 越过城市喧嚣",
                    "fav_nums": 0,
                    "id": 3,
                    "image": "http://bl.yushu.im/images/music.1.png",
                    "index": 1,
                    "like_status": 0,
                    "pubdate": "2018-06-22",
                    "title": "纸短情长",
                    "type": 200,
                    "url": "http://music.163.com/song/media/outer/url?id=557581284.mp3"
            }
    ]
```

**Response_description**:

返回喜欢期刊的列表

# 书籍

## 获取热门书籍(概要)

**URL**:

``` http
GET      /book/hot_list
```

**Response** 200:

``` json
[
        {
                "author": "陈儒",
                "fav_nums": 0,
                "id": 18,
                "image": "https://img3.doubanio.com/lpic/s3435132.jpg",
                "like_status": 0,
                "title": "Python源码剖析"
        },
        {
                "author": "MarkPilgrim",
                "fav_nums": 0,
                "id": 58,
                "image": "https://img3.doubanio.com/lpic/s29631790.jpg",
                "like_status": 0,
                "title": "Dive Into Python"
        },
        {
                "author": "MarkPilgrim",
                "fav_nums": 0,
                "id": 65,
                "image": "https://img3.doubanio.com/lpic/s4059293.jpg",
                "like_status": 0,
                "title": "Dive Into Python 3"
        },
]
```

**response_description**:

* fav_nums: 点赞数
* id: 书籍id
* like_status: 是否点赞
* author: 作者
* title: 书籍题目
* image: 书籍图片

返回一个列表，包含所有热门书籍的概要信息

## 获取书籍短评

**URL**:

``` http
GET      /book/<int:book_id>/short_comment
```

**Parameters**:

* book_id：书籍的id, 必填, 必须为正整数

**Response** 200:

``` json
{
            "comment":
            [
                    {
                            "content": "i hate6!",
                            "nums": 1
                    }
            ],
            "book_id": 1
}
```

**Response_description**:

* comment: 一个评论的列表, 包含用户对书籍的评论及对应数量的字典
* book_id: 书籍id

## 获取喜欢书籍数量

**URL**:

``` http
GET      /book/favor/count
```

**Response** 200:

``` jspn
{
            "count": 10,
}
```

**Response_description**:

* count: 返回我喜欢的书籍数量

## 获取书籍点赞情况

**URL**:

``` http
GET      /book/<int:book_id>/favor
```

**Parameters**:

* book_id：书籍的id, 必填, 必须为正整数

**Response** 200:

``` json
{
            "fav_nums": 0,
            "id": 1,
            "like_status": 0
}
```

## 新增短评

**URL**:

``` http
POST      /book/add/short_comment
```

**Parameters**:

* book_id：书籍id
* content：评论内容, 我们可允许的评论内容范围为12字以内

**Response** 201:

``` json
{
        "error_code": 0,
        "msg": "ok",
        "request": "POST  /book/add_short_comment"
}
```

## 获取热搜关键字

**URL**:

``` http
GET  /book/hot_keyword
```

**Response** 200:

``` json
{
            "hot":
            [
                    "Fluent Python",
                    "Python",
                    "哈利·波特",
                    "东野圭吾",
                    "韩寒",
                    "王小波",
                    "金庸"
            ]
    }
```

## 书籍搜索

**URL**:

``` http
GET  /book/search
```

**Parameters**:

* start: 开始记录数，默认为0
* count: 记录条数，默认为20, 超过依然按照20条计算
* summary: 返回完整或简介, 默认为0, 0为完整内容, 1为简介
* q: 搜索内容, 比如你想搜索python相关书籍, 则输入python

**Response** 200:

当summary=0, 返回详细数据:

``` json
{
        "books": [
                {
                        "author": [
                                "Luciano Ramalho"
                        ],
                        "binding": "Paperback",
                        "category": "编程",
                        "id": 195,
                        "image": "https://img3.doubanio.com/lpic/s27935775.jpg",
                        "images": {
                                "large": "https://img3.doubanio.com/lpic/s27935775.jpg"
                        },
                        "isbn": "9781491946008",
                        "pages": "768",
                        "price": "USD 39.99",
                        "pubdate": "2015-8-20",
                        "publisher": "O'Reilly Media",
                        "subtitle": "",
                        "summary": "Learn how to write idiomatic, effective Python code by leveraging its best features...
                },
                {
                        "author": [
                                "【英】大卫•加里夫",
                                "David Gariff"
                        ],
                        "binding": "精装",
                        "category": "艺术史",
                        "id": 44307,
                        "image": "https://img3.doubanio.com/lpic/s27145681.jpg",
                        "images": {
                                "large": "https://img3.doubanio.com/lpic/s27145681.jpg"
                        },
                        "isbn": "9787511719164",
                        "pages": "192",
                        "price": "98.00元",
                        "pubdate": "2014-1",
                        "publisher": "中央编译出版社",
                        "subtitle": "名画密码与大师传承",
                        "summary": "《艺术谱系》一书以独特的视角构建出一部通俗易懂的西方艺术发展史...
                        "translator": [
                                "徐效军"
                        ]
                }
        ],
        "count": 2,
        "start": 0,
        "total": 2
}
```

当summary=1, 返回概要数据:

``` json
{
        "books": [
                {
                        "author": [
                                "Luciano Ramalho"
                        ],
                        "id": 195,
                        "image": "https://img3.doubanio.com/lpic/s27935775.jpg",
                        "isbn": "9781491946008",
                        "price": "USD 39.99",
                        "title": "Fluent Python"
                },
                {
                        "author": [
                                "【英】大卫•加里夫",
                                "David Gariff"
                        ],
                        "id": 44307,
                        "image": "https://img3.doubanio.com/lpic/s27145681.jpg",
                        "isbn": "9787511719164",
                        "price": "98.00元",
                        "title": "艺术谱系"
                }
        ],
        "count": 2,
        "start": 0,
        "total": 2
}
```

**Response_description**: 返回包含书籍详细内容或简介内容的列表

## 获取书籍详细信息

**URL**:

``` http
GET  /book/<id>/detail
```

**Parameters**:

* id: 书籍的id号

**Response** 200:

``` json
{
        "author": [
                "Wolfgang Mauerer"
        ],
        "binding": "平装",
        "category": "算法",
        "id": 6980,
        "image": "https://img1.doubanio.com/lpic/s4368169.jpg",
        "images": {
                "large": "https://img1.doubanio.com/lpic/s4368169.jpg"
        },
        "isbn": "9787115227430",
        "pages": "1038",
        "price": "149.00元",
        "pubdate": "201005",
        "publisher": "人民邮电出版社",
        "subtitle": "全球开源社区集体智慧结晶，领略Linux内核的绝美风光",
        "summary": "众所周知，Linux操作系统的源代码复杂、文档少，对程序员的要求高，要想看懂这些代码并不是一件容易事...",
        "title": "深入Linux内核架构",
        "translator": [
                "郭旭"
        ]
}
```

# 点赞

## 进行点赞

**URL**:

``` http
POST      /like
```

**Parameters**:

* art_id: 点赞对象, 例如你想对电影进行点赞，那这个参数就是电影的id号
* type：点赞类型分为四种：100 电影 200 音乐 300 句子 400 书籍

**Response Status** 201:

``` json
{
        "error_code": 0,
        "msg": "ok",
        "request": "POST  /like/add"
}
```

## 取消点赞

**URL**:

``` http
POST     /like/cancel
```

**Parameters**:

> - art_id: 点赞对象id
> - type：点赞类型

**Response Status** 201:

``` json
{
        "error_code": 0,
        "msg": "ok",
        "request": "POST  /like/cancel"
}
```

# 数据库表

![image-20201103143928099](./static/images/database.png)

# 运行node后端服务

``` shell
# 安装依赖
npm i 
# 修改config 里面的 mysql 相关database配置

# 运行服务
npm run start
# 建议结合vscode 可断点调试
```
