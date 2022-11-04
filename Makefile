install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-json:
	npx eslint --format json

lint-fix:
	npx eslint --fix .

test:
	npm test

cover:
	npm test -- --coverage --coverageProvider=v8

watch:
	npm run watch

serve: 
	npm run serve
