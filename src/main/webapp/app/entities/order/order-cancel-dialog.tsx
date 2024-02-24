import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, closeOrder } from './order.reducer';

export const OrderCancelDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  const updateSuccess = useAppSelector(state => state.order.updateSuccess);

  const handleClose = () => {
    navigate('/order' + location.search);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmCancel = () => {
    dispatch(closeOrder({ id: Number(id), status: 'ANNULE' }));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="OrderCancelDialogHeading">
        Confirmation de annulation
      </ModalHeader>
      <ModalBody id="ecommerceApp.order.delete.question">Êtes-vous certain de vouloir annuler la commande {orderEntity.id} ?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; NON
        </Button>
        <Button id="jhi-confirm-delete-order" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmCancel}>
          <FontAwesomeIcon icon="times" />
          &nbsp; OUI
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderCancelDialog;
