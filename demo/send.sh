#!/usr/bin/env sh

set -eu

if [ "$#" -lt 2 ]; then
	echo "用法: sh demo/send.sh <source> <config_id>"
	echo "例如: sh demo/send.sh github abc123"
	exit 1
fi

SOURCE="$1"
CONFIG_ID="$2"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REQUEST_FILE="$SCRIPT_DIR/$SOURCE/request.json"

if [ ! -f "$REQUEST_FILE" ]; then
	echo "未找到请求文件: $REQUEST_FILE"
	exit 1
fi

URL="http://localhost:5173/api/$CONFIG_ID"

curl -X POST \
	"$URL" \
	-H "Content-Type: application/json" \
	--data-binary "@$REQUEST_FILE"

echo
