import React from 'react';
import { ListView } from 'antd-mobile';
import defalutImg from './img/default.jpg';
import scoreStar from './img/select_star.png';
import greyScoreStar from './img/default_star.png';
import halfStar from './img/half_star.png';

// import myStyle from './styles/bookList.less';

import myStyle from './styles/bookList.less';

export interface BookInfo {
  id: string; //id
  imgUrl: string; // 图片url
  name: string; //名称
  author: string; //作者
  type: string; //类型
  score: string; //评分等级
  markPeople: number; //评价人数
  desc: string; //简单描述
}

export interface BookListPro {
  listData: BookInfo[];
  height: number;
  selecScoreStar: string;
  defaultSoceStar: string;
  halfScoeStar: string;
  getPageData: () => BookInfo[];
  cellClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  listImgStyle: React.CSSProperties; //图片样式
  listNameStyle: React.CSSProperties; //名称样式
  listAuthorStyle: React.CSSProperties; //作者的样式
  listMarkStyle: React.CSSProperties; //评论的样式
  listScoreStyle: React.CSSProperties; //评分字体的样式
  listTypeStyle: React.CSSProperties; //图书类型的样式
  listDesStyle: React.CSSProperties; //图书描述的样式
  loadingText: string; //加载过程中提示的语句
  loadingFishTex: string; //数据未加载完成，当前页加载完成的提示
  noDataTip: string; //数据加载完成底部提示
}
export interface PageState {
  dataSource: any;
  isLoading: boolean;
  windowWidth: number;
  width: number;
  tempList: BookInfo[]; //页面列表的所有数据
  hasMore: boolean;
  stateLoadingText: string;
  stateLoadingFishTex: string;
  stateNoDataTip: string;
}
class BookList extends React.Component<BookListPro, PageState> {
  state: PageState = {
    dataSource: null,
    isLoading: false,
    windowWidth: window.outerWidth,
    width: document.documentElement.clientWidth,
    tempList: this.props.listData,
    hasMore: true,
    stateLoadingText: this.props.loadingText || '加载...',
    stateLoadingFishTex: this.props.loadingFishTex || '加载完成',
    stateNoDataTip: this.props.noDataTip || '我是有底线的~',
  };
  constructor(props: any) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1: any, r2: any) => r1 !== r2,
    });
    this.state.dataSource = ds.cloneWithRows(this.props.listData);
  }

  getScoreHtml = (param: any) => {
    const score = parseFloat(param.score);
    const quo = parseInt(score / 2);
    const residue = score % 2;
    let scoreHtml = [];
    for (let i = 0; i < quo; i++) {
      scoreHtml.push(
        <img alt='' src={this.props.selecScoreStar || scoreStar} className={myStyle.start} />,
      );
    }
    if (residue > 0.5) {
      scoreHtml.push(<img alt='' src={this.props.halfScoeStar || halfStar} className={myStyle.start} />);
    } else {
      scoreHtml.push(
        <img alt='' src={this.props.defaultSoceStar || greyScoreStar} className={myStyle.start} />,
      );
    }
    for (var j = 0; j < 4 - quo; j++) {
      scoreHtml.push(
        <img alt='' src={this.props.defaultSoceStar || greyScoreStar} className={myStyle.start} />,
      );
    }
    return scoreHtml;
  };
  /**
   * 上滑事件
   */
  onEndReached = () => {
    this.setState({ isLoading: true });
    const data = this.props.getPageData();
    setTimeout(() => {
      const ds = new ListView.DataSource({
        rowHasChanged: (row1: any, row2: any) => row1 !== row2,
      });
      const newPageList = this.state.tempList.concat(data);
      this.setState({
        dataSource: ds.cloneWithRows(newPageList), //data.result为模拟的数据或服务端得到的数据
      });
      const tempHasMore = data.length > 0;
      this.setState({
        isLoading: false,
        hasMore: tempHasMore,
        tempList: newPageList,
      });
    }, 1000);

    console.log('data' + JSON.stringify(data));
  };
  render() {
    //设置显示图书名称的宽度，如果有类型的标识，则名称的宽度减少
    let labelWidth = 0;
    let index = 0;

    const row = () => {
      if (index > this.state.tempList.length - 1) {
        index = 0;
      }
      index += 1;
      const rowDataObj = this.state.tempList[index];
      if (rowDataObj.type) {
        labelWidth = 0.5;
      } else {
        labelWidth = 0.56;
      }
      const scoreHtml = this.getScoreHtml(rowDataObj);

      return (
        <div className={myStyle.bookListCell} id={rowDataObj.id} onClick={this.props.cellClick}>
          <div className={myStyle.bookListCellLeft}>
            <img alt='' src={rowDataObj.imgUrl || defalutImg} style={this.props.listImgStyle} />
          </div>
          <div className={myStyle.bookListCellRight}>
            <div className={myStyle.bookListCellRightName} style={this.props.listNameStyle}>
              <label style={{ width: this.state.width * labelWidth }}>{rowDataObj.name}</label>
            </div>
            <div>
              <span
                className={rowDataObj.type ? myStyle.bookListCellRightType : myStyle.hideEle}
                style={this.props.listScoreStyle}
              >
                {rowDataObj.type}
              </span>
            </div>
            <div className={myStyle.grayFont} style={this.props.listAuthorStyle}>
              {rowDataObj.author} 著
            </div>
            <div className={myStyle.grayFont} style={{ marginTop: 25 + 'px' }}>
              {scoreHtml}
              <span className={myStyle.score} style={this.props.listScoreStyle}>
                {rowDataObj.score}
              </span>
              <span className={myStyle.markPeople} style={this.props.listMarkStyle}>
                {' '}
                | {rowDataObj.markPeople || 0} 人评价
              </span>
            </div>
            <div className={myStyle.bookListCellRightDes} style={this.props.listDesStyle}>
              {rowDataObj.desc}
            </div>
          </div>
        </div>
      );
    };
    const listHeight = this.props.height || document.documentElement.clientHeight * 0.8;
    return (
      <div className={myStyle.bookListContent}>
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? this.state.stateLoadingText : this.state.hasMore ? this.state.stateLoadingFishTex : this.state.stateNoDataTip}
            </div>
          )}
          renderRow={row}
          style={{
            height: listHeight,
            overflow: 'auto',
          }}
          pageSize={2}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default BookList;
