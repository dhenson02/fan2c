#!/bin/sh

TYPE=$1
WEEK=$2
PLAYER=$3
BASEURL="http://football30.myfantasyleague.com/2015/export?L=45589&TYPE=${TYPE}&W=${WEEK}&JSON=1"

if [ $PLAYER ]; then
    URL="${BASEURL}P=${PLAYER}"
else
    URL="${BASEURL}"
fi

wget -O data/$TYPE.json $URL
