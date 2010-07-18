#!/bin/sh

START=$(date +%s)
COUNTER=0

echo "Ego JSLint Test"

for i in `find ego -type f -name "*.js" ! -name ".*"`
do
	JSLINT=`java -classpath util/rhino1_7R2.jar org.mozilla.javascript.tools.shell.Main util/jslint.js $i`
	if [ "$JSLINT" != "jslint: No problems found in $i" ]; then
		echo "------------------------------------------------------------------------------"
		echo "$i"
		echo "$JSLINT" | awk '{print "    "$0}'
		COUNTER=$(( $COUNTER + 1 ))
	fi
done

END=$(date +%s)

if [ $COUNTER = 0 ]; then
	echo "JSLint didn't find any issues!"
else
	echo "------------------------------------------------------------------------------"
	echo "JSLint found $COUNTER files with issues"
fi

echo "Completed in $(( $END - $START )) seconds"