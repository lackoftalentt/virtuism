import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void | null;
	onCancel?: () => void | null;
	title: string;
	message: string;
	cancelMessage: string;
	agreeMessage: string;
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	onCancel,
	title,
	message,
	cancelMessage,
	agreeMessage,
}) => {
	if (!isOpen) return null;
	
	const handleContentClick = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose} 
		>
			<div
				className="bg-white rounded-lg p-6 w-[90%] max-w-[400px] shadow-lg"
				onClick={handleContentClick}
			>
				<h2 className="text-lg font-bold">{title}</h2>
				<p className="mt-1">{message}</p>
				<div className="flex justify-end gap-2 mt-6">
					<button
						className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
						onClick={onCancel || onClose}
					>
						{cancelMessage}
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 transition"
						onClick={onConfirm}
					>
						{agreeMessage}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};
