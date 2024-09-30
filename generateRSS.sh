#!/bin/zsh

# Enable debugging
set -x

# Define the base URL of your local website
BASE_URL="http://localhost:3000"
SITE_URL="https://nahueldaima.com"
RSS_FILE="rss.xml"
SITEMAP_URL="${BASE_URL}/__sitemap__/en-GB.xml"

# Check if the website is running
if ! curl -s --head "${BASE_URL}" | grep "200 OK" > /dev/null; then
  echo "Website is not running on ${BASE_URL}. Exiting."
  exit 0
fi

# RSS feed metadata
TITLE="Nahuel Daima"
DESCRIPTION="Hi! I’m Nahuel Daima, Digital nomad and technology enthusiast"
LANGUAGE="en"
FEED_URL="${SITE_URL}/rss.xml"

# Fetch the sitemap
SITEMAP=$(curl -s $SITEMAP_URL)

# Check if sitemap was fetched successfully
if [ -z "$SITEMAP" ]; then
  echo "Failed to fetch sitemap from ${SITEMAP_URL}. Exiting."
  exit 0
fi

# Create the RSS feed header
echo '<?xml version="1.0" encoding="UTF-8"?>' > $RSS_FILE
echo '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">' >> $RSS_FILE
echo '  <channel>' >> $RSS_FILE
echo "    <title><![CDATA[$TITLE]]></title>" >> $RSS_FILE
echo "    <description><![CDATA[$DESCRIPTION]]></description>" >> $RSS_FILE
echo "    <link>$SITE_URL</link>" >> $RSS_FILE
echo "    <generator>Custom Zsh Script</generator>" >> $RSS_FILE
echo "    <lastBuildDate>$(date -R)</lastBuildDate>" >> $RSS_FILE
echo "    <atom:link href=\"$FEED_URL\" rel=\"self\" type=\"application/rss+xml\"/>" >> $RSS_FILE
echo "    <language><![CDATA[$LANGUAGE]]></language>" >> $RSS_FILE

# Extract URLs from the sitemap
URLS=$(echo "$SITEMAP" | sed -n 's:.*<loc>\(.*\)</loc>.*:\1:p')

# Loop over each URL and extract relevant data
for URL in $URLS; do
  echo "Processing URL: $URL"
  HTML=$(curl -s $URL)
  echo "HTML content fetched for $URL: ${#HTML} characters"

  # Extract the title
  TITLE=$(echo "$HTML" | sed -n 's:.*<title>\(.*\)</title>.*:\1:p' | sed 's/^[ \t]*//;s/[ \t]*$//')
  echo "Extracted title: $TITLE"

  # Extract description if available
  DESCRIPTION=$(echo "$HTML" | sed -n 's:.*<meta name="description" content="\([^"]*\)".*:\1:p' | sed 's/^[ \t]*//;s/[ \t]*$//')
  echo "Extracted description: $DESCRIPTION"

  # Extract publication date if available
  PUB_DATE=$(echo "$HTML" | sed -n 's:.*<meta name="pubdate" content="\([^"]*\)".*:\1:p' | sed 's/^[ \t]*//;s/[ \t]*$//')
  echo "Extracted publication date: $PUB_DATE"

  if [ -z "$PUB_DATE" ]; then
    PUB_DATE=$(date -R) # Default to current date if pubdate not found
  fi

  if [ -n "$TITLE" ] && [ -n "$DESCRIPTION" ]; then
    # Add each item to the RSS feed
    echo "Adding item to RSS feed: $TITLE"
    echo "    <item>" >> $RSS_FILE
    echo "      <title><![CDATA[$TITLE]]></title>" >> $RSS_FILE
    echo "      <description><![CDATA[$DESCRIPTION]]></description>" >> $RSS_FILE
    echo "      <link>${URL}</link>" >> $RSS_FILE
    echo "      <guid isPermaLink=\"true\">${URL}</guid>" >> $RSS_FILE
    echo "      <pubDate>$PUB_DATE</pubDate>" >> $RSS_FILE
    echo "    </item>" >> $RSS_FILE
  else
    echo "Skipping URL due to missing title or description: $URL"
  fi
done

# Close the RSS feed
echo '  </channel>' >> $RSS_FILE
echo '</rss>' >> $RSS_FILE

echo "RSS feed generated in $RSS_FILE"

# Disable debugging
set +x