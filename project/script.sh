#!/bin/bash

docker build -t saudepontual .

docker run -d -p 3000:3000 --name saudepontualapp saudepontual
