#!/usr/bin/env bash

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "making timestamped deploy directory";

mkdir -p ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/${TIMESTAMP}

echo "copying files to deploy directory";

cp -r . ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/${TIMESTAMP}

echo "removing current symlink";

rm -f ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/current

echo "relinking current symlink";

ln -s ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/${TIMESTAMP} ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/current

echo "removing old deploy directories";

(ls -t ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/|head -n 5;ls ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/)|sort|uniq -u|xargs -I '{}' rm -r ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/'{}'

echo "done!";
