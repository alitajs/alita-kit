import React, { FC } from 'react';
import BookList from '../../components/BookList';

/**
 * imgUrl 图片url
    name 名称
    author 作者
    type  类型
    score 评分等级
    markPeople 评价人数
    des 简单描述
 */
const listData = [
  {
    id: '1',
    imgUrl: '',
    name: '小孩',
    author: '大冰',
    // type: '',
    score: '9.0',
    markPeople: 100,
    desc: '走过的路越多，越喜欢宅着。见过的人越多，越喜欢孩子。',
  },
  {
    id: '2',
    imgUrl: '',
    name: '这世界上没有毫无道理的横空出世这世界上没有毫无道理的横空出世',
    author: '冷莹',
    score: '6.3',
    markPeople: 109,
    desc:
      '只有成长，才会给我们安全感。当你还年轻，最艰难的时刻，永远是“当下”，觉得它难是因为你在上坡，只要你怀着希望，永不停歇，强大的意志就会在你的内',
  },
  {
    id: '3',
    imgUrl: '',
    name: '遇见你都是好时光',
    author: '冷莹',
    type: '图书',
    score: '9.4',
    markPeople: 90,
    desc:
      '爱是否能善终是属于命运的事，不管怎样说，相遇总是好的，是我们遇见过的人，让我们今天站在这里，成为现在的模样。人生路上。',
  },
];

//列表高度的大小会影响滚动，所以这里的高度最好根据自己页面的实际情况进行设置
const height = document.documentElement.clientHeight * 0.8;
const selecScoreStar = ''; //选中的星星图标
const defaultSoceStar = ''; //未选择的星星图标
const halfScoeStar = ''; //
const listImgStyle = {
  width: '280px',
}; //图片样式
const listNameStyle = {}; //名称样式
const listAuthorStyle = {}; //作者的样式
const listMarkStyle = {}; //评论的样式
const listTypeStyle = {}; //图书类型的样式
const listDesStyle = {}; //图书描述的样式
const listScoreStyle = {}; //评分字体的样式

/**
 * 上来加载的数据
 */
function getPageData() {
  const random = Math.ceil(Math.random() * 10);
  console.log('random:' + random);
  if (random % 2) {
    return [
      {
        id: '',
        imgUrl: '',
        name: '不念过往，不惧未来',
        author: '---',
        type: '图书',
        score: '9.4',
        markPeople: 90,
        desc:
          '爱是否能善终是属于命运的事，不管怎样说，相遇总是好的，是我们遇见过的人，让我们今天站在这里，成为现在的模样。人生路上。',
      },
    ];
  } else {
    return [];
  }
}
/**
 * 列表点击事件(每行的点击事件)
 */
function cellClick(event) {
  console.log(event.currentTarget.id);
}
const Page: FC = () => (
  <BookList
    listData={listData}
    height={height}
    getPageData={getPageData}
    cellClick={cellClick}
    listDesStyle={listDesStyle}
    listImgStyle={listImgStyle}
  />
);
export default Page;
