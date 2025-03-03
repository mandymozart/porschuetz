const PostsList = (() => {
	// Initialize all post items
	function initialize() {
		document.addEventListener("DOMContentLoaded", () => {
			const posts = document.querySelectorAll(".postslist-item");

			posts.forEach((item) => {
				const mirrorsPanel = item.querySelector(".postslist-item-mirrors");
				const content = item.querySelector(".postslist-item-content");

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
		const allPosts = document.querySelectorAll(".postslist-item");
		allPosts.forEach((post) => {
			if (post !== item) {
				const mirrorsPanel = post.querySelector(".postslist-item-mirrors");
				if (mirrorsPanel && post.getAttribute("data-expanded") === "true") {
					collapsePanel(post, mirrorsPanel);
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

// Initialize PostsList
PostsList.initialize();
