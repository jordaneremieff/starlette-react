import uvicorn

from starlette.applications import Starlette
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse, HTMLResponse, PlainTextResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
import sys
from utils.yelp import scrape_yelp_biz, yelp_biz

app = Starlette(debug=True, template_directory='backend/static')
app.mount('/static', StaticFiles(directory='backend/static'), name='static')
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"]
)

@app.route("/business")
#@app.route("/business/{name:path}")
class Hello(HTTPEndpoint):
    async def get(self, request):
        name = request.query_params['url']
        biz = scrape_yelp_biz(name, None)
        return biz_to_json(biz)


@app.route('/')
async def homepage(request):
    template = app.get_template('index.html')
    content = template.render(request=request)
    return HTMLResponse(content)


def biz_to_json(biz: yelp_biz) -> str:
    reviews = [r._asdict() for r in biz.reviews]
    res = biz._asdict()
    res['reviews'] = reviews
    
    return JSONResponse(res, status_code=200)


if __name__ == '__main__':
    if 'serve' in sys.argv: uvicorn.run(app, host='0.0.0.0', port=5042)
