import { useState } from "react";
import type { FontRole, StyleMapping, TextStyleInfo } from "../../types";

interface Props {
	styles: TextStyleInfo[];
	existingMapping: StyleMapping | null;
	onSave: (mapping: StyleMapping) => void;
	onSkip?: () => void;
	onBack?: () => void;
	isSettings?: boolean;
}

const ROLES: { key: FontRole; label: string; description: string }[] = [
	{ key: "heading", label: "Heading", description: "H1, H2, H3..." },
	{ key: "body", label: "Body", description: "Paragraphs, body text" },
];

export function SetupScreen({
	styles,
	existingMapping,
	onSave,
	onSkip,
	onBack,
	isSettings,
}: Props) {
	const [mapping, setMapping] = useState<StyleMapping>(
		() => existingMapping || {},
	);

	const toggleStyle = (styleId: string, role: FontRole) => {
		setMapping((prev) => {
			const next = { ...prev };
			if (next[styleId] === role) {
				delete next[styleId];
			} else {
				next[styleId] = role;
			}
			return next;
		});
	};

	const getStylesForRole = (role: FontRole) =>
		styles.filter((s) => mapping[s.id] === role);

	const getUnmappedStyles = () => styles.filter((s) => !mapping[s.id]);

	const hasMapping = Object.keys(mapping).length > 0;

	return (
		<div className="setup">
			<div className="setup__header">
				{onBack && (
					<button
						type="button"
						className="detail__back"
						onClick={onBack}
						style={{ marginBottom: 8 }}
					>
						← Back
					</button>
				)}
				<div className="setup__title">
					{isSettings ? "Style Mapping" : "Map your text styles"}
				</div>
				<div className="setup__subtitle">
					Select which text styles should use heading or body fonts
				</div>
			</div>

			<div className="setup__body">
				{ROLES.map((role) => {
					const assigned = getStylesForRole(role.key);
					return (
						<div key={role.key} className="setup__role">
							<div className="setup__role-header">
								<span className="setup__role-label">{role.label}</span>
								<span className="setup__role-desc">{role.description}</span>
							</div>
							{assigned.length > 0 && (
								<div className="setup__assigned">
									{assigned.map((s) => (
										<button
											type="button"
											key={s.id}
											className="setup__style-chip setup__style-chip--active"
											onClick={() => toggleStyle(s.id, role.key)}
										>
											{s.name} <span className="setup__chip-x">×</span>
										</button>
									))}
								</div>
							)}
						</div>
					);
				})}

				<div className="setup__divider" />

				<div className="setup__unassigned-label">Available styles</div>
				<div className="setup__unassigned">
					{getUnmappedStyles().length === 0 ? (
						<div className="setup__empty">All styles mapped</div>
					) : (
						getUnmappedStyles().map((s) => (
							<div key={s.id} className="setup__style-row">
								<span className="setup__style-name">{s.name}</span>
								<div className="setup__style-actions">
									{ROLES.map((role) => (
										<button
											type="button"
											key={role.key}
											className="setup__role-btn"
											onClick={() => toggleStyle(s.id, role.key)}
											title={`Assign to ${role.label}`}
										>
											{role.label}
										</button>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</div>

			<div className="setup__footer">
				{onSkip && !isSettings && (
					<button type="button" className="btn-secondary" onClick={onSkip}>
						Skip
					</button>
				)}
				<button
					type="button"
					className="btn-apply"
					onClick={() => onSave(mapping)}
					disabled={!hasMapping}
					style={{ opacity: hasMapping ? 1 : 0.5 }}
				>
					{isSettings ? "Save" : "Continue"}
				</button>
			</div>
		</div>
	);
}
