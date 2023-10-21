#!/bin/bash
set -e
set -x

export DEBIAN_FRONTEND=noninteractive

mkdir -p /tmp/docs
cd /tmp/docs

# Cached commit: 95821573a0df20c307bcf1e86ceba71034fe41cc
git clone https://github.com/PeWe79/cloudmucast.com.git .
cd builtin
bash build.sh

mkdir -p /var/azuracast/docs
cp -TR /tmp/docs/builtin/dist/ /var/azuracast/docs/

rm -rf /tmp/docs
