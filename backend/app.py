import uvicorn

from starlette.applications import Starlette
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware


app = Starlette()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"]
)


@app.route("/hello/{name}")
class Hello(HTTPEndpoint):
    def get(self, request, name=None):
        msg = f"Hello, {name}!" if name else "Hello!"
        return JSONResponse({"message": msg}, status_code=200)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
