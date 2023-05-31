CHAT APP

1.Go to terminal and write `npm init` and press enter to all.

2.Install the following packages. \* `npm i express mongoose cors nodemon`

3.Go to package.json file and add scripts as "start":"nodemon server.js" for
continuously running our server.

4.And create instance of express by `const express=require("express")` `const app=express()`

5.Our server should listen to a port.

6.For saving data in mongoDB Atlas, we have first create a project in atlas and setup that.Make sure that your authourized user has the `read and write mode`.

7.And then, Create schema of our data like type:string, required etc.

8.Then we need to create a instance of that schema as model in that specific route and save that to DB.
