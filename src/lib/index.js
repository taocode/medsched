const rc = () => Math.floor(Math.random()*255)
export function randomColor() {
	return `rgb(${rc()},${rc()},${rc()})`
}
export function formatTimestampLong(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleTimeString('en-US')
}
export function formatTimestampShortDate(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleDateString('en-US',{day: 'numeric', month: 'numeric'})
}
export function formatTimestampMedDate(ts) {
	const dtm = ts.toDate()
	return dtm.toLocaleDateString('en-US',{day: 'numeric', month: 'long'})
}