document.addEventListener("DOMContentLoaded", () => {
	// Select all posts with the `postslist-item` class
	const posts = document.querySelectorAll(".postslist-item");

	posts.forEach((item) => {
		const mirrorsPanel = item.querySelector(".postslist-item-mirrors");
		const content = item.querySelector(".postslist-item-content");

		// If no mirrors, forward to the post's URL on click of the content
		if (!mirrorsPanel) {
			const redirectUrl = item.getAttribute("data-href");
			content.addEventListener("click", () => {
				window.location.href = redirectUrl; // Forward to the href
			});
		} else {
			// Initialize the click event listener for each item with mirrors
			initializeClickListener(item, mirrorsPanel, content);
		}
	});
});

function initializeClickListener(item, mirrorsPanel, content) {
	content.addEventListener("click", (event) => {
		// Prevent default behavior for the click
		event.preventDefault();

		// Close other expanded panels first (accordion behavior)
		closeAllPanelsExcept(item);

		// Toggle the expansion of the current panel
		toggleExpansion(item, mirrorsPanel);
	});
}

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

function toggleExpansion(item, mirrorsPanel) {
	const isExpanded = item.getAttribute("data-expanded") === "true";
	if (isExpanded) {
		collapsePanel(item, mirrorsPanel);
	} else {
		expandPanel(item, mirrorsPanel);
	}
}

function collapsePanel(item, mirrorsPanel) {
	mirrorsPanel.style.maxHeight = 0;
	item.setAttribute("data-expanded", "false");
}

function expandPanel(item, mirrorsPanel) {
	mirrorsPanel.style.maxHeight = `${mirrorsPanel.scrollHeight}px`;
	item.setAttribute("data-expanded", "true");
}
