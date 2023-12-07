# Docker base image fe-webapp-base


**How to Update**

Docker needs to be installed locally. After that made the changes in `Dockerfile`


**How to build**
* build an image from `Dockerfile` in the `packages/tools/docker` root
```docker build -t univision/fe-webapp-base:5 .```
* Verify the image was created
```docker images```



**How to publish**

* Run `docker push univision/fe-webapp-base:[new tagged version]`.


**Other helpfull commands**

* Show all images
`docker images`
* Remove image
`docker rmi [image id]`
* Access active container command line
`docker exec -it [container id] bash`


[fe-webapp-base url](https://cloud.docker.com/u/univision/repository/docker/univision/fe-webapp-base)
