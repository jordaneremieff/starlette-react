.PHONY: build, run

build:
	rm -rf ./backend/static/;\
	cd ./frontend/;\
	npm run build;\
	cp -R ./build/static/* ./build;\
	rm -rf ./build/static;\
	cd ..;\
	cp -R ./frontend/build/ ./backend/static/;
	
run:
	python backend/app.py serve
