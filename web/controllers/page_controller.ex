defmodule ConferenceWall.PageController do
  use ConferenceWall.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
