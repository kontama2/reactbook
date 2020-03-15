'use script'

import Actions from './components/Actions';
import Form from './components/Form';
import FormInput from './components/FormInput';
import Rating from './components/Rating';
import Suggest from './components/Suggest';
import Button from './components/Button';
import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={{ padding: '20px' }}>
    <h1>コンポーネント一覧</h1>

    <h2>Logo</h2>
    <div style={{ display: 'inline-block', background: 'purple' }}>
      <Logo />
    </div>
    <h2>Button</h2>
    <div>onClick が指定された Button: <Button onClick={() => alert('クリックされました')}>クリック</Button>
    </div>
    <div>href が指定された Button: <Button href="http://reactjs.com">フォローする</Button></div>
    <div>クラス名が指定された Button: <Button className="custom">何もしません</Button></div>
    <h2>Suggest</h2>
    <div><Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
      <h2>Rating</h2>
      <div>初期値なし: <Rating /></div>
      <div>初期値4: <Rating defaultValue={4} /></div>
      <div>最大値: <Rating max={11} /></div>
      <div>読み取り専用: <Rating readonly={true} defaultValue={3} /></div>
    </div>
    <h2>FormInput</h2>
    <table>
      <tbody>
        <tr>
          <td>単純な入力フィールド</td>
          <td><FormInput /></td>
        </tr>
        <tr>
          <td>デフォルト値</td>
          <td><FormInput defaultValue="デフォルトです" /></td>
        </tr>
        <tr>
          <td>年の入力</td>
          <td><FormInput type="year" /></td>
        </tr>
        <tr>
          <td>評価</td>
          <td><FormInput type="rating" defaultValue={4} /></td>
        </tr>
        <tr>
          <td>入力情報の提示</td>
          <td>
            <FormInput
              type="suggest"
              options={['red', 'green', 'blue']}
              defaultValue="green" />
          </td>
        </tr>
        <tr>
          <td>単純なテキストエリア</td>
          <td><FormInput type="text" /></td>
        </tr>
      </tbody>
    </table>
    <h2>Form</h2>
    <div><Form
      fields={[
        { label: '評価', type: 'rating', id: 'rateme' },
        { label: 'あいさつ', id: 'freetext' },
      ]}
      initialData={{ rateme: 4, freetext: 'こんにちは' }} />
    </div>
    <h2>操作</h2>
    <div><Actions onAction={type => alert(type)} /></div>
  </div>,
  document.getElementById('pad')
)
