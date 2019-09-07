import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosFlashlight } from 'react-icons/io'

const CardWrapper = ({
  icon,
  title,
  color,
  link,
  children,
  rotate,
  marginTopNone
}) => (
  <div className={`card-wrapper shadow ${color} ${ marginTopNone ? 'mt-0' : '' }`}>
    <div className="wrapper-header d-flex align-items-center">
      {
        !(title === 'spotlight on a user')
        ? <FontAwesomeIcon
            icon={ icon }
            transform={ rotate ? { rotate } : '' }
            className="wrapper-icon mr-3"
          />
        : <IoIosFlashlight className="wrapper-icon-ion mr-2" />

    }
      {
        link
        ? <div><Link to={`/${link}`}> { title } </Link></div>
        :  <div>{ title }</div>
      }
    </div>
    <div className="wrapper-body w-100">
      { children }
    </div>
  </div>
);

CardWrapper.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  // link: PropTypes.string
};

export default CardWrapper;