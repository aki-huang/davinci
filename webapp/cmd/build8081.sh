cd ../server
cp config8081.json config.json
cd ..
npm run build
rm davinciWeb8081.zip
zip -r davinciWeb8081.zip ./build/* 