import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayStyled, ModalStyled } from './Modal.styled';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <OverlayStyled onClick={this.handleBackDropClick}>
        <ModalStyled>
          <img src={src} alt={alt} />
        </ModalStyled>
      </OverlayStyled>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  alt: propTypes.string,
  onClose: propTypes.func,
  src: propTypes.string,
};
