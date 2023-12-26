#!/bin/bash

cd build
mkdir -p layer/css

sudo find ./static/chunks -name '*.css' -exec cp {} ./layer/css \;
