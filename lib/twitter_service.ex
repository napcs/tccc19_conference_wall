defmodule ConferenceWall.TwitterService do
  use GenServer
  @name TS

  require Logger

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, :ok, opts ++ [name: TS])
  end

  def init(_) do
    Logger.info "Starting ConferenceWall.TwitterService..."
    {:ok, %{} }
  end

  def subscribe_to_topic(topic) do
    Logger.info "Subscribing to #{topic}..."
    GenServer.cast @name, {:add_topic, topic}
  end

  def handle_cast({:add_topic, topic}, state) do
    hashtag = "#" <> topic
    spawn fn ->
      for tweet <- ExTwitter.stream_filter(track: hashtag) do
        broadcast_tweet(topic, tweet)
      end
    end

    {:noreply, state}
  end

  defp broadcast_tweet(topic, content) do
    message = %{
      body: content.text,
      user: content.user.name,
      id: content.id,
      image: content.user.profile_image_url
    }

    ConferenceWall.Endpoint.broadcast "walls:" <> topic, "new_tweet", message
  end





end
