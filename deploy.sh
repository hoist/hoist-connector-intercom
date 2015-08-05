#!/usr/bin/env bash

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/${TIMESTAMP}

cp -r . ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/${TIMESTAMP}

rm -f ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/current

ln -s ${TIMESTAMP} ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/current


(ls -t ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/|head -n 5;ls ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/)|sort|uniq -u|xargs -I '{}' rm -r ${ROOT_CONNECTOR_DIR}/hoist-connector-workflowmax/'{}'
