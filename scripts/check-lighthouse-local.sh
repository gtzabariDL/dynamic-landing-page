#!/bin/bash

URL="http://localhost:8080/"
THRESHOLD=85
ATTEMPTS=10

echo "🔍 Running Lighthouse $ATTEMPTS times on $URL"
for i in $(seq 1 $ATTEMPTS); do
  echo "⏱️ Attempt $i..."
  lighthouse "$URL" \
    --quiet \
    --output=json \
    --output-path=report-$i.json \
    --only-categories=performance \
    --emulated-form-factor=mobile \
    --chrome-flags="--headless"

  SCORE=$(node -pe "require('./report-$i.json').categories.performance.score * 100")

  echo "➡️ Score #$i: $SCORE"

  # Clean up the report file
  rm report-$i.json

  if (( $(echo "$SCORE < $THRESHOLD" | bc -l) )); then
    echo "❌ Score below threshold ($THRESHOLD). Exiting."
    exit 1
  fi
done

echo "✅ All $ATTEMPTS Lighthouse runs passed (>= $THRESHOLD)"