#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "This script deploys the newhaven.io static website"
echo "---------------------------------------------"

# Custom die function.
#
die() { echo >&2 -e "\nRUN ERROR: $@\n"; exit 1; }

# Config parameters
#
BUCKET="www.newhaven.io"


# Check for required programs: coffee, redis-server, and Postgres.app
#
S3CMD=$(command -v s3cmd || die "...Error: s3cmd is not in your path!")


# Check for .s3cfg file.  This is where your AWS credentials
# should be stored.  That file will require a value for both
# "access_key" and "secret_key".
#
S3CFG=$BASE_DIR/.s3cfg
if [[ ! -e "$S3CFG" ]]; then
	die "...You need to have a .s3cfg file at $S3CFG"
fi


# Print config
#
echo ""
echo "Configuration:"
echo -e "\t BUCKET: $BUCKET"
echo -e "\t  S3CMD: $S3CMD"
echo -e "\t .s3cfg: $S3CFG"
echo ""
echo "-------------------------------------------------------------------"

# Do the deployment 
#
foreman run s3cmd sync -v -c $S3CFG \
  --exclude '.DS_Store' \
  --exclude '.git/*' \
  --exclude '*.sh' \
  --exclude '*.md' \
  --exclude-from '.gitignore' \
  --acl-public ./ s3://$BUCKET


echo ""
echo "done."

