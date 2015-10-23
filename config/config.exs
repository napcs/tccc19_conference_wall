# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :conference_wall, ConferenceWall.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "PqgKgmB4PqjTGnUVkig5fgivXl6notqIlhJC3+DILBCng+7Vp60NREKni+hV5IDu",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: ConferenceWall.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false


config :ex_twitter, :oauth, [
  consumer_key: System.get_env("CONFWALL_TWITTER_CONSUMER_KEY"),
  consumer_secret: System.get_env("CONFWALL_TWITTER_CONSUMER_SECRET"),
  access_token: System.get_env("CONFWALL_TWITTER_ACCESS_TOKEN"),
  access_token_secret: System.get_env("CONFWALL_TWITTER_ACCESS_SECRET")
]
