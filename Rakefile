require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

desc "Install dependencies and build"
task :install do
  sh "npm install grunt --save-dev"
  sh "npm install grunt-contrib-uglify --save-dev"
  sh "npm install grunt-contrib-watch --save-dev"
  sh "npm install grunt-contrib-concat --save-dev"
  sh "npm install grunt-contrib-compass --save-dev"
  sh "bower install"
  sh "bundle install"
  sh "grunt concat"
  sh "grunt uglify"
  sh "grunt compass"
end