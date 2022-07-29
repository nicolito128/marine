start:
	tsc && node --experimental-fetch ./dist/src/index.js

build:
	tsc

run:
	node --experimental-fetch ./dist/src/index.js
