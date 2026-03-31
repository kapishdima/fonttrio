interface Props {
	pairingName: string;
	existingCount: number;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmDialog({
	pairingName,
	existingCount,
	onConfirm,
	onCancel,
}: Props) {
	return (
		<div className="dialog-backdrop">
			<button
				type="button"
				className="dialog-backdrop__overlay"
				onClick={onCancel}
				tabIndex={-1}
				aria-label="Close dialog"
			/>
			<div className="dialog">
				<div className="dialog__title">Replace existing styles?</div>
				<div className="dialog__body">
					{existingCount} Fonttrio typography items already exist in this file.
					They will be replaced with "{pairingName}".
				</div>
				<div className="dialog__actions">
					<button type="button" className="btn-secondary" onClick={onCancel}>
						Cancel
					</button>
					<button type="button" className="btn-primary" onClick={onConfirm}>
						Replace
					</button>
				</div>
			</div>
		</div>
	);
}
