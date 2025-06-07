#!/bin/sh
set -a
[ -f ./admin.env ] && . ./admin.env
set +a

exec node apps/admin/server.js