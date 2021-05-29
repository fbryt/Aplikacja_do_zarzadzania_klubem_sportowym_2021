cd SportClub-ui

npm install
npm test

cd ../SportClub-api
./mvnw test -B -D org.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn