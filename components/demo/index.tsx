import React, { FC, HTMLAttributes } from 'react';

export interface DemoProps extends HTMLAttributes<HTMLDivElement> {
  demoPrefixCls?: string;
  text?: string;
}

const Demo: FC<DemoProps> = ({ children, demoPrefixCls = 'alita-demo', text, ...restProps }) => (
  <div {...restProps} className={`${demoPrefixCls}-wrap ${restProps.className}`}>
    <div className={demoPrefixCls}>{text}</div>
    {children}
  </div>
);

export default Demo;
