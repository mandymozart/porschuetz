const now = new Date();

export function isScheduledPost(data) {
	return data.date != null && data.date > now;
}
