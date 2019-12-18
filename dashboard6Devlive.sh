echo "ComPile dashboard6 DEV Start"
git pull

echo "ng build command start"

ng build --prod --base-href ./

echo "Remove old files of dashboard6from demo-cmis"
rm -r /d/wamp/www/demo-cmis/dashboard6/*

echo "Copy new files of dashboard6 from dist to demo-cmis"
cp -r dist/dashboard6/* /d/wamp/www/demo-cmis/dashboard6



echo "Push work for Live Server dashboard6"
cd /d/wamp/www/demo-cmis
git add .
git commit -m "Updated worked"
git push

