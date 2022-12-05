
publish:
	npm publish --dry-run
	sudo npm link --force
gendiff:
	node bin/gendiff.js