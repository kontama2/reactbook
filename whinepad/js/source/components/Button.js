import classNames from 'classnames';
import React, {PropTypes} from 'react';

// function Button(props) {
//   const cssclasses = classNames('Button', props.className);
//   return props.href
//     ? <a {...props} className={cssclasses} />
//     : <button {...props } className={cssclasses} />
// }

// const Button = props => {
//   const cssclasses = classNames('Button', props.className);
//   return props.href
//     ? <a {...props} className={cssclasses} />
//     : <button {...props } className={cssclasses} />
// }

const Button = props => 
  props.href
    ? <a {...props} className={classNames('Button', props.className)}/>
    : <button {...props } className={classNames('Button', props.className)} />

Button.propTypes = {
  href: PropTypes.string,
};

export default Button

// var propTypes = React.PropTypes;

// var Button = React.createClasses({
//   propTypes: {
//     href: PropTypes.string
//   },
//   render: function() {
//     /* 描画 */
//   },
// })

// import React, {Component, PropTypes} from 'react';

// class Button extends Components {
//   render() {
//     /* 描画 */
//   }
// }
// Button.propTypes = {
//   href: PropTypes.string,
// }

// import React, {Component, PropTypes} from 'react';

// const Button = props => {
//   /* 描画 */
// };

// Button.propTypes = {
//   href: PropTypes.string,
// };
