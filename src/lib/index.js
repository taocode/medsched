const rc = () => Math.floor(Math.random()*255)
export function randomColor() {
	return `rgb(${rc()},${rc()},${rc()})`
}