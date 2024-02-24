import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, closeOrder } from './order.reducer';

export const OrderDeliveryDialog = () => {
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

  const confirmDelivery = () => {
    dispatch(closeOrder({ id: Number(id), status: 'LIVRE' }));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="orderDeliveryDialogHeading">
        Confirmation de livraison
      </ModalHeader>
      <ModalBody id="ecommerceApp.order.delivery.question">
        Êtes-vous certain de vouloir marquer cette commande comme Livrée {orderEntity.id} ?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; NON
        </Button>
        <Button id="jhi-confirm-delivery-order" data-cy="entityConfirmDeliveryButton" color="success" onClick={confirmDelivery}>
          <FontAwesomeIcon icon="check" />
          &nbsp; OUI
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderDeliveryDialog;
