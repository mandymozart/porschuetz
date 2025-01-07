const ListItem = (() => {
	// Automatically initialize based on data-controller
	function autoInitialize() {
		document.addEventListener("DOMContentLoaded", () => {
			const items = document.querySelectorAll('[data-controller="ListItem"]');

			items.forEach((item) => {
				const mirrorsPanelSelector = item.getAttribute("data-mirrors");
				const contentSelector = item.getAttribute("data-content");

				initialize(item, mirrorsPanelSelector, contentSelector);
			});
		});
	}

	// Initialize a list item
	function initialize(item, mirrorsPanelSelector, contentSelector) {
		const mirrorsPanel = item.querySelector(mirrorsPanelSelector);
		const content = item.querySelector(contentSelector);

		// Set default to collapsed
		if (mirrorsPanel) {
			item.setAttribute("data-expanded", "false");
			mirrorsPanel.style.maxHeight = 0; // Ensure it starts collapsed
		}

		if (!mirrorsPanel) {
			const redirectUrl = item.getAttribute("data-href");
			content.addEventListener("click", () => {
				window.location.href = redirectUrl;
			});
		} else {
			initializeClickListener(item, mirrorsPanel, content);
		}
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
	function closeAllPanelsExcept(currentItem) {
		const allItems = document.querySelectorAll('[data-controller="ListItem"]');
		allItems.forEach((item) => {
			if (item !== currentItem) {
				const mirrorsPanelSelector = item.getAttribute("data-mirrors");
				const mirrorsPanel = item.querySelector(mirrorsPanelSelector);
				if (mirrorsPanel && item.getAttribute("data-expanded") === "true") {
					collapsePanel(item, mirrorsPanel);
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

	// Expose the `autoInitialize` method
	return {
		autoInitialize,
	};
})();

// Automatically initialize all ListItems
ListItem.autoInitialize();
