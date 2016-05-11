http_path="../"
css_dir= "_dev/css"
sass_dir = "_dev/sass"
sprite_load_path = "_dev"
images_dir = "_dev/img"
http_images_path = "../img"
#http_generated_images_path = "../../img"
http_generated_images_path = "../img"

javascripts_dir = "js"
# To enable relative paths to assets via compass helper functions uncomment the following line:
#relative_assets = true

# Enable Debugging (Line Comments, FireSass)
# Invoke from command line: compass watch -e development --force
# if environment == :development
# 	line_comments = true
# 	output_style = :expanded #nested
# 	sass_options = {:debug_info => true}
# else
# 	line_comments = false
# 	output_style = :compressed
# end
environment = :development
line_comments = true
output_style = :expanded #nested
# sass_options = {:debug_info => true}
#asset_cache_buster :none
asset_cache_buster do |http_path, real_path|
  nil
end
