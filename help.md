## install nestjs
npm i -g @nestjs/cli


## Create project
nest new office-automation-api --strict


## Show list and version packages
npm list @nestjs/core @nestjs/common
 
## Create module
nest generate module users --no-spec
nest generate controller users --no-spec
nest generate service users --no-spec