.PHONY: run-back run-front dev

run-back:
	cd api && uv run uvicorn main:app --reload --port 8000

run-front:
	cd frontend && npm run dev

dev:
	make -j2 run-back run-front