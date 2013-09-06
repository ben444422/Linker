def get_db
	db_settings=$config_settings['database']
	Sequel.mysql2 db_settings['database'], :user => db_settings['user'],
	:password => db_settings['password'],
	:host => db_settings['host']
end

def get_dev_db
	db_settings = $config_settings['devdatabase']
	Sequel.mysql2 db_settings['database'], :user => db_settings['user'],
	:password => db_settings['password'],
	:host => db_settings['host']
end