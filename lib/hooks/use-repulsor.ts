"use client";

import { type MotionValue, motionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { REPULSOR } from "@/lib/constants";

export interface FontPosition {
	x: number;
	y: number;
}

export interface RepulsorItemStyle {
	x: MotionValue<number>;
	y: MotionValue<number>;
	scale: MotionValue<number>;
	opacity: MotionValue<number>;
}

export interface RepulsorCursor {
	x: MotionValue<number>;
	y: MotionValue<number>;
	active: MotionValue<number>;
}

export interface UseRepulsorReturn {
	items: RepulsorItemStyle[];
	cursor: RepulsorCursor;
}

function createItemStyle(): RepulsorItemStyle {
	return {
		x: motionValue(0),
		y: motionValue(0),
		scale: motionValue(1),
		opacity: motionValue(REPULSOR.baseOpacity),
	};
}

export function useRepulsor(positions: FontPosition[]): UseRepulsorReturn {
	const count = positions.length;

	// advanced-use-latest: ref avoids stale closure in rAF (requestAnimationFrame) callback
	const positionsRef = useRef(positions);
	positionsRef.current = positions;

	// Stable MotionValue instances - resize only when count changes
	const itemsRef = useRef<RepulsorItemStyle[]>([]);
	if (itemsRef.current.length !== count) {
		const prev = itemsRef.current;
		itemsRef.current = Array.from(
			{ length: count },
			(_, i) => prev[i] ?? createItemStyle(),
		);
	}

	const cursorRef = useRef<RepulsorCursor>({
		x: motionValue(-9999),
		y: motionValue(-9999),
		active: motionValue(0),
	});

	useEffect(() => {
		if (!count) return;

		let frameId = 0;
		let pointerX = 0;
		let pointerY = 0;

		const items = itemsRef.current;
		const cursor = cursorRef.current;

		const updateRepulsion = () => {
			frameId = 0;
			const currentPositions = positionsRef.current;

			for (let i = 0; i < items.length; i++) {
				const position = currentPositions[i];
				const style = items[i];
				if (!position || !style) continue;

				const deltaX = position.x - pointerX;
				const deltaY = position.y - pointerY;
				const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;

				if (distance > REPULSOR.radius) {
					style.x.set(0);
					style.y.set(0);
					style.scale.set(1);
					style.opacity.set(REPULSOR.baseOpacity);
					continue;
				}

				const proximity = 1 - distance / REPULSOR.radius;
				const eased = 1 - (1 - proximity) ** 3;

				style.x.set((deltaX / distance) * eased * REPULSOR.maxRepulse);
				style.y.set((deltaY / distance) * eased * REPULSOR.maxRepulse);
				style.scale.set(1 + eased * (REPULSOR.maxScale - 1));
				style.opacity.set(
					REPULSOR.baseOpacity +
						eased * (REPULSOR.maxOpacity - REPULSOR.baseOpacity),
				);
			}
		};

		const handlePointerMove = (event: PointerEvent) => {
			pointerX = event.x;
			pointerY = event.y;
			cursor.x.set(event.x);
			cursor.y.set(event.y);
			cursor.active.set(1);
			if (!frameId) frameId = requestAnimationFrame(updateRepulsion);
		};

		const handlePointerLeave = () => {
			cursor.active.set(0);
			for (const style of items) {
				style.x.set(0);
				style.y.set(0);
				style.scale.set(1);
				style.opacity.set(REPULSOR.baseOpacity);
			}
		};

		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		document.documentElement.addEventListener(
			"pointerleave",
			handlePointerLeave,
		);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			document.documentElement.removeEventListener(
				"pointerleave",
				handlePointerLeave,
			);
			if (frameId) cancelAnimationFrame(frameId);
		};
	}, [count]);

	return { items: itemsRef.current, cursor: cursorRef.current };
}
