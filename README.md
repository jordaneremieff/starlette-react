# starlette-react

Fork of a basic example of using a [React](https://reactjs.org/) application with [Starlette](https://www.starlette.io/).

This one works with the newer Starlette API and has some logic for pre-rendering the React components and serving them from Starlette server instead of running a separate node server to serve front end.

## Setup

### Backend

**Requirements**: Python 3.6+

- Install `starlette` and `uvicorn` from the requirements file in the backend directory:
    
    `pip install -r requirements.txt --upgrade`

- Run the application using `uvicorn`:

    `make run` / `python backend/app.py serve`

[Uvicorn](https://www.uvicorn.org/) is the [ASGI](https://asgi.readthedocs.io/en/latest/) server used to run the application in this example, however other ASGI servers, such as [Hypercorn](https://pgjones.gitlab.io/hypercorn/) and [Daphne](https://github.com/django/daphne) could be used as well.

### Frontend

The React app was initially created using the `create-react-app` command.

- Install the dependencies:

    `cd frontend; yarn install`

- Run the server for local development:

    `cd frontend; yarn start`

- Build front end assets to serve from the Python app:

    `make build`


## Deploying 

The app is configured to seamlessly run on [https://render.com/](Render). Make sure that front end assets are rendered in the branch you are deploying. 