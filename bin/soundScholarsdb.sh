#!/bin/bash
# soundScholarsdb

# Stop on errors
# See https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
set -Eeuo pipefail

# Sanity check command line options
usage() {
  echo "Usage: $0 (create|destroy|reset|dump)"
}

if [ $# -ne 1 ]; then
  usage
  exit 1
fi


# Path to the SQLite database file
db_file="var/soundScholars.sqlite3"


# Parse argument.  $1 is the first argument
case $1 in
  "create")
    # Check if the database file already exists
    if [ -e "$db_file" ]; then
        echo "Error: database already exists"
        exit 1
    fi
    mkdir -p public/uploads/level0
    mkdir -p public/uploads/level1
    mkdir -p public/uploads/level2

    sqlite3 var/soundScholars.sqlite3 < sql/schema.sql
    sqlite3 var/soundScholars.sqlite3 < sql/data.sql
    cp sql/uploads/level0/* public/uploads/level0
    cp sql/uploads/level1/* public/uploads/level1
    cp sql/uploads/level2/* public/uploads/level2

    echo "+ mkdir -p public/uploads/level0"
    echo "+ mkdir -p public/uploads/level1"
    echo "+ mkdir -p public/uploads/level2"
    echo "+ sqlite3 var/soundScholars.sqlite3 < sql/schema.sql"
    echo "+ sqlite3 var/soundScholars.sqlite3 < sql/data.sql"
    echo "+ cp sql/uploads/level0/* public/uploads/level0/*"
    echo "+ cp sql/uploads/level1/* public/uploads/level1/*"
    echo "+ cp sql/uploads/level2/* public/uploads/level2/*"
    ;;

  "destroy")
    rm -rf var/soundScholars.sqlite3 public/uploads
    echo "+ rm -rf var/soundScholars.sqlite3 public/uploads"
    ;;

  "reset")
    $0 destroy
    $0 create
    ;;
  
  "dump")
    # Check if the database file exists
    if [ ! -e "$db_file" ]; then
        echo "Error: database does not exist"
        exit 1
    fi
    echo "+ sqlite3 -batch -line var/soundScholars.sqlite3 'SELECT * FROM exercises'"
    sqlite3 -batch -line var/soundScholars.sqlite3 'SELECT * FROM exercises'

    echo "+ sqlite3 -batch -line var/soundScholars.sqlite3 'SELECT * FROM users'"
    sqlite3 -batch -line var/soundScholars.sqlite3 'SELECT * FROM users'
    ;;
  *)
    usage
    exit 1
    ;;
esac

