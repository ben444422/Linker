require 'sinatra'
require 'sequel'
require 'mysql2'
require 'yaml'
require 'securerandom'
require 'json'
require 'uri'

$config_settings = YAML.load_file('config/config.yml')

require_relative 'models/db_utility'
require_relative 'models/link'
require_relative 'models/verify'
require_relative 'models/info'

require_relative 'routes/link'
require_relative 'routes/verify'
require_relative 'routes/info'

require_relative 'routes/init'