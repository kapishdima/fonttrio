import DotGrid from "@/components/DotGrid";

export default function Redesign04() {
	return (
		<main className="w-screen overflow-x-hidden bg-black">
			<div className="w-screen h-screen relative p-3">
				<div className="w-full h-full bg-white rounded-4xl">
					<header className="w-full flex justify-center sticky z-10">
						<nav className="w-[50vw] px-8 py-5 rounded-xl bg-black rounded-tr-none rounded-tl-none shadow-xl">
							<a href="/" className="text-white mb-1 text-2xl font-bold">
								Fonttrio
							</a>
						</nav>
					</header>
					<div
						style={{
							width: "100%",
							height: "100vh",
							position: "absolute",
							top: 0,
							left: 0,
							padding: "20px",
						}}
					>
						<DotGrid
							dotSize={2}
							gap={30}
							baseColor="#1c1c1c"
							activeColor="#a1a1a1"
							proximity={200}
							shockRadius={10}
							shockStrength={10}
							resistance={100}
							returnDuration={2.9}
						/>
					</div>

					<div className="size-full flex flex-col items-center justify-center relative z-10 pb-[10vh]">
						<h1 className="font-[Outfit] text-[5vw] font-bold leading-15 ">
							Three fonts
						</h1>
						<h2 className="font-[Manrope] text-[3vw] font-medium">
							One command
						</h2>
					</div>
				</div>
			</div>
		</main>
	);
}
