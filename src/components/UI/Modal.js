import classes from './Modal.module.css';

import React from 'react';
import ReactDom from 'react-dom';

const Backdrop = props => {

    return <div className={classes.backdrop} onClick={props.onClose} />

}

const ModalOverlay = props => {

    return <div className={classes.modal}>
        <div>{props.children}</div>
    </div>

}

const portalEle = document.getElementById("overlays");

const Modal = props => {

    return <React.Fragment>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalEle)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEle)}
    </React.Fragment>

}

export default Modal;