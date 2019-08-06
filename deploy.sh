#!/bin/bash

# ----------------------
# KUDU Deployment Script
# Version: {Version}
# ----------------------

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Prerequisites
# -------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally this is the correct location of kuduSync
    KUDU_SYNC_CMD=kuduSync
  else
    # In case we are running on kudu service this is the correct location of kuduSync
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kuduSync/bin/kuduSync
  fi
fi


##################################################################################################################################
# Deployment
# ----------

echo Handling Linux Python Custom Deployment - for PSKU Project.

# 2. KuduSync
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh;antenv3.6"
  exitWithMessageOnError "Kudu Sync failed"
fi

# 2. Install PIP Dependencies
cd "$DEPLOYMENT_TARGET"

if [ -e "$DEPLOYMENT_TARGET/antenv3.6" ]; then
  echo "Found compatible virtual environment"
else
  echo "Creating virtual environment."
  /opt/python/3.6.8/bin/python3 -m pip install --upgrade --force-reinstall virtualenv --user
  /opt/python/3.6.8/bin/python3 -m virtualenv antenv3.6
fi

echo "Activating virtual environment"
source $DEPLOYMENT_TARGET/antenv3.6/bin/activate

# Install packages
echo "Pip install requirements."

python3 -m pip install -U pip
python3 -m pip install -r requirements.txt


# 3. Run migrations if required
# if [ -e "$DEPLOYMENT_TARGET/pskuapp/migrations" ]; then
#   echo "Already migrated"
# else
#   echo "Starting default migrations"
#   python3 manage.py makemigrations pskuapp
#   python3 manage.py migrate
# fi


##################################################################################################################################
echo "Finished successfully."
