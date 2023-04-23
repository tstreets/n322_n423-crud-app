import React from 'react';
import ModalStyles from '../styles/Modal.module.css';

export default function Modal({ children, trigger }) {
	const [isOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal(e) {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	}

	return (
		<>
			<div onClick={openModal} className={ModalStyles.trigger}>
				{trigger}
			</div>
			{isOpen ? (
				<div onClick={closeModal} className={ModalStyles.modal}>
					<button className={ModalStyles.close} onClick={closeModal}>
						X
					</button>
					<div>{children}</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
