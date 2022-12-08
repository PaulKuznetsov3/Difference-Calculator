
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
install:
	npm ci
	sudo npm link --force
test-coverage: 
	npm test -- --coverage --coverageProvider=v8
test-watch:
	npm test -s -- --watch