#!/bin/sh

TYPE=$1
WEEK=$2
PLAYER=$3
BASEURL="http://football30.myfantasyleague.com/2015/export?L=45589&TYPE=${TYPE}&JSON=1"
URL="${BASEURL}"

if [ $PLAYER ]; then
    URL="${URL}P=${PLAYER}"
fi

if [ $WEEK ]; then
    URL="${URL}W=${WEEK}"
fi

wget -O data/$TYPE.json $URL
