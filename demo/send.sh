#!/usr/bin/env sh

set -eu

if [ "$#" -lt 1 ]; then
	echo "用法: sh demo/send.sh <config_id>"
	exit 1
fi

CONFIG_ID="$1"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REQUEST_FILE="$SCRIPT_DIR/request.json"
URL="http://localhost:5173/api/$CONFIG_ID"

curl -X POST \
	"$URL" \
	-H "Content-Type: application/json" \
	--data-binary "@$REQUEST_FILE"

echo
