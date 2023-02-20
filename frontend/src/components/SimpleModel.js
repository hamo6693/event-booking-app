import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SimpleModel({title,children,onConfirm,onCancel,confirmText,isDisabled}) {

  return (
    <div>
         <Modal show={true} onHide={onCancel} className="custom-modal">
        <Modal.Header closeButton className='custom-modal-header'>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm} disabled={isDisabled}>
            {confirmText}
          </Button>
          <Button className='mx-2' variant="secondary" onClick={onCancel}>
            اغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

