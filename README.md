# starlette-react

A basic example of using a [React](https://reactjs.org/) application with [Starlette](https://www.starlette.io/).

## Setup

### Backend

**Requirements**: Python 3.6+

- Install `starlette` and `uvicorn` from the requirements file in the backend directory:
    
    `pip install -r requirements.txt --upgrade`

- Run the application using `uvicorn`:

    `python app.py`

[Uvicorn](https://www.uvicorn.org/) is the [ASGI](https://asgi.readthedocs.io/en/latest/) server used to run the application in this example, however other ASGI servers, such as [Hypercorn](https://pgjones.gitlab.io/hypercorn/) and [Daphne](https://github.com/django/daphne) could be used as well.

### Frontend

The React app was initially created using the `create-react-app` command.

- Install the dependencies:

    `yarn install`

- Run the server:

    `yarn start`