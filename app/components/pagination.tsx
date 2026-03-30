"use client";

import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	Pagination as PaginationRoot,
} from "@/components/ui/pagination";
import { serverInteger } from "@/lib/nuqs";

interface PaginationProps {
	totalPages: number;
	scrollToTop?: boolean;
}

export function Pagination({
	totalPages,
	scrollToTop = true,
}: PaginationProps) {
	const [currentPage, setPage] = useQueryState(
		"page",
		serverInteger.withDefault(1),
	);
	const [isPending, startTransition] = useTransition();

	if (totalPages <= 1) return null;

	const page = Math.min(Math.max(1, currentPage), totalPages);

	const goTo = (p: number) => {
		startTransition(async () => {
			await setPage(p);
			if (scrollToTop) {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		});
	};

	const pages: (number | "...")[] = [];

	if (totalPages <= 7) {
		for (let i = 1; i <= totalPages; i++) pages.push(i);
	} else {
		pages.push(1);
		if (page > 3) pages.push("...");
		for (
			let i = Math.max(2, page - 1);
			i <= Math.min(totalPages - 1, page + 1);
			i++
		) {
			pages.push(i);
		}
		if (page < totalPages - 2) pages.push("...");
		pages.push(totalPages);
	}

	return (
		<PaginationRoot className="mt-12">
			<PaginationContent>
				<PaginationItem>
					<Button
						variant="ghost"
						size="sm"
						className="rounded-full font-medium text-xs"
						disabled={page === 1}
						onClick={() => goTo(page - 1)}
					>
						Prev
					</Button>
				</PaginationItem>

				{pages.map((p, i) => (
					<PaginationItem key={p === "..." ? `ellipsis-${i}` : p}>
						{p === "..." ? (
							<PaginationEllipsis />
						) : (
							<Button
								variant={page === p ? "default" : "ghost"}
								size="icon"
								className="h-8 w-8 rounded-full font-medium text-xs tabular-nums"
								onClick={() => goTo(p)}
							>
								{p}
							</Button>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<Button
						variant="ghost"
						size="sm"
						className="rounded-full font-medium text-xs"
						disabled={page === totalPages}
						onClick={() => goTo(page + 1)}
					>
						Next
					</Button>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
}
