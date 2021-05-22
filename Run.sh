chmod 777 ./SportClub-api/mvnw

cd ./SportClub-api
./mvnw spring-boot:run &

cd "../SportClub-ui"
npm install
npm start
