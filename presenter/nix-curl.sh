#!/bin/bash

SERVER_ADDRESS="http://localhost:3000/api/update"

while [ 1 = 1 ]
do
    curl $SERVER_ADDRESS
    sleep 1m
done
