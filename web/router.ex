defmodule ConferenceWall.Router do
  use ConferenceWall.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ConferenceWall do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/walls/:id", PageController, :show
  end

  # Other scopes may use custom stacks.
  # scope "/api", ConferenceWall do
  #   pipe_through :api
  # end
end
