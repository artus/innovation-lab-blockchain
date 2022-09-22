#!/bin/bash

echo "Regular hashing"
node hashing.js "This is a test"

read -n 1

echo "Proof of work, we want last character of hash to be '1'"
read -n 1
node mining "This is a test" 1 1

read -n 1

echo "Proof of work, but more difficult: we want the last 3 characters of the hash to be '1'"
read -n 1
node mining "This is a test" 3 1

read -n 1

echo "Proof of work, but again a bit harder: last 8 characters of the hash need to be '1'"
read -n 1
node mining "This is a test" 8 100