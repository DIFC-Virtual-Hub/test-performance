set -e

if [ $# -ne 1 ]; then
  echo "Usage: $0 <script_name>"
  exit 1
fi

SCRIPT_NAME=$1

npm run build && \
./k6 run \
    -e TEST_ITERATIONS_SEC=1 \
    -e TEST_DURATION=1m \
    ./dist/$SCRIPT_NAME.test.js