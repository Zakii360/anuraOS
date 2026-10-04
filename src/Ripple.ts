const rippleSelector = [
	"button",
	"a[href]",
	'[role="button"]',
	"input[type=button]",
	"input[type=submit]",
	"input[type=reset]",
	"input[type=image]",
	".matter-button-contained",
	".matter-button-outlined",
	".matter-button-text",
	".custom-menu-item",
	".settings-button",
	".aboutapp-link-button",
	".taskbar-button",
	".app",
	".windowButton",
	".nbutton",
	".symbolButton",
	".clearButton",
].join(",");

function showRipple(target: HTMLElement, event: PointerEvent) {
	if (target.matches(":disabled, [aria-disabled='true']")) return;
	if (target.dataset.ripple === "false") return;

	const rect = target.getBoundingClientRect();
	if (!rect.width || !rect.height) return;

	const layer = document.createElement("span");
	layer.className = "anura-ripple-layer";
	layer.style.left = `${rect.left}px`;
	layer.style.top = `${rect.top}px`;
	layer.style.width = `${rect.width}px`;
	layer.style.height = `${rect.height}px`;
	layer.style.borderRadius = getComputedStyle(target).borderRadius;
	layer.style.color = getComputedStyle(target).color;

	const ripple = document.createElement("span");
	ripple.className = "anura-ripple";
	const size = Math.hypot(rect.width, rect.height) * 1.75;
	ripple.style.width = `${size}px`;
	ripple.style.height = `${size}px`;
	ripple.style.left = `${event.clientX - rect.left}px`;
	ripple.style.top = `${event.clientY - rect.top}px`;

	layer.appendChild(ripple);
	document.body.appendChild(layer);

	requestAnimationFrame(() => ripple.classList.add("active"));
	setTimeout(() => layer.remove(), 650);
}

document.addEventListener(
	"pointerdown",
	(event) => {
		if (event.button !== 0) return;
		if (!(event.target instanceof Element)) return;

		const target = event.target.closest<HTMLElement>(rippleSelector);
		if (!target) return;

		showRipple(target, event);
	},
	true,
);
