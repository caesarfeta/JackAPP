require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

desc "Install dependencies and build"
task :install do
  
  # Install Ruby and JS dependencies
  
  sh "npm install"
  sh "bower install"
  sh "bundle install"
  
  # Run grunt commands to build JS and CSS
  
  sh "grunt concat"
  sh "grunt uglify"
  sh "grunt compass"
end