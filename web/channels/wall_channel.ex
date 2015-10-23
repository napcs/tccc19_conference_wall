defmodule ConferenceWall.WallChannel do
  use Phoenix.Channel
  def join("walls:" <> topic, message, socket) do
    {:ok, socket}
  end

  def handle_in("new_msg", message, socket) do
    broadcast_from! socket, "new_msg", message

    {:reply, {:ok, message}, socket}
  end

end
