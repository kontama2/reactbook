import React from 'react';

var Excel = React.createClass({
  displayName: 'Excel',

  propTypes: {
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    ),
  },

  getInitialState: function () {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // {row: Row number, cell: Column number}
      search: false,
    };
  },

  _sort: function (e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var descending = this.state.sortby == column && !this.state.descending;

    data.sort(function (a, b) {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    })
    this._logSetState({
      data: data,
      sortby: column,
      descending: descending,
    })
  },

  _preSearchData: null,

  _log: [],

  _logSetState: function (newState) {
    // ステートのクローンを作成して記録します
    this._log.push(JSON.parse(JSON.stringify(
      this._log.length === 0 ? this.state : newState
    )));
    this.setState(newState);
  },

  _replay: function () {
    if (this._log.length === 0) {
      console.warn('State is not recorded!');
      return;
    }
    var idx = -1;
    var interval = setInterval(function () {
      idx++;
      if (idx === this._log.length - 1) { // End of log
        clearInterval(interval);
      }
      this.setState(this._log[idx]);
    }.bind(this), 1000);
  },

  componentDidMount: function () {
    document.onkeydown = function (e) {
      // Alt または Option + Shift + R. R は Replay の略です。
      if (e.altKey && e.shiftKey && e.keyCode == 82) {
        this._replay();
      }
    }.bind(this);
  },



  _showEditor: function (e) {
    this._logSetState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    });
  },

  _save: function (e) {
    e.preventDefault();
    var input = e.target.firstChild;

    var data = this.state.data.slice();

    data[this.state.edit.row][this.state.edit.cell] = input.value;

    this._logSetState(
      {
        edit: null,
        data: data,
      }
    )
  },

  _renderSearch: function () {
    if (!this.state.search) {
      return null;
    }
    return (
      React.DOM.tr(
        { onChange: this._search },
        this.props.headers.map(function (_ignore, idx) {
          return React.DOM.td(
            { key: idx },
            React.DOM.input({
              type: 'text',
              'data-idx': idx
            })
          );
        })
      )
    )
  },

  _renderToolbar: function () {
    return React.DOM.div(
      { className: 'toolbar' },
      React.DOM.button({
        onClick: this._toggleSearch
      }, '検索'),
      React.DOM.a({
        onClick: this._download.bind(this, 'json'),
        href: 'data.json',
      }, 'JSON で保存'),
      React.DOM.a({
        onClick: this._download.bind(this, 'csv'),
        href: 'data.csv',
      }, 'CSV で保存')
    )
  },

  _download: function (format, ev) {
    var contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce(function (result, row) {
        return result
          + row.reduce(function (rowresult, cell, idx) {
            return rowresult
              + '"'
              + cell.replace(/"/g, '""')
              + '"'
              + (idx < row.length - 1 ? ',' : '');
          }, '')
          + "\n";
      }, '');

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  },

  _renderTable: function () {
    return React.DOM.table(null,
      React.DOM.thead({ onClick: this._sort },
        React.DOM.tr(null,
          this.props.headers.map(function (title, idx) {
            if (this.state.sortby === idx) {
              title += this.state.descending ? '\u2191' : '\u2193'
            }
            return React.DOM.th({ key: idx }, title);
          }, this)
        )
      ),
      React.DOM.tbody({ onDoubleClick: this._showEditor },
        this._renderSearch(),
        this.state.data.map(function (row, rowidx) {
          return (
            React.DOM.tr({ key: rowidx },
              row.map(function (cell, idx) {
                var content = cell;

                // TODO - idx と rowidx が edit プロパティの値と一致する場合、content を
                // 入力フィールドに置き換えます。そうでない場合は、文字列をそのまま
                // 表示します

                var edit = this.state.edit;
                if (edit && edit.row === rowidx && edit.cell === idx) {
                  content = React.DOM.form({ onSubmit: this._save },
                    React.DOM.input({
                      type: 'text',
                      defaultValue: content,
                    }))
                }

                return React.DOM.td({
                  key: idx,
                  'data-row': rowidx,
                }, content);
              }, this)
            )
          );
        }, this)
      )
    )
  },

  _toggleSearch: function () {
    if (this.state.search) {
      this._logSetState(
        {
          data: this._preSearchData,
          search: false
        },
      )
    } else {
      this._preSearchData = this.state.data;
      this._logSetState({ search: true, })
    }
  },

  _search: function (e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this._logSetState({ data: this._preSearchData });
      return;
    }
    var idx = e.target.dataset.idx;
    var searchData = this._preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this._logSetState({ data: searchData });
  },

  render: function () {
    return (
      <div className="Excel">
        {this._renderToolbar()}
        {this._renderTable()}
      </div>
    );
  },

});

export default Excel
