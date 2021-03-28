pipeline {
    agent any
    tools {
        maven 'mvn3.6.3' 
    }

    stages {
        stage ('build') {

            steps {
                
                    sh 'mvn -f SportClub-api/pom.xml'
                    sh 'mvn clean compile'
                
            }
        }

        stage ('test') {

            steps {
               
                    sh 'mvn -f SportClub-api/pom.xml'
                    sh 'mvn test'
                
            }
        }


        stage ('deploy') {
            steps {
               
                    sh 'mvn -f SportClub-api/pom.xml'
                    sh 'mvn deploy'
                
            }
        }
    }
}
