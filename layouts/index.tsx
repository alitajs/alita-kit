import React from 'react';
import AlitaLayout from '@alitajs/alita-layout';

const BasicLayout: React.FC = props => {
  const { children } = props;
  const titleList = [
    {
      pagePath: '/',
      title: '首页',
    },
    {
      pagePath: '/demo',
      title: 'Demo',
    },
  ];
  const layoutProps = {
    children,
    titleList,
  };
  return <AlitaLayout {...layoutProps} />;
};

export default BasicLayout;
