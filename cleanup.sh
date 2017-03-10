
echo Find all .ts with @component save to file
find . -name "*.ts" -exec grep -Hil '@Component' {} \; | grep -v ".component.ts" > ts.match.txt

echo Rename all .ts to .component.ts via git mv
cat ts.match.txt | sed -e 's/\(\(.*\)\).ts/git mv \2.ts \1.component.ts/g'  | xargs -n 5 -I {} bash -c '{}'

echo Rename all matching .html to .component.html via git mv
cat ts.match.txt | sed -e 's/\(\(.*\)\).ts/git mv \2.html \1.component.html/g'  | xargs -n 5 -I {} bash -c '{}'

echo Rename all matching .scss to .component.scss via git mv
cat ts.match.txt | sed -e 's/\(\(.*\)\).ts/git mv \2.scss \1.component.scss/g'  | xargs -n 5 -I {} bash -c '{}'

echo Replace .html refs with .component.html refs in the .ts
cat ts.match.txt | sed -e 's/\(.*\/\(.*\)\).ts/perl -pi -e s\/\2.html\/\2.component.html\/g \1.component.ts/g' | xargs -n 5 -I {} bash -c '{}'

echo Replace .scss refs with .component.scss refs in the .ts
cat ts.match.txt | sed -e 's/\(.*\/\(.*\)\).ts/perl -pi -e s\/\2.scss\/\2.component.scss\/g \1.component.ts/g' | xargs -n 5 -I {} bash -c '{}'
