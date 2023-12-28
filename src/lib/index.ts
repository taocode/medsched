const rc = () => Math.floor(Math.random() * 255)
export function randomColor() {
	return `rgb(${rc()},${rc()},${rc()})`
}
export function formatTimestampLong(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleTimeString('en-US')
}
export function formatTimestampShortDate(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' })
}
export function formatTimestampMedDate(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}
export function formatTimestampHourFraction(ts) {
	const dtm = ts.toDate()
	return dtm.getHours() + (dtm.getMinutes() / 60)
}

export function formatDateValue(dtm: Date) {
	// ISO string gives UTC; adjust hours with this
	const hoursOffset = dtm.getTimezoneOffset() / -60
	dtm.setHours(dtm.getHours()+hoursOffset)
	return dtm.toISOString().split('.')[0] // drops '.0000' milliseconds
}
