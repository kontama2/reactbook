import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue
    }
  }

  getValue() { // すべての入力ウィジェットで提供されます
    return this.state.rating;
  }

  setTemp(rating) { // マウスオーバー時に発生します
    this.setState({ tmpRating: rating });
  }

  setRating(rating) { // クリック時に発生します
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  reset() { // マウスアウト時に、実際の値に表示を戻します
    this.setTemp(this.state.rating);
  }

  componentWillReceiveProps(nextProps) { // 外部からの変更に応答します
    this.setRating(nextProps.defaultValue);
  }

  render() {
    const starts = [];
    for (let i = 1; i <= this.props.max; i++) {
      starts.push(
        <span
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          onClick={!this.props.readonly && this.setRating.bind(this, i)}
          onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
        >
        &#9734;
        </span>
      );
    }
    return (
      <div
        className={classNames({
          'Rating': true,
          'RatingReadonly': this.props.readonly,
        })}
        onMouseOut={this.reset.bind(this)}
        >
        {starts}
        {this.props.readonly || !this.props.id
          ? null
          : <input
            type="hidden"
            id={this.props.id}
            value={this.state.rating} />
        }
        </div>
    );
    
  }
}

Rating.PropTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.numbr,
}

Rating.defaultProps = {
  defaultValue: 0,
  max: 5
}

export default Rating
