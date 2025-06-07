#!/bin/sh
set -a
[ -f ./user.env ] && . ./user.env
set +a

exec node apps/user/server.js