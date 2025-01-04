const InteractivesList = (() => {
	// Initialize all interactive items
	function initialize() {
		document.addEventListener("DOMContentLoaded", () => {
			const interactives = document.querySelectorAll(".interactiveslist-item");

			interactives.forEach((item) => {
				const mirrorsPanel = item.querySelector(
					".interactiveslist-item-mirrors"
				);
				const content = item.querySelector(".interactiveslist-item-content");

				if (!mirrorsPanel) {
					const redirectUrl = item.getAttribute("data-href");
					content.addEventListener("click", () => {
						window.location.href = redirectUrl;
					});
				} else {
					initializeClickListener(item, mirrorsPanel, content);
				}
			});
		});
	}

	// Set up click listeners for items with mirrors
	function initializeClickListener(item, mirrorsPanel, content) {
		content.addEventListener("click", (event) => {
			event.preventDefault();
			closeAllPanelsExcept(item);
			toggleExpansion(item, mirrorsPanel);
		});
	}

	// Close all panels except the one currently interacting
	function closeAllPanelsExcept(item) {
		const allInteractives = document.querySelectorAll(".interactiveslist-item");
		allInteractives.forEach((interactive) => {
			if (interactive !== item) {
				const mirrorsPanel = interactive.querySelector(
					".interactiveslist-item-mirrors"
				);
				if (
					mirrorsPanel &&
					interactive.getAttribute("data-expanded") === "true"
				) {
					collapsePanel(interactive, mirrorsPanel);
				}
			}
		});
	}

	// Toggle the expansion or collapse of a panel
	function toggleExpansion(item, mirrorsPanel) {
		const isExpanded = item.getAttribute("data-expanded") === "true";
		if (isExpanded) {
			collapsePanel(item, mirrorsPanel);
		} else {
			expandPanel(item, mirrorsPanel);
		}
	}

	// Collapse a panel
	function collapsePanel(item, mirrorsPanel) {
		mirrorsPanel.style.maxHeight = 0;
		item.setAttribute("data-expanded", "false");
	}

	// Expand a panel
	function expandPanel(item, mirrorsPanel) {
		mirrorsPanel.style.maxHeight = `${mirrorsPanel.scrollHeight}px`;
		item.setAttribute("data-expanded", "true");
	}

	// Expose the `initialize` method
	return {
		initialize,
	};
})();

// Initialize InteractivesList
InteractivesList.initialize();
