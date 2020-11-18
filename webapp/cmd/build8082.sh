cd ../server
cp config8082.json config.json
cd ..
npm run build
rm davinciWeb8082.zip
zip -r davinciWeb8082.zip ./build/* 