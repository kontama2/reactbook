'use script'

import Button from './components/Button';
import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={ {padding: '20px'} }>
    <h1>コンポーネント一覧</h1>

    <h2>Logo</h2>
    <div style={ {display: 'inline-block', background: 'purple'} }>
      <Logo />
    </div>
    <h2>Button</h2>
    <div>onClick が指定された Button: <Button onClick={() => alert('クリックされました') }>クリック</Button>
    </div>
    <div>href が指定された Button: <Button href="http://reactjs.com">フォローする</Button></div>
    <div>クラス名が指定された Button: <Button className="custom">何もしません</Button></div>
  </div>,
  document.getElementById('pad')
)
